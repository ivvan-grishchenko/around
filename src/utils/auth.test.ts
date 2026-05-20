import type { RedirectOptions } from '@tanstack/react-router';

import { requireAuth } from '@utils/auth';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
	authMock: vi.fn<() => { isAuthenticated: boolean }>(),
	redirectMock: vi.fn<(config: RedirectOptions) => RedirectOptions>(
		(config: RedirectOptions) => config
	),
}));

vi.mock('@tanstack/react-start', async (importOriginal) => {
	const original = await importOriginal<typeof import('@tanstack/react-start')>();
	return {
		...original,
		createServerFn: () => ({
			handler: (fn: Function) => fn,
		}),
	};
});

vi.mock('@clerk/tanstack-react-start/server', () => ({
	auth: () => mocks.authMock(),
}));

vi.mock('@tanstack/react-router', () => ({
	redirect: (config: RedirectOptions) => mocks.redirectMock(config),
}));

describe('requireAuth()', () => {
	beforeEach(() => vi.resetAllMocks());

	afterEach(() => vi.clearAllMocks());

	it('should return isAuthenticated true if clerk authenticates', async () => {
		mocks.authMock.mockResolvedValue({ isAuthenticated: true });

		const result = await requireAuth();

		expect(result).toStrictEqual({ isAuthenticated: true });
	});

	it('should throw a redirect to "/" if user is unauthenticated', async () => {
		let err = null;
		mocks.authMock.mockResolvedValue({ isAuthenticated: false });

		try {
			await requireAuth();
		} catch (error) {
			err = error;
		}

		expect(err).toBeDefined();
		expect(mocks.redirectMock).toHaveBeenCalledWith({ to: '/' });
	});
});
