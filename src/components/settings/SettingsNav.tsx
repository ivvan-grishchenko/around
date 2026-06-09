import { Button } from '@components/ui/Button';
import { Separator } from '@components/ui/Separator';
import { Link } from '@tanstack/react-router';
import { Download, LayoutGrid, MapPin, ShieldAlert, User } from 'lucide-react';

const navItems = [
	{ hash: '#profile', icon: User, label: 'Profile' },
	{ hash: '#geography', icon: MapPin, label: 'Geography' },
	{ hash: '#interface', icon: LayoutGrid, label: 'Interface' },
	{ hash: '#data-export', icon: Download, label: 'Data & Export' },
	{ danger: true, hash: '#account', icon: ShieldAlert, label: 'Account' },
];
const activeOptions = { includeHash: true };
const activeLinkProps = { className: 'bg-muted' };

const SettingsNav = () => (
	<aside className="h-full w-60 shrink-0 border-r border-r-border bg-gradient">
		<div className="flex flex-col gap-2 p-4">
			<p className="px-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
				Settings
			</p>
			{navItems.map((item, index) => (
				<div key={item.hash} className="flex flex-col gap-2">
					{item.danger && index > 0 && <Separator className="my-1" />}
					<Button
						asChild
						variant="ghost"
						className={
							item.danger
								? 'justify-start text-destructive hover:bg-destructive/10 hover:text-destructive'
								: 'justify-start'
						}>
						<Link
							to="/settings"
							hash={item.hash}
							activeProps={activeLinkProps}
							activeOptions={activeOptions}>
							<item.icon className="size-5" />
							{item.label}
						</Link>
					</Button>
				</div>
			))}
		</div>
	</aside>
);

export { SettingsNav };
