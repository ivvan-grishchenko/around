import type { Group } from 'three';

import { Country } from '@components/globe/Country.client';
import { useTailwindColor } from '@hooks/use-tailwind-color';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Color } from 'three';

import type { GeoJsonData } from './GlobeConstants';

import {
	COUNTRY_SURFACE_LIFT,
	GLOBE_GEOMETRY_SEGMENTS,
	GLOBE_INNER_RADIUS_FACTOR,
	GLOBE_ROTATION_SPEED,
} from './GlobeConstants';
import { Graticule } from './Graticule.client';

interface GlobeSceneProps {
	radius: number;
	data: GeoJsonData;
}

const GlobeSceneClient = ({ radius, data }: GlobeSceneProps) => {
	const globeGroupRef = useRef<Group>(null);

	const backgroundColor = useTailwindColor('background');

	const sphereArgs: [number, number, number] = useMemo(
		() => [radius * GLOBE_INNER_RADIUS_FACTOR, GLOBE_GEOMETRY_SEGMENTS, GLOBE_GEOMETRY_SEGMENTS],
		[radius]
	);

	const countryRadius = radius * GLOBE_INNER_RADIUS_FACTOR + COUNTRY_SURFACE_LIFT;

	useFrame((state) => {
		if (!globeGroupRef.current) return;
		// oxlint-disable-next-line id-length
		globeGroupRef.current.rotation.y = state.clock.getElapsedTime() * GLOBE_ROTATION_SPEED;
	});

	return (
		<group ref={globeGroupRef}>
			<mesh>
				<sphereGeometry args={sphereArgs} />
				<meshBasicMaterial color={new Color(backgroundColor)} />
			</mesh>

			<Graticule radius={radius} />

			{data.features.map((feature) => (
				<Country
					key={`${feature.id}-${feature.properties.name}`}
					feature={feature}
					radius={countryRadius}
				/>
			))}
		</group>
	);
};

export { GlobeSceneClient };
