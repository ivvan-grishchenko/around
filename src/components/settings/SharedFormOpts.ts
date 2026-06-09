import { formOptions } from '@tanstack/react-form';
import { z } from 'zod';

type MappingPreference = 'monolith-dark' | 'deep-ocean' | 'nebula-gradient';

const settingsFormOpts = formOptions({
	defaultValues: {
		displayName: '',
		homeBaseCoordinates: '',
		localTimezone: 'UTC-08:00',
		mappingPreference: 'monolith-dark' as MappingPreference,
		userHandle: '',
	},
	validators: {
		onSubmit: z.object({
			displayName: z.string().min(1, 'Required'),
			homeBaseCoordinates: z.string(),
			localTimezone: z.string(),
			mappingPreference: z.enum(['monolith-dark', 'deep-ocean', 'nebula-gradient']),
			userHandle: z.string().min(1, 'Required'),
		}),
	},
});

export { settingsFormOpts };
export type { MappingPreference };
