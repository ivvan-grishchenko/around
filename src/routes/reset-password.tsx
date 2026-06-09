/* oxlint-disable sort-keys */
import type { ReactNode } from 'react';

import { BackgroundGradientAnimation } from '@components/layout/BackgroundGradientAnimation';
import { ResetPasswordForm } from '@components/password-reset/ResetPasswordForm.client';
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/Card';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { CompositeComponent, createCompositeComponent } from '@tanstack/react-start/rsc';
import { Globe } from 'lucide-react';
import { z } from 'zod';

const validateSearchSchema = z.object({
	error: z.string().optional(),
	redirect: z.string().optional(),
	token: z.string().optional(),
});
type Search = z.infer<typeof validateSearchSchema>;

const getResetPasswordPage = createServerFn()
	.inputValidator(validateSearchSchema)
	.handler(async ({ data }) => {
		const isError = Boolean(!data.token);
		const src = await createCompositeComponent(({ children }: { children: ReactNode }) => (
			<BackgroundGradientAnimation className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex flex-col items-center gap-2 font-medium">
							<div className="flex size-8 items-center justify-center rounded-md">
								<Globe className="size-6" />
							</div>
							<span className="sr-only">Around</span>
						</div>
						<CardTitle className="text-xl font-bold">
							{isError ? 'Reset link expired' : 'Reset your password'}
						</CardTitle>
						<CardDescription>
							{isError
								? 'This password reset link has expired or is invalid. Please request a new one.'
								: 'Enter a new password below to regain access to your account.'}
						</CardDescription>
					</CardHeader>
					{children}
				</Card>
			</BackgroundGradientAnimation>
		));

		return { src };
	});

const passwordResetQueryOptions = (data: Search) =>
	queryOptions({
		queryFn: () => getResetPasswordPage({ data }),
		queryKey: ['reset-password', ...Object.values(data)],
		structuralSharing: false,
	});

const ResetPasswordPage = () => {
	const search = Route.useSearch();
	const { data } = useSuspenseQuery(passwordResetQueryOptions(search));

	return (
		<CompositeComponent src={data.src}>
			<ResetPasswordForm error={search.error} token={search.token} redirect={search.redirect} />
		</CompositeComponent>
	);
};

const Route = createFileRoute('/reset-password')({
	validateSearch: (search) => validateSearchSchema.parse(search),
	beforeLoad: ({ search }) => search,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(
			passwordResetQueryOptions({
				error: context.error,
				token: context.token,
				redirect: context.redirect,
			})
		);
	},
	component: ResetPasswordPage,
});

export { Route };
