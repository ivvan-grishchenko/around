import type { ComponentProps } from 'react';
import type { ZodError } from 'zod';

import { Field, FieldDescription, FieldError, FieldLabel } from '@components/ui/Field';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@components/ui/Select';
import { useFieldContext } from '@hooks/use-form';
import { useCallback } from 'react';

interface SelectOption {
	label: string;
	value: string;
}

interface SelectFieldProps {
	label: string;
	description?: string;
	placeholder?: string;
	options: SelectOption[];
	id: string;
}

const renderError = (errors: ZodError['issues']) => {
	if (!errors.length) return <></>;

	const errorMessage = errors.at(0)?.message;

	return <FieldError>{errorMessage}</FieldError>;
};

const SelectField = ({
	label,
	description,
	placeholder,
	options,
	id,
	...props
}: SelectFieldProps &
	Omit<ComponentProps<typeof Select>, 'value' | 'onValueChange' | 'onOpenChange' | 'children'>) => {
	const field = useFieldContext<string>();
	const { errors } = field.state.meta;

	const handleValueChange = useCallback((value: string) => field.handleChange(value), [field]);

	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (!open) field.handleBlur();
		},
		[field]
	);

	return (
		<Field>
			<FieldLabel htmlFor={id}>
				{label} {props.required && <span className="text-destructive">*</span>}
			</FieldLabel>
			<Select
				value={field.state.value ?? ''}
				onValueChange={handleValueChange}
				onOpenChange={handleOpenChange}
				{...props}>
				<SelectTrigger id={id} aria-invalid={Boolean(errors.length)}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{renderError(errors)}
			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	);
};

export { SelectField };
