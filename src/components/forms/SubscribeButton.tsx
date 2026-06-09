import { Button } from '@components/ui/Button';
import { Field } from '@components/ui/Field';
import { useFormContext } from '@hooks/use-form';
import { useCallback } from 'react';

interface AppSaveBarProps {
	label?: string;
	showDiscard?: boolean;
}

const SubscribeButton = ({ label = 'SAVE CONFIGURATION', showDiscard = true }: AppSaveBarProps) => {
	const form = useFormContext();

	const handleClick = useCallback(() => form.reset(), [form]);

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Field orientation="horizontal" className="flex flex-row gap-3 border-t border-border pt-6">
					{showDiscard && (
						<Button type="button" variant="ghost" onClick={handleClick} className="w-1/2">
							DISCARD
						</Button>
					)}
					<Button
						type="submit"
						disabled={isSubmitting}
						className={showDiscard ? 'w-1/2' : 'w-full'}
						onSubmit={() => form.handleSubmit()}>
						{label}
					</Button>
				</Field>
			)}
		</form.Subscribe>
	);
};

export { SubscribeButton };
