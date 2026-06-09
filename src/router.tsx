import type { RouterContext } from '@type/context';

import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

import { routeTree } from './routeTree.gen';

// oxlint-disable-next-line typescript/explicit-module-boundary-types,typescript/explicit-function-return-type
const getRouter = () => {
	const queryClient = new QueryClient();
	const context: RouterContext = { queryClient, theme: 'monolith-dark' };

	const router = createTanStackRouter({
		context,
		defaultPreload: 'intent',
		defaultPreloadStaleTime: 0,
		routeTree,
		scrollRestoration: true,
	});

	setupRouterSsrQueryIntegration({ queryClient: context.queryClient, router });

	return router;
};

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}

export { getRouter };
