import { Button } from '@components/ui/Button';
import { CardContent, CardFooter } from '@components/ui/Card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@components/ui/Field';
import { PasswordInput } from '@components/ui/Input';
import { useAppForm } from '@hooks/use-form';
import { authClient } from '@lib/auth.client';
import { ClientOnly, Link, useNavigate } from '@tanstack/react-router';
import { type SubmitEvent, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { PasswordResetFormSkeleton } from './PasswordResetFormSkeleton';

const newPasswordSchema = z.object({
	newPassword: z
		.string()
		// oxlint-disable-next-line no-magic-numbers
		.min(8, 'Password must be at least 8 characters long')
		// oxlint-disable-next-line no-magic-numbers
		.max(100, 'Password is too long')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

interface ResetPasswordFormProps {
	error?: string;
	token?: string;
	redirect?: string;
}

const ResetPasswordFormContent = ({ token, redirect }: { token: string; redirect?: string }) => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate();

	const form = useAppForm({
		defaultValues: { newPassword: '' },
		onSubmit: async ({ value }) => {
			const toastResponse = toast.promise(
				async () => {
					const { data, error } = await authClient.resetPassword({
						newPassword: value.newPassword,
						token,
					});
					if (error) throw new Error(error.message ?? 'Password reset failed');
					return data;
				},
				{
					error: (err) => (err instanceof Error ? String(err.message) : 'Password reset failed'),
					loading: 'Resetting password...',
					position: 'top-center',
					success: 'Password reset successful. You can now sign in.',
				}
			);

			try {
				await toastResponse.unwrap();
				void navigate({ from: '/reset-password', to: redirect ?? '/login' });
			} catch {}
		},
		validators: { onSubmit: newPasswordSchema },
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
		<form.AppForm>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<CardContent>
					<FieldGroup>
						<form.Field
							name="newPassword"
							children={({ state, handleChange, handleBlur }) => (
								<Field>
									<FieldLabel htmlFor="newPassword">
										Password <span className="text-destructive">*</span>
									</FieldLabel>
									<PasswordInput
										id="newPassword"
										required
										value={state.value}
										onChange={(event) => handleChange(event.target.value)}
										onBlur={handleBlur}
										placeholder="Enter new password"
										aria-invalid={Boolean(state.meta.errors.length)}
										visible={passwordVisible}
										onVisibilityChange={setPasswordVisible}
									/>
									{Boolean(state.meta.errors) && (
										<FieldError>{state.meta.errors.at(0)?.message}</FieldError>
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</CardContent>
				<CardFooter>
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<Button type="submit" disabled={isSubmitting} className="w-full">
								Reset Password
							</Button>
						)}
					</form.Subscribe>
				</CardFooter>
			</form>
		</form.AppForm>
	);
};
const ResetPasswordForm = (props: ResetPasswordFormProps) =>
	!props.token ? (
		<CardFooter>
			<Button asChild className="w-full">
				<Link to="/login">Back to Login</Link>
			</Button>
		</CardFooter>
	) : (
		<ClientOnly fallback={<PasswordResetFormSkeleton />}>
			<ResetPasswordFormContent token={props.token} redirect={props.redirect} />
		</ClientOnly>
	);

export { ResetPasswordForm };
