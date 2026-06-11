import type { ReactNode } from 'react';

import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Separator } from '@components/ui/Separator';
import { GradientText } from '@components/ui/Typography';
import { Link, useLocation, useRouterState } from '@tanstack/react-router';
import { Globe, Image, Settings } from 'lucide-react';

const sidebarItems = [
	{ Icon: Globe, path: '/' },
	// TODO: real path
	{ Icon: Image, path: '/yo' },
];
const routeLabels: Record<string, string> = {
	'/': 'TRACKER',
	'/settings': 'SETTINGS',
};
interface RootLayoutProps {
	userName: string | null;
	children: ReactNode;
}

const NavigationProgressBar = () => {
	const routerData = useRouterState({
		select: (state) => ({
			isLoading: state.isLoading,
			pendingPath: state.location.pathname,
			resolvedPath: state.resolvedLocation?.pathname,
		}),
	});

	if (!routerData.isLoading) return <Badge variant="outline">SYS.ONLINE</Badge>;

	return (
		<div className="flex flex-row items-center justify-center gap-4 px-2 py-0.5">
			<div className="animate-spin">/</div>
			<code className="animate-pulse font-mono text-sm font-semibold">Loading...</code>
		</div>
	);
};

const RootLayout = ({ children, userName }: RootLayoutProps) => {
	const { pathname } = useLocation();

	return (
		<div className="flex h-screen flex-col overflow-hidden">
			<header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-b-border px-8">
				<div className="flex flex-row items-center justify-center gap-2">
					<img src="/icon.svg" alt="Around" className="h-12 w-12" />
					<GradientText content="AROUND" className="font-bold" />
				</div>
				<div className="flex flex-row items-center gap-4">
					<NavigationProgressBar />
					{userName && (
						<>
							<Separator orientation="vertical" className="w-px data-[orientation=vertical]:h-4" />
							<Badge className="bg-linear-to-r from-pink-500 to-orange-600">{userName}</Badge>
						</>
					)}
				</div>
			</header>
			<div className="flex flex-1 overflow-hidden">
				<main className="flex-1 overflow-auto">{children}</main>
				<aside className="flex w-20 shrink-0 flex-col items-center border-l border-border bg-gradient py-4">
					<nav className="flex flex-1 flex-col items-center gap-4">
						{sidebarItems.map(({ Icon, path }, index) => (
							<Button
								key={`${index}-${path}`}
								variant="ghost"
								className=" text-muted-foreground"
								size="icon-lg"
								asChild>
								<Link to={path}>
									<Icon />
								</Link>
							</Button>
						))}
						<span className="cursor-default text-xs font-semibold tracking-widest text-muted-foreground [text-orientation:upright] [writing-mode:vertical-rl]">
							{routeLabels[pathname] ?? 'TRACKER'}
						</span>
					</nav>
					<Button variant="ghost" className=" text-muted-foreground" size="icon-lg" asChild>
						<Link to="/settings">
							<Settings />
						</Link>
					</Button>
				</aside>
			</div>
		</div>
	);
};

export { RootLayout };
