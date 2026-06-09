import type { ReactNode } from 'react';

import { AppSidebar } from '@components/sidebar/AppSidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/Avatar';
import { Separator } from '@components/ui/Separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@components/ui/Sidebar';
import { GradientText } from '@components/ui/Typography';
import { useLocation } from '@tanstack/react-router';
import { Globe } from 'lucide-react';

const RootLayout = ({ children }: { children: ReactNode }) => {
	const location = useLocation();

	return (
		<SidebarProvider>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-b-border px-4">
					<div className="flex flex-row items-center justify-center gap-4">
						<Globe />
						<GradientText content="Around" />
					</div>
					<div className="flex flex-row items-center gap-4">
						<span className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
							SYS.ONLINE
						</span>
						<Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
						<GradientText content={location.pathname} />
						<Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
						<Avatar>
							<AvatarImage
								src="https://github.com/shadcnn.png"
								alt="@shadcn"
								className="grayscale"
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
						<SidebarTrigger className="rotate-180" />
					</div>
				</header>
				{children}
			</SidebarInset>
			<AppSidebar side="right" variant="inset" collapsible="icon" />
		</SidebarProvider>
	);
};

export { RootLayout };
