import type { ComponentProps, SubmitEvent } from 'react';

import { Button } from '@components/ui/Button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@components/ui/Field';
import { PasswordInput } from '@components/ui/Input';
import { useAppForm } from '@hooks/use-form';
import { authClient } from '@lib/auth.client';
import { cn } from '@lib/utils';
import { Link, useNavigate } from '@tanstack/react-router';
import { Globe } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const registerFormSchema = z
	.object({
		confirmPassword: z.string(),
		email: z.email('Invalid email address'),
		name: z.string(),
		password: z
			.string()
			// oxlint-disable-next-line no-magic-numbers
			.min(8, 'Password must be at least 8 characters long')
			// oxlint-disable-next-line no-magic-numbers
			.max(100, 'Password is too long')
			.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
			.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
			.regex(/[0-9]/, 'Password must contain at least one number')
			.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
	})
	.refine((data) => data.confirmPassword === data.password, {
		error: "Passwords don't match",
		path: ['confirmPassword'],
	});

const RegisterForm = ({
	className,
	redirect,
	...props
}: ComponentProps<'div'> & { redirect?: string }) => {
	const navigate = useNavigate();
	const [passwordVisible, setPasswordVisible] = useState(false);

	const form = useAppForm({
		defaultValues: { confirmPassword: '', email: '', name: '', password: '' },
		onSubmit: async ({ value }) => {
			const toastResponse = toast.promise(
				async () => {
					const callbackUrl = new URL(redirect ?? '/', import.meta.env.VITE_APP_URL);

					const { data, error } = await authClient.signUp.email({
						...value,
						callbackURL: callbackUrl.toString(),
					});
					if (error) throw new Error(error.message ?? 'Registration failed');

					return data;
				},
				{
					error: (err) => (err instanceof Error ? String(err.message) : 'Registration failed'),
					loading: 'Registring...',
					position: 'top-center',
					success: () => 'Account created',
				}
			);

			try {
				await toastResponse.unwrap();

				void navigate({ from: '/register', search: { redirect }, to: '/login' });
			} catch {}
		},
		validators: { onSubmit: registerFormSchema },
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
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<form onSubmit={handleSubmit}>
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<div className="flex flex-col items-center gap-2 font-medium">
							<div className="flex size-8 items-center justify-center rounded-md">
								<Globe className="size-6" />
							</div>
							<span className="sr-only">Around</span>
						</div>
						<h1 className="text-xl font-bold">Welcome to Around</h1>
						<FieldDescription>
							Already have an account?{' '}
							<Button variant="link" asChild>
								{/*oxlint-disable-next-line react-perf/jsx-no-new-object-as-prop*/}
								<Link to="/login" search={{ redirect }}>
									Log in
								</Link>
							</Button>
						</FieldDescription>
					</div>
					<form.AppField
						name="name"
						children={(field) => <field.TextField label="name" required placeholder="John Doe" />}
					/>
					<form.AppField
						name="email"
						children={(field) => (
							<field.TextField label="email" required placeholder="john.doe@gmail.com" />
						)}
					/>
					<form.Field
						name="password"
						children={({ state, handleChange, handleBlur }) => (
							<Field>
								<FieldLabel htmlFor="password">
									Password <span className="text-destructive">*</span>
								</FieldLabel>
								<PasswordInput
									id="password"
									required
									value={state.value}
									onChange={(event) => handleChange(event.target.value)}
									onBlur={handleBlur}
									placeholder="Enter password"
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
					<form.Field
						name="confirmPassword"
						children={({ state, handleChange, handleBlur }) => (
							<Field>
								<FieldLabel htmlFor="confirmPassword">
									Password <span className="text-destructive">*</span>
								</FieldLabel>
								<PasswordInput
									id="confirmPassword"
									required
									value={state.value}
									onChange={(event) => handleChange(event.target.value)}
									onBlur={handleBlur}
									placeholder="Confirm password"
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
					<form.AppForm>
						<form.SubscribeButton label="Register" />
					</form.AppForm>
				</FieldGroup>
			</form>
		</div>
	);
};

export { RegisterForm };
