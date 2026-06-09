import { auth } from '@lib/auth.server';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

const getSession = createServerFn({ method: 'GET' }).handler(async () => {
	const headers = getRequestHeaders();
	return auth.api.getSession({ headers });
});

const Route = createFileRoute('/_layout/_protected')({
	beforeLoad: async ({ location }) => {
		const session = await getSession();

		if (!session) throw redirect({ search: { redirect: location.href }, to: '/login' });

		return { session };
	},
	component: () => <Outlet />,
});

export { Route };
