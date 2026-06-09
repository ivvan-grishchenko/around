/* oxlint-disable no-magic-numbers, id-length, max-statements */

type Ring = [number, number][];

// oxlint-disable-next-line max-params
const interpolateLatAtAntimeridian = (
	lon1: number,
	lat1: number,
	lon2: number,
	lat2: number
): number => {
	const dLon = lon2 - lon1;
	const crossLon = lon1 > 0 ? 180 : -180;
	const t = (crossLon - lon1) / dLon;
	return lat1 + t * (lat2 - lat1);
};

const splitRingAtAntimeridian = (ring: Ring): Ring[] => {
	if (ring.length < 2) return [ring];

	const crossings: number[] = [];

	for (let i = 0; i < ring.length; i++) {
		const [lon1] = ring[i];
		const [lon2] = ring[(i + 1) % ring.length];
		if (Math.abs(lon2 - lon1) > 180) crossings.push(i);
	}

	if (crossings.length === 0) return [ring];

	if (crossings.length === 1) {
		const [crossIdx] = crossings;
		const [lon1, lat1] = ring[crossIdx];
		const [lon2, lat2] = ring[(crossIdx + 1) % ring.length];
		const crossLat = interpolateLatAtAntimeridian(lon1, lat1, lon2, lat2);

		const firstHalf: Ring = [];
		const secondHalf: Ring = [];

		for (let i = 0; i <= crossIdx; i++) firstHalf.push(ring[i]);

		firstHalf.push([lon1 > 0 ? 180 : -180, crossLat]);

		secondHalf.push([lon1 > 0 ? -180 : 180, crossLat]);
		for (let i = crossIdx + 1; i < ring.length; i++) secondHalf.push(ring[i]);

		secondHalf.push([lon1 > 0 ? -180 : 180, crossLat]);

		return [firstHalf, secondHalf];
	}

	if (crossings.length === 2) {
		const [idx1, idx2] = crossings;
		const [lon1a, lat1a] = ring[idx1];
		const [lon1b, lat1b] = ring[(idx1 + 1) % ring.length];
		const [lon2a, lat2a] = ring[idx2];
		const [lon2b, lat2b] = ring[(idx2 + 1) % ring.length];

		const crossLat1 = interpolateLatAtAntimeridian(lon1a, lat1a, lon1b, lat1b);
		const crossLat2 = interpolateLatAtAntimeridian(lon2a, lat2a, lon2b, lat2b);

		const sign1 = lon1a > 0 ? 1 : -1;
		const sign2 = lon2a > 0 ? 1 : -1;

		const firstRing: Ring = [];
		for (let i = idx1 + 1; i <= idx2; i++) firstRing.push(ring[i]);

		firstRing.push([sign2 * -180, crossLat2]);
		firstRing.push([sign1 * -180, crossLat1]);

		const secondRing: Ring = [];
		for (let i = idx2 + 1; i < ring.length; i++) secondRing.push(ring[i]);

		for (let i = 0; i <= idx1; i++) secondRing.push(ring[i]);

		secondRing.push([sign1 * 180, crossLat1]);
		secondRing.push([sign2 * 180, crossLat2]);

		return [firstRing, secondRing];
	}

	return [ring];
};

const splitPolygonAtAntimeridian = (rings: Ring[]): Ring[][] => {
	if (rings.length === 0) return [];

	const outerRings = splitRingAtAntimeridian(rings[0]);

	if (outerRings.length === 1) return [rings];

	const result: Ring[][] = [];

	outerRings.forEach((outerRing) => {
		const polygon: Ring[] = [outerRing];

		for (let i = 1; i < rings.length; i++) {
			const holeRings = splitRingAtAntimeridian(rings[i]);
			polygon.push(...holeRings);
		}

		result.push(polygon);
	});

	return result;
};

export { splitPolygonAtAntimeridian, splitRingAtAntimeridian };
