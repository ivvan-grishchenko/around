/* oxlint-disable no-magic-numbers */
import { useTailwindColor } from '@hooks/use-tailwind-color';
import { convertToSphereCoords } from '@lib/utils';
import { useMemo } from 'react';
import { BufferGeometry, Color, Float32BufferAttribute } from 'three';

import { COMPONENTS_PER_VERTEX, GRATICULE_LAT_STEP, GRATICULE_LON_STEP } from './GlobeConstants';

interface GraticuleProps {
	radius: number;
}

const buildLatLineVertices = (lat: number, lonStep: number, radius: number): number[] => {
	const vertices: number[] = [];
	for (let lon = -180; lon < 180; lon += lonStep) {
		const p1 = convertToSphereCoords(lon, lat, radius);
		const p2 = convertToSphereCoords(lon + lonStep, lat, radius);
		vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
	}
	return vertices;
};

const buildLonLineVertices = (lon: number, latStep: number, radius: number): number[] => {
	const vertices: number[] = [];
	for (let lat = -90; lat < 90; lat += latStep) {
		const p1 = convertToSphereCoords(lon, lat, radius);
		const p2 = convertToSphereCoords(lon, lat + latStep, radius);
		vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
	}
	return vertices;
};

const Graticule = ({ radius }: GraticuleProps) => {
	const primaryColor = useTailwindColor('primary', '#005f78');
	const geometry = useMemo(() => {
		const latStep = GRATICULE_LAT_STEP;
		const lonStep = GRATICULE_LON_STEP;
		const vertices: number[] = [];

		for (let lat = -90 + latStep; lat < 90; lat += latStep)
			vertices.push(...buildLatLineVertices(lat, lonStep, radius));

		for (let lon = -180; lon < 180; lon += lonStep)
			vertices.push(...buildLonLineVertices(lon, latStep, radius));

		const geo = new BufferGeometry();
		geo.setAttribute('position', new Float32BufferAttribute(vertices, COMPONENTS_PER_VERTEX));
		return geo;
	}, [radius]);

	return (
		<lineSegments geometry={geometry} renderOrder={0}>
			<lineBasicMaterial
				color={new Color(primaryColor)}
				transparent
				opacity={0.4}
				depthWrite={false}
			/>
		</lineSegments>
	);
};

export { Graticule };
