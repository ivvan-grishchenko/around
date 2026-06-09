import { CheckboxField } from '@components/forms/CheckboxField';
import { SelectField } from '@components/forms/SelectField';
import { SubscribeButton } from '@components/forms/SubscribeButton';
import { TextField } from '@components/forms/TextField';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		CheckboxField,
		SelectField,
		TextField,
	},
	fieldContext,
	formComponents: {
		SubscribeButton,
	},
	formContext,
});

export { fieldContext, formContext, useAppForm, useFieldContext, useFormContext, withForm };
