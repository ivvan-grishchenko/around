import type { VisitedCountry } from '@components/tracker/VisitedLog';

import { InteractiveGlobeClient } from '@components/globe/InteractiveGlobe.client';
import { AddEntryForm } from '@components/tracker/AddEntryForm.client';
import { CoverageCard } from '@components/tracker/CoverageCard';
import { VisitedLog } from '@components/tracker/VisitedLog';
import { removeVisitedCountry } from '@queries/home/functions';
import {
	coverageStatsQueryOptions,
	globeQueryOptions,
	visitedCountriesQueryOptions,
} from '@queries/home/query-options';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';

const Home = () => {
	const { queryClient } = Route.useRouteContext();
	const { data: geoData } = useSuspenseQuery(globeQueryOptions);
	const { data: countries } = useSuspenseQuery(visitedCountriesQueryOptions);
	const { data: stats } = useSuspenseQuery(coverageStatsQueryOptions);

	const removeMutation = useMutation({
		mutationFn: (id: string) => removeVisitedCountry({ data: { id } }),
		onError: () => {
			toast.error('Failed to remove entry');
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['visited-countries'] });
			void queryClient.invalidateQueries({ queryKey: ['coverage-stats'] });
			toast.success('Entry removed');
		},
	});

	const isEmpty = countries.length === 0;

	return (
		<div className="flex h-[calc(100vh-4rem)]">
			<div className="flex w-80 flex-col border-r border-border/50 bg-gradient">
				<VisitedLog
					countries={countries as VisitedCountry[]}
					onRemove={(id) => removeMutation.mutate(id)}
				/>
				<AddEntryForm isEmpty={isEmpty} />
			</div>
			<div className="flex flex-1 flex-col gap-4 overflow-hidden p-4">
				<CoverageCard visited={stats.visited} total={stats.total} />
				<ClientOnly fallback={<div className="flex-1 bg-background" />}>
					<div className="flex-1 overflow-hidden">
						<InteractiveGlobeClient geoData={geoData} />
					</div>
				</ClientOnly>
			</div>
		</div>
	);
};

const Route = createFileRoute('/_layout/')({
	component: Home,
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(globeQueryOptions),
			context.queryClient.ensureQueryData(visitedCountriesQueryOptions),
			context.queryClient.ensureQueryData(coverageStatsQueryOptions),
		]);
	},
});

export { Route };
