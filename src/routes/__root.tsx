import type { ReactNode } from 'react';

import { ClerkProvider } from '@clerk/tanstack-react-start';
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';

const RootComponent = () => (
	<RootDocument>
		<Outlet />
	</RootDocument>
);

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => (
	<html>
		<head>
			<HeadContent />
		</head>
		<body>
			<ClerkProvider>
				{children}
				<Scripts />
			</ClerkProvider>
		</body>
	</html>
);

const Route = createRootRoute({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				charSet: 'utf8',
			},
			{
				content: 'width=device-width, initial-scale=1',
				name: 'viewport',
			},
			{
				title: 'TanStack Start Starter',
			},
		],
	}),
});

export { Route };
