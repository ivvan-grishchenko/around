import type { GeoJsonData } from '@components/globe/GlobeConstants';

import { GEOJSON_URL } from '@components/globe/GlobeConstants';
import { auth } from '@lib/auth.server';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { z } from 'zod';

import { PrismaService } from '../../prisma.server';

const COUNTRY_CODE_MAX_LENGTH = 3;
const COUNTRY_CODE_MIN_LENGTH = 2;
const COUNTRY_NAME_MIN_LENGTH = 1;
const TOTAL_COUNTRIES = 195;

const getGlobeGeoJson = createServerFn().handler(async () => {
	const res = await fetch(GEOJSON_URL);
	const geoJSON: GeoJsonData = await res.json();

	return geoJSON;
});

const getVisitedCountries = createServerFn({ method: 'GET' }).handler(async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	if (!session) return [];

	const prisma = PrismaService.getInstance();

	return prisma.visitedCountry.findMany({
		orderBy: { visitedAt: 'desc' },
		select: {
			countryCode: true,
			countryName: true,
			createdAt: true,
			id: true,
			visitedAt: true,
		},
		where: { userId: session.user.id },
	});
});

const getCoverageStats = createServerFn({ method: 'GET' }).handler(async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	if (!session) return { total: TOTAL_COUNTRIES, visited: 0 };

	const prisma = PrismaService.getInstance();

	const count = await prisma.visitedCountry.count({
		where: { userId: session.user.id },
	});

	return { total: TOTAL_COUNTRIES, visited: count };
});

const removeVisitedCountryInputSchema = z.object({
	id: z.uuid(),
});

const removeVisitedCountry = createServerFn()
	.validator(removeVisitedCountryInputSchema)
	.handler(async ({ data }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) throw new Error('Unauthorized');

		const prisma = PrismaService.getInstance();

		await prisma.visitedCountry.delete({
			where: { id: data.id, userId: session.user.id },
		});

		return { success: true };
	});

const addVisitedCountryInputSchema = z.object({
	countryCode: z.string().min(COUNTRY_CODE_MIN_LENGTH).max(COUNTRY_CODE_MAX_LENGTH),
	countryName: z.string().min(COUNTRY_NAME_MIN_LENGTH),
	visitedAt: z.iso.datetime().optional(),
});

const addVisitedCountry = createServerFn()
	.validator(addVisitedCountryInputSchema)
	.handler(async ({ data }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) throw new Error('Unauthorized');

		const prisma = PrismaService.getInstance();

		const visitedAt = data.visitedAt ? new Date(data.visitedAt) : new Date();

		return prisma.visitedCountry.upsert({
			create: {
				countryCode: data.countryCode,
				countryName: data.countryName,
				userId: session.user.id,
				visitedAt,
			},
			update: { visitedAt },
			where: {
				userId_countryCode: {
					countryCode: data.countryCode,
					userId: session.user.id,
				},
			},
		});
	});

export {
	getGlobeGeoJson,
	getVisitedCountries,
	getCoverageStats,
	removeVisitedCountry,
	addVisitedCountry,
};
