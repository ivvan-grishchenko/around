import { RootLayout } from '@components/layout/RootLayout';
import { Outlet, createFileRoute } from '@tanstack/react-router';

const Route = createFileRoute('/_layout')({
	component: () => (
		<RootLayout>
			<Outlet />
		</RootLayout>
	),
});

export { Route };
