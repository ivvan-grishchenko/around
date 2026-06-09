import type { AnyFormApi } from '@tanstack/react-form';

import { withForm } from '@hooks/use-form';
import { cn } from '@lib/utils';

import { type MappingPreference, settingsFormOpts } from './SharedFormOpts';

interface ThemeOption {
	background: string;
	label: string;
	value: MappingPreference;
}

const themes: ThemeOption[] = [
	{ background: 'bg-zinc-900', label: 'MONOLITH DARK', value: 'monolith-dark' },
	{
		background: 'bg-gradient-to-br from-blue-900 to-blue-950',
		label: 'DEEP OCEAN',
		value: 'deep-ocean',
	},
	{
		background: 'bg-gradient-to-br from-purple-900 to-pink-900',
		label: 'NEBULA GRADIENT',
		value: 'nebula-gradient',
	},
];

const MappingPreferenceCards = ({ form }: { form: AnyFormApi }) => {
	const current = form.getFieldValue('mappingPreference') as MappingPreference;

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			{themes.map((theme) => {
				const isSelected = current === theme.value;
				return (
					<button
						key={theme.value}
						type="button"
						onClick={() => form.setFieldValue('mappingPreference', theme.value)}
						className={cn(
							'flex h-32 items-end rounded-lg p-3 text-left text-sm font-semibold tracking-wider text-foreground transition-all',
							theme.background,
							isSelected
								? 'ring-2 ring-primary'
								: 'ring-1 ring-transparent hover:ring-muted-foreground/40'
						)}
						aria-pressed={isSelected}>
						{theme.label}
					</button>
				);
			})}
		</div>
	);
};

const InterfaceFields = withForm({
	...settingsFormOpts,
	render: ({ form }) => <MappingPreferenceCards form={form} />,
});

export { InterfaceFields };
