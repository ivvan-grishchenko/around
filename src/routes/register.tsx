import type { ReactNode } from 'react';

import { WavyBackgroundClient } from '@components/layout/WavyBackground';
import { RegisterForm } from '@components/register/RegisterForm.client';
import { RegisterFormSkeleton } from '@components/register/RegisterFormSkeleton';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { CompositeComponent, createCompositeComponent } from '@tanstack/react-start/rsc';
import { z } from 'zod';

const registerSearchSchema = z.object({ redirect: z.string().optional() });

const getRegisterPage = createServerFn().handler(async () => {
	const src = await createCompositeComponent((props: { children: ReactNode }) => (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
			<div className="w-full max-w-sm">{props.children}</div>
		</div>
	));

	return { src };
});

const registerPageQueryOptions = queryOptions({
	queryFn: () => getRegisterPage(),
	queryKey: ['register'],
	structuralSharing: false,
});

const RegisterPage = () => {
	const { data } = useSuspenseQuery(registerPageQueryOptions);
	const { redirect } = Route.useSearch();

	return (
		<CompositeComponent src={data.src}>
			<WavyBackgroundClient />
			<div className="relative z-10">
				<ClientOnly fallback={<RegisterFormSkeleton />}>
					<RegisterForm redirect={redirect} />
				</ClientOnly>
			</div>
		</CompositeComponent>
	);
};

const Route = createFileRoute('/register')({
	component: RegisterPage,
	loader: async (context) => {
		await context.context.queryClient.ensureQueryData(registerPageQueryOptions);
	},
	validateSearch: (search) => registerSearchSchema.parse(search),
});

export { Route };
