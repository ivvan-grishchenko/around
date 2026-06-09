import type { ReactNode } from 'react';

import { SettingsForm } from '@components/settings/SettingsForm.client';
import { SettingsFormSkeleton } from '@components/settings/SettingsFormSkeleton';
import { SettingsNav } from '@components/settings/SettingsNav';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { CompositeComponent, createCompositeComponent } from '@tanstack/react-start/rsc';
import { z } from 'zod';

import { PrismaService } from '../../../prisma.server';

const settingsPageInputSchema = z.object({
	userId: z.string().optional(),
});

const getSettingsPage = createServerFn()
	.inputValidator(settingsPageInputSchema)
	.handler(async ({ data }) => {
		const prisma = PrismaService.getInstance();

		const user = data.userId
			? await prisma.user.findUnique({
					select: { createdAt: true, email: true, name: true },
					where: { id: data.userId },
				})
			: null;

		const src = await createCompositeComponent((props: { children: ReactNode }) => (
			<div className="flex flex-1">
				<SettingsNav />
				<div className="w-full p-20">{props.children}</div>
			</div>
		));

		return {
			src,
			user: user ? { createdAt: user.createdAt, email: user.email, name: user.name } : null,
		};
	});

const settingsPageQueryOptions = (userId: string | undefined) =>
	queryOptions({
		queryFn: () => getSettingsPage({ data: { userId } }),
		queryKey: ['settings', userId],
		structuralSharing: false,
	});

const SettingsPage = () => {
	const { session } = Route.useRouteContext();
	const { data } = useSuspenseQuery(settingsPageQueryOptions(session?.user.id));

	return (
		<CompositeComponent src={data.src}>
			<ClientOnly fallback={<SettingsFormSkeleton />}>
				<SettingsForm user={data.user} />
			</ClientOnly>
		</CompositeComponent>
	);
};

const Route = createFileRoute('/_layout/_protected/settings')({
	component: SettingsPage,
	loader: async (context) => {
		await context.context.queryClient.ensureQueryData(
			settingsPageQueryOptions(context.context.session?.user.id)
		);
	},
});

export { Route };
