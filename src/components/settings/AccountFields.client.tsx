import { Button } from '@components/ui/Button';
import { Separator } from '@components/ui/Separator';
import { withForm } from '@hooks/use-form';
import { authClient } from '@lib/auth.client';
import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { settingsFormOpts } from './SharedFormOpts';

const AccountFields = withForm({
	...settingsFormOpts,
	render: () => {
		const navigate = useNavigate();

		const handleSignOut = useCallback(async () => {
			await authClient.signOut();
			void navigate({ to: '/login' });
		}, [navigate]);

		// TODO: implement real logic
		const handleDeleteAccount = useCallback(() => {
			toast.error('TODO: confirm + trigger account deletion');
		}, []);

		return (
			<div className="flex flex-col gap-6 rounded-lg border border-border p-6">
				<div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h4 className="text-base font-semibold">Sign Out</h4>
						<p className="text-sm text-muted-foreground">End your current session on this device</p>
					</div>
					<Button type="button" variant="outline" onClick={handleSignOut}>
						Sign Out
					</Button>
				</div>
				<Separator />
				<div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h4 className="text-base font-semibold text-destructive">Delete Account</h4>
						<p className="text-sm text-muted-foreground">
							Permanently delete your account and all associated data
						</p>
					</div>
					<Button type="button" variant="destructive" onClick={handleDeleteAccount}>
						Delete Account
					</Button>
				</div>
			</div>
		);
	},
});

export { AccountFields };
