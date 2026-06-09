import type { GeoJsonData } from '@components/globe/GlobeConstants';

import { GEOJSON_URL } from '@components/globe/GlobeConstants';
import { InteractiveGlobeClient } from '@components/globe/InteractiveGlobe.client';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

const getGlobeGeoJson = createServerFn().handler(async () => {
	const res = await fetch(GEOJSON_URL);
	const geoJSON: GeoJsonData = await res.json();

	return geoJSON;
});

const globeQueryOptions = queryOptions({
	queryFn: () => getGlobeGeoJson(),
	queryKey: ['globe-geo-json'],
	staleTime: Infinity,
	structuralSharing: false,
});

const Home = () => {
	const { data } = useSuspenseQuery(globeQueryOptions);

	return (
		<ClientOnly fallback={<div className="flex-1 bg-background" />}>
			<div className="flex-1 overflow-hidden">
				<InteractiveGlobeClient geoData={data} />
			</div>
		</ClientOnly>
	);
};

const Route = createFileRoute('/_layout/')({
	component: Home,
	loader: async ({ context }) => await context.queryClient.ensureQueryData(globeQueryOptions),
});

export { Route };
