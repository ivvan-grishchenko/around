import { queryOptions } from '@tanstack/react-query';

import { getCoverageStats, getGlobeGeoJson, getVisitedCountries } from './functions';

const globeQueryOptions = queryOptions({
	queryFn: () => getGlobeGeoJson(),
	queryKey: ['globe-geo-json'],
	staleTime: Infinity,
	structuralSharing: false,
});

const visitedCountriesQueryOptions = queryOptions({
	queryFn: () => getVisitedCountries(),
	queryKey: ['visited-countries'],
	structuralSharing: false,
});

const coverageStatsQueryOptions = queryOptions({
	queryFn: () => getCoverageStats(),
	queryKey: ['coverage-stats'],
	structuralSharing: false,
});

export { globeQueryOptions, visitedCountriesQueryOptions, coverageStatsQueryOptions };
