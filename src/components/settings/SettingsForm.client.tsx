import type { ReactNode, SubmitEvent } from 'react';

import { useAppForm } from '@hooks/use-form';
import { cn } from '@lib/utils';
import { useCallback } from 'react';

import { AccountFields } from './AccountFields.client';
import { DataExportFields } from './DataExportFields.client';
import { GeographyFields } from './GeographyFields.client';
import { InterfaceFields } from './InterfaceFields.client';
import { ProfileFields } from './ProfileFields.client';
import { settingsFormOpts } from './SharedFormOpts';
import { UserInfo } from './UserInfo';

interface SettingsFormProps {
	user: {
		createdAt: Date | null;
		email: string;
		name: string;
	} | null;
}

const SectionHeading = ({ children, className }: { children: ReactNode; className?: string }) => (
	<h3 className={cn('text-lg font-semibold tracking-tight', className)}>{children}</h3>
);

const SettingsForm = ({ user }: SettingsFormProps) => {
	const form = useAppForm({
		...settingsFormOpts,
		defaultValues: {
			...settingsFormOpts.defaultValues,
			displayName: user?.name ?? '',
			userHandle: user ? user.email.split('@')[0] : '',
		},
		onSubmit: async ({ value }) => {
			// TODO: persist settings via server fn
			void value;
		},
	});

	const handleSubmit = useCallback(
		(event: SubmitEvent<HTMLFormElement>) => {
			event.preventDefault();
			event.stopPropagation();
			void form.handleSubmit();
		},
		[form]
	);

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-12">
			<section id="#profile" className="flex flex-col gap-8">
				<UserInfo
					createdAt={user?.createdAt ?? null}
					email={user?.email ?? ''}
					name={user?.name ?? ''}
				/>
				<div className="flex flex-col gap-3">
					<SectionHeading>Account Profile</SectionHeading>
					<ProfileFields form={form} />
				</div>
			</section>
			<section id="#geography" className="flex flex-col gap-3">
				<SectionHeading>Base Operations</SectionHeading>
				<GeographyFields form={form} />
			</section>
			<section id="#interface" className="flex flex-col gap-3">
				<SectionHeading>Mapping Preferences</SectionHeading>
				<InterfaceFields form={form} />
			</section>
			<section id="#data-export" className="flex flex-col gap-3">
				<SectionHeading>Data Archiving</SectionHeading>
				<DataExportFields form={form} />
			</section>
			<form.AppForm>
				<form.SubscribeButton label="SAVE CONFIGURATION" />
			</form.AppForm>
			<section id="#account" className="flex flex-col gap-3">
				<SectionHeading>Account</SectionHeading>
				<AccountFields form={form} />
			</section>
		</form>
	);
};

export { SettingsForm };
