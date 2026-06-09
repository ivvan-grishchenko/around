import { twoFactorClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
	plugins: [
		twoFactorClient({
			onTwoFactorRedirect() {
				const currentParams = new URLSearchParams(window.location.search);
				const targetRedirect = currentParams.get('redirect') || '/index';

				window.location.href = `/two-factor?redirect=${encodeURIComponent(targetRedirect)}`;
			},
		}),
	],
});

export { authClient };
