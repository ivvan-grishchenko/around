import { withForm } from '@hooks/use-form';

import { settingsFormOpts } from './SharedFormOpts';

const ProfileFields = withForm({
	...settingsFormOpts,
	render: ({ form }) => (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			<form.AppField
				name="displayName"
				children={(field) => <field.TextField id="display-name" label="DISPLAY NAME" />}
			/>
			<form.AppField
				name="userHandle"
				children={(field) => <field.TextField id="user-handle" label="USER HANDLE" />}
			/>
		</div>
	),
});

export { ProfileFields };
