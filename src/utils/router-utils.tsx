import type { AnyRouter } from '@tanstack/react-router';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router';
import { render } from '@testing-library/react';

import { routeTree } from '../routeTree.gen';

interface RenderWithRouterOptions extends Omit<RenderOptions, 'wrapper'> {
	initialLocation?: string;
}
interface RouterWrapperProps {
	router: AnyRouter;
}

const createTestRouter = (initialLocation = '/') =>
	createRouter({
		history: createMemoryHistory({ initialEntries: [initialLocation] }),
		routeTree,
	});

const RouterWrapper = ({ router }: RouterWrapperProps) => <RouterProvider router={router} />;

const renderWithRouter = (
	ui: ReactElement,
	{ initialLocation = '/', ...renderOptions }: RenderWithRouterOptions
) => {
	const router = createTestRouter(initialLocation);

	if (!router) throw new Error('Router is required. Provider either a router or routes array');

	const Wrapper = () => <RouterWrapper router={router} />;

	return {
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
		router,
	};
};

export { createTestRouter, renderWithRouter };
