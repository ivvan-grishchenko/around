import { withForm } from '@hooks/use-form';

import { settingsFormOpts } from './SharedFormOpts';

const timezoneOptions = [
	{ label: 'UTC -12:00 (Baker Island Time)', value: 'UTC-12:00' },
	{ label: 'UTC -11:00 (Samoa Standard Time)', value: 'UTC-11:00' },
	{ label: 'UTC -10:00 (Hawaii-Aleutian Time)', value: 'UTC-10:00' },
	{ label: 'UTC -09:00 (Alaska Time)', value: 'UTC-09:00' },
	{ label: 'UTC -08:00 (Pacific Time)', value: 'UTC-08:00' },
	{ label: 'UTC -07:00 (Mountain Time)', value: 'UTC-07:00' },
	{ label: 'UTC -06:00 (Central Time)', value: 'UTC-06:00' },
	{ label: 'UTC -05:00 (Eastern Time)', value: 'UTC-05:00' },
	{ label: 'UTC +00:00 (Greenwich Mean Time)', value: 'UTC+00:00' },
	{ label: 'UTC +01:00 (Central European Time)', value: 'UTC+01:00' },
	{ label: 'UTC +02:00 (Eastern European Time)', value: 'UTC+02:00' },
	{ label: 'UTC +03:00 (Moscow Time)', value: 'UTC+03:00' },
	{ label: 'UTC +05:30 (India Standard Time)', value: 'UTC+05:30' },
	{ label: 'UTC +08:00 (China Standard Time)', value: 'UTC+08:00' },
	{ label: 'UTC +09:00 (Japan Standard Time)', value: 'UTC+09:00' },
	{ label: 'UTC +10:00 (Australian Eastern Time)', value: 'UTC+10:00' },
];

const GeographyFields = withForm({
	...settingsFormOpts,
	render: ({ form }) => (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			<form.AppField
				name="homeBaseCoordinates"
				children={(field) => (
					<field.TextField
						id="home-base-coordinates"
						label="HOME BASE COORDINATES"
						placeholder="37.7749° N, 122.4194° W"
					/>
				)}
			/>
			<form.AppField
				name="localTimezone"
				children={(field) => (
					<field.SelectField id="local-timezone" label="LOCAL TIMEZONE" options={timezoneOptions} />
				)}
			/>
		</div>
	),
});

export { GeographyFields };
