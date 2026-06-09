import type { ChangeEvent, ComponentProps } from 'react';
import type { ZodError } from 'zod';

import { Field, FieldDescription, FieldError, FieldLabel } from '@components/ui/Field';
import { Input } from '@components/ui/Input';
import { useFieldContext } from '@hooks/use-form';
import { useCallback } from 'react';

interface AppTextFieldProps {
	label: string;
	description?: string;
}

const renderError = (errors: ZodError['issues']) => {
	if (!errors.length) return <></>;

	const errorMessage = errors.at(0)?.message;

	return <FieldError>{errorMessage}</FieldError>;
};

const TextField = ({
	label,
	description,
	...props
}: AppTextFieldProps & Omit<ComponentProps<typeof Input>, 'value' | 'onChange' | 'onBlur'>) => {
	const field = useFieldContext<string>();
	const { errors } = field.state.meta;

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => field.handleChange(event.target.value),
		[field]
	);

	return (
		<Field>
			<FieldLabel htmlFor={props.id}>
				{label} {props.required && <span className="text-destructive">*</span>}
			</FieldLabel>
			<Input
				id={props.id}
				value={field.state.value}
				onChange={handleChange}
				onBlur={field.handleBlur}
				aria-invalid={Boolean(errors.length)}
				{...props}
			/>
			{renderError(errors)}
			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	);
};

export { TextField };
