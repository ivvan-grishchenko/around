import { RootLayout } from '@components/layout/RootLayout';
import { auth } from '@lib/auth.server';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

const getSession = createServerFn({ method: 'GET' }).handler(async () => {
	const headers = getRequestHeaders();
	return auth.api.getSession({ headers });
});

const LayoutComponent = () => {
	const context = Route.useRouteContext();

	return (
		<RootLayout userName={context.user?.name || null}>
			<Outlet />
		</RootLayout>
	);
};

const Route = createFileRoute('/_layout')({
	beforeLoad: async () => {
		const session = await getSession();
		return { user: session ? session.user : null };
	},
	component: LayoutComponent,
});

export { Route };
