import type { ComponentProps } from 'react';

import { NavMain } from '@components/sidebar/NavMain';
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from '@components/ui/Sidebar';
import { BookOpen, Bot, Settings2, SquareTerminal } from 'lucide-react';

import { NavUser } from './NavUser';

const data = {
	navMain: [
		{
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'History',
					url: '#',
				},
				{
					title: 'Starred',
					url: '#',
				},
				{
					title: 'Settings',
					url: '#',
				},
			],
			title: 'Playground',
			url: '#',
		},
		{
			icon: Bot,
			items: [
				{
					title: 'Genesis',
					url: '#',
				},
				{
					title: 'Explorer',
					url: '#',
				},
				{
					title: 'Quantum',
					url: '#',
				},
			],
			title: 'Models',
			url: '#',
		},
		{
			icon: BookOpen,
			items: [
				{
					title: 'Introduction',
					url: '#',
				},
				{
					title: 'Get Started',
					url: '#',
				},
				{
					title: 'Tutorials',
					url: '#',
				},
				{
					title: 'Changelog',
					url: '#',
				},
			],
			title: 'Documentation',
			url: '#',
		},
		{
			icon: Settings2,
			items: [
				{
					title: 'Preferences',
					url: '/settings',
				},
			],
			title: 'Settings',
			url: '/settings',
		},
	],
	user: {
		avatar: '/avatars/shadcn.jpg',
		email: 'm@example.com',
		name: 'shadcn',
	},
};

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => (
	<Sidebar {...props}>
		<SidebarContent>
			<NavMain items={data.navMain} />
		</SidebarContent>
		<SidebarFooter>
			<NavUser user={data.user} />
		</SidebarFooter>
		<SidebarRail />
	</Sidebar>
);

export { AppSidebar };
