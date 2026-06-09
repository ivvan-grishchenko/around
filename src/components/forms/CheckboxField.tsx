import type { CheckboxProps } from '@components/ui/Checkbox';

import { Checkbox } from '@components/ui/Checkbox';
import { Field, FieldDescription, FieldLabel } from '@components/ui/Field';
import { useFieldContext } from '@hooks/use-form';

interface CheckboxFieldProps {
	label: string;
	description?: string;
}

const CheckboxField = ({
	label,
	description,
	...props
}: CheckboxFieldProps & Omit<CheckboxProps, 'value' | 'onBlur'>) => {
	const field = useFieldContext<boolean>();

	return (
		<Field orientation="horizontal" className="flex-row justify-end">
			<div className="flex w-full items-center justify-end gap-2">
				<FieldLabel htmlFor={props.id}>
					{label} {props.required && <span className="text-destructive">*</span>}
				</FieldLabel>
				<Checkbox
					id={props.id}
					checked={field.state.value}
					onCheckedChange={(checked) => field.handleChange(checked === true)}
					onBlur={field.handleBlur}
					{...props}
				/>
			</div>
			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	);
};

export { CheckboxField };
