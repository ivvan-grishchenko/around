import { type RouterHistory, createBrowserHistory } from '@tanstack/react-router';
import { cleanup, screen, waitFor } from '@testing-library/react';
import { setAuth } from '@utils/clerk-setup';
import { renderWithRouter } from '@utils/router-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('index route', () => {
	// oxlint-disable-next-line init-declarations
	let history: RouterHistory;

	beforeEach(() => {
		history = createBrowserHistory();
		vi.resetAllMocks();
	});

	afterEach(() => {
		history.destroy();
		window.history.replaceState(null, 'root', '/');
		vi.clearAllMocks();
		cleanup();
	});

	it('should render index component', async () => {
		renderWithRouter(<div />, { initialLocation: '/' });

		await waitFor(() => expect(screen.getByText('Index Route')).toBeInTheDocument());
	});

	it('should render UserButton for signed in user', async () => {
		setAuth(true, 'test_123');
		renderWithRouter(<div />, { initialLocation: '/' });

		await waitFor(() => expect(screen.getByTestId('user-button')).toBeInTheDocument());
		await waitFor(() => expect(screen.queryByTestId('sign-in')).not.toBeInTheDocument());
	});

	it('should render SignIn for signed out user', async () => {
		setAuth(false, 'test_123');
		renderWithRouter(<div />, { initialLocation: '/' });

		await waitFor(() => expect(screen.queryByTestId('user-button')).not.toBeInTheDocument());
		await waitFor(() => expect(screen.getByTestId('sign-in')).toBeInTheDocument());
	});
});
