import type { TanStackDevtoolsConfig, TanStackDevtoolsTheme } from '@tanstack/devtools';
import type { RouterContext } from '@type/context';
import type { JSX, ReactNode } from 'react';

import { Toaster } from '@components/ui/Sonner';
import { getThemeServerFn } from '@hooks/use-theme';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import appCss from '../styles.css?url';

interface TriggerProps {
	theme: TanStackDevtoolsTheme;
}
type TriggerRender = JSX.Element | ((el: HTMLElement, props: TriggerProps) => JSX.Element);
type TanStackDevtoolsReactConfig = Omit<Partial<TanStackDevtoolsConfig>, 'customTrigger'> & {
	customTrigger?: TriggerRender;
};

const tanStackDevtoolsConfig: TanStackDevtoolsReactConfig = {
	position: 'bottom-left',
};
const tanStackDevtoolsPlugins = [
	{
		name: 'Tanstack Router',
		render: <TanStackRouterDevtoolsPanel />,
	},
	{
		name: 'Tanstack Query',
		render: <ReactQueryDevtoolsPanel />,
	},
];

const RootDocument = ({ children }: { children: ReactNode }) => {
	const { theme } = Route.useRouteContext();

	return (
		<html lang="en" data-theme={theme}>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools config={tanStackDevtoolsConfig} plugins={tanStackDevtoolsPlugins} />
				<Toaster />
				<Scripts />
			</body>
		</html>
	);
};

const Route = createRootRouteWithContext<RouterContext>()({
	beforeLoad: async () => {
		const ssrTheme = await getThemeServerFn();

		return { theme: ssrTheme };
	},
	head: () => ({
		links: [
			{
				href: appCss,
				rel: 'stylesheet',
			},
			{
				href: '/favicon.ico',
				rel: 'icon',
				type: 'image/x-icon',
			},
			{
				href: '/manifest.json',
				rel: 'manifest',
			},
		],
		meta: [
			{
				charSet: 'utf8',
			},
			{
				content: 'width=device-width, initial-scale=1',
				name: 'viewport',
			},
			{
				title: 'Around',
			},
			{
				content: '#090b0c',
				name: 'theme-color',
			},
		],
	}),
	shellComponent: RootDocument,
});

export { Route };
