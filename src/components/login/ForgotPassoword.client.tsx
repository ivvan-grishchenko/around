import { Button } from '@components/ui/Button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/ui/Dialog';
import { FieldGroup } from '@components/ui/Field';
import { useAppForm } from '@hooks/use-form';
import { authClient } from '@lib/auth.client';
import { type SubmitEvent, useCallback } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const forgotPasswordSchema = z.object({ email: z.email('Invalid email address') });
interface ForgotPasswordProps {
	redirect?: string;
}

const ForgotPassword = ({ redirect }: ForgotPasswordProps) => {
	const form = useAppForm({
		defaultValues: { email: '' },
		onSubmit: ({ value }) => {
			toast.promise(
				async () => {
					const redirectUrl = new URL('reset-password', import.meta.env.VITE_APP_URL);
					if (redirect) redirectUrl.searchParams.append('redirect', redirect);

					const { data, error } = await authClient.requestPasswordReset({
						email: value.email,
						redirectTo: redirectUrl.toString(),
					});
					if (error) throw new Error(error.message ?? 'Request failed');

					return data;
				},
				{
					error: (err) => (err instanceof Error ? String(err.message) : 'Request failed'),
					loading: 'Processing...',
					position: 'top-center',
					success: () => 'Request succeeded. Check you email!',
				}
			);
		},
		validators: { onSubmit: forgotPasswordSchema },
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
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" className="ml-auto">
					Forgot your password?
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<form onSubmit={handleSubmit} className="contents">
					<DialogHeader>
						<DialogTitle>Reset your password</DialogTitle>
						<DialogDescription>
							Enter your email address below. We will send you a secure link to create a new
							password.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup>
						<form.AppField
							name="email"
							children={(field) => (
								<field.TextField
									id="email"
									label="email"
									required
									placeholder="john.doe@gmail.com"
								/>
							)}
						/>
					</FieldGroup>
					<DialogFooter className="sm:justify-end">
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Close
							</Button>
						</DialogClose>
						<form.Subscribe selector={(state) => state.isSubmitting}>
							{(isSubmitting) => (
								<Button type="submit" disabled={isSubmitting}>
									Submit
								</Button>
							)}
						</form.Subscribe>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export { ForgotPassword };
