import type { RenderResult } from '@testing-library/react';
import type { ReactNode } from 'react';

import { render } from '@testing-library/react';
import { vi } from 'vitest';

interface MockUser {
	firstName?: string;
	id: string;
	username?: string;
}

interface MockUserState {
	isLoaded: boolean;
	user: MockUser | undefined;
}

const mocks = vi.hoisted(() => ({
	mockAuthState: { isSignedIn: true, userId: 'user_123' },
	mockIsAuthenticated: { value: true },
	mockUserState: {
		isLoaded: true,
		user: { firstName: 'Test', id: 'user_123', username: 'testuser' },
	} as MockUserState,
}));

const setAuth = (isSignedIn: boolean, userId?: string) => {
	mocks.mockAuthState.isSignedIn = isSignedIn;
	if (userId) mocks.mockAuthState.userId = userId;
};

const setUser = (user: Partial<MockUser> | null) => {
	if (user === null) {
		mocks.mockUserState.isLoaded = true;
		mocks.mockUserState.user = undefined;
	} else {
		mocks.mockUserState.isLoaded = true;
		mocks.mockUserState.user = {
			...mocks.mockUserState.user,
			id: mocks.mockUserState.user?.id ?? 'user_123',
			...user,
		};
	}
};

const setUserNotLoaded = () => (mocks.mockUserState.isLoaded = false);

const setAuthenticated = (value: boolean) => (mocks.mockIsAuthenticated.value = value);

vi.mock('@clerk/tanstack-react-start', () => ({
	ClerkProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
	Show: ({ children, when }: { children: ReactNode; when: string }) => {
		if (when === 'signed-in' && mocks.mockAuthState.isSignedIn) return <>{children}</>;
		if (when === 'signed-out' && !mocks.mockAuthState.isSignedIn) return <>{children}</>;
		return null;
	},
	SignIn: () => <div data-testid="sign-in" />,
	UserButton: () => <div data-testid="user-button" />,
	useAuth: () => mocks.mockAuthState,
	useUser: () => mocks.mockUserState,
}));

const TestWrapper = ({ children }: { children: ReactNode }) => <>{children}</>;

const renderWithProviders = (ui: ReactNode): RenderResult => render(ui, { wrapper: TestWrapper });

export { setAuth, setUser, setUserNotLoaded, setAuthenticated, renderWithProviders };
