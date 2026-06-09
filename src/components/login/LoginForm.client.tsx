import type { ComponentProps, SubmitEvent } from 'react';

import { Button } from '@components/ui/Button';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from '@components/ui/Field';
import { PasswordInput } from '@components/ui/Input';
import { useAppForm } from '@hooks/use-form';
import { authClient } from '@lib/auth.client';
import { cn } from '@lib/utils';
import { Link, useNavigate } from '@tanstack/react-router';
import { Globe } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { ForgotPassword } from './ForgotPassoword.client';

const loginFormSchema = z.object({
	email: z.email('Invalid email address'),
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
	rememberMe: z.boolean(),
});

const LoginForm = ({
	className,
	redirect,
	...props
}: ComponentProps<'div'> & { redirect?: string }) => {
	const navigate = useNavigate();

	const form = useAppForm({
		defaultValues: { email: '', password: '', rememberMe: true },
		onSubmit: async ({ value }) => {
			const toastResponse = toast.promise(
				async () => {
					const callbackUrl = new URL(redirect ?? '/', import.meta.env.VITE_APP_URL);

					const { data, error } = await authClient.signIn.email({
						...value,
						callbackURL: callbackUrl.toString(),
					});
					if (error) throw new Error(error.message ?? 'Sign in failed');

					return data;
				},
				{
					error: (err) => (err instanceof Error ? String(err.message) : 'Sign in failed'),
					loading: 'Signing in...',
					position: 'top-center',
					success: (data) => `Welcome back, ${data.user.name}`,
				}
			);

			try {
				const unwrap = await toastResponse.unwrap();

				if (unwrap.redirect) return;

				const redirectUrl = redirect ?? '/';
				void navigate({ from: '/login', to: redirectUrl });
			} catch {}
		},
		validators: { onSubmit: loginFormSchema },
	});

	const handleGoogleSignIn = useCallback(async () => {
		const toastResponse = toast.promise(
			async () => {
				const { data, error } = await authClient.signIn.social({ provider: 'google' });

				if (error) {
					const errorMessage =
						error.code === 'EMAIL_NOT_VERIFIED'
							? 'Please verify your email address'
							: (error.message ?? 'Sign in failed');

					throw new Error(errorMessage);
				}
				return data;
			},
			{
				error: (err) => (err instanceof Error ? String(err.message) : 'Google sign-in failed'),
				loading: 'Signing in...',
				position: 'top-center',
				success: () => 'Successfully logged in.',
			}
		);

		try {
			await toastResponse.unwrap();

			const redirectUrl = redirect ?? '/';

			void navigate({ from: '/login', to: redirectUrl });
		} catch {}
	}, [navigate, redirect]);

	const handleSubmit = useCallback(
		(event: SubmitEvent<HTMLFormElement>) => {
			event.preventDefault();
			event.stopPropagation();
			void form.handleSubmit();
		},
		[form]
	);

	return (
		<div className={cn('flex flex-col gap-4', className)} {...props}>
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
							Don&apos;t have an account?{' '}
							<Button variant="link" asChild>
								{/*oxlint-disable-next-line react-perf/jsx-no-new-object-as-prop*/}
								<Link to="/register" search={{ redirect }}>
									Sign up
								</Link>
							</Button>
						</FieldDescription>
					</div>
					<form.AppField
						name="email"
						children={(field) => (
							<field.TextField id="email" label="email" required placeholder="john.doe@gmail.com" />
						)}
					/>
					<form.Field
						name="password"
						children={({ state, handleChange, handleBlur }) => (
							<Field>
								<div className="flex items-center justify-between">
									<FieldLabel htmlFor="password">
										Password <span className="text-destructive">*</span>
									</FieldLabel>
									<ForgotPassword redirect={redirect} />
								</div>
								<PasswordInput
									id="password"
									required
									value={state.value}
									onChange={(event) => handleChange(event.target.value)}
									onBlur={handleBlur}
									placeholder="Enter password"
									aria-invalid={Boolean(state.meta.errors.length)}
								/>
								{Boolean(state.meta.errors) && (
									<FieldError>{state.meta.errors.at(0)?.message}</FieldError>
								)}
							</Field>
						)}
					/>
					<form.AppField
						name="rememberMe"
						children={(field) => <field.CheckboxField id="rememberMe" label="Remember me" />}
					/>
					<FieldSeparator>Or</FieldSeparator>
					<Field className="flex items-center">
						<Button variant="outline" type="button" onClick={handleGoogleSignIn}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
									fill="currentColor"
								/>
							</svg>
							Continue with Google
						</Button>
					</Field>
					<form.AppForm>
						<form.SubscribeButton label="Login" />
					</form.AppForm>
				</FieldGroup>
			</form>
		</div>
	);
};

export { LoginForm };
