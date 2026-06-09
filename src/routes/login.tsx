import type { ReactNode } from 'react';

import { WavyBackgroundClient } from '@components/layout/WavyBackground';
import { LoginForm } from '@components/login/LoginForm.client';
import { LoginFormSkeleton } from '@components/login/LoginFormSkeleton';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { CompositeComponent, createCompositeComponent } from '@tanstack/react-start/rsc';
import { z } from 'zod';

const loginSearchSchema = z.object({ redirect: z.string().optional() });

const getLoginPage = createServerFn().handler(async () => {
	const src = await createCompositeComponent((props: { children: ReactNode }) => (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
			<div className="w-full max-w-sm">{props.children}</div>
		</div>
	));

	return { src };
});

const loginPageQueryOptions = queryOptions({
	queryFn: () => getLoginPage(),
	queryKey: ['login'],
	structuralSharing: false,
});

const LoginPage = () => {
	const { data } = useSuspenseQuery(loginPageQueryOptions);
	const { redirect } = Route.useSearch();

	return (
		<CompositeComponent src={data.src}>
			<WavyBackgroundClient />
			<div className="relative z-10">
				<ClientOnly fallback={<LoginFormSkeleton />}>
					<LoginForm redirect={redirect} />
				</ClientOnly>
			</div>
		</CompositeComponent>
	);
};

const Route = createFileRoute('/login')({
	component: LoginPage,
	loader: async (context) => {
		await context.context.queryClient.ensureQueryData(loginPageQueryOptions);
	},
	validateSearch: (search) => loginSearchSchema.parse(search),
});

export { Route };
