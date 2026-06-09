/* oxlint-disable no-magic-numbers, max-statements, id-length */
import type { ThreeEvent } from '@react-three/fiber';

import { useDebounce } from '@hooks/use-debounce';
import { useTailwindColor } from '@hooks/use-tailwind-color';
import { convertToSphereCoords } from '@lib/utils';
import { animated, useSpring } from '@react-spring/three';
import { useMemo, useState } from 'react';
import {
	BufferGeometry,
	DoubleSide,
	Float32BufferAttribute,
	Path,
	Shape,
	ShapeGeometry,
	Vector2,
} from 'three';

import type { GeoJsonFeature } from './GlobeConstants';

import { splitPolygonAtAntimeridian, splitRingAtAntimeridian } from './Antimeridian';
import { COMPONENTS_PER_VERTEX } from './GlobeConstants';

interface CountryProps {
	feature: GeoJsonFeature;
	radius: number;
}

const SPRING_CONFIG = {
	friction: 12, // Lower friction = more bouncy effect
	mass: 1,
	tension: 300,
};

const toVector2Points = (ring: [number, number][]): Vector2[] =>
	ring.map(([lon, lat]) => new Vector2(lon, lat));

const projectGeometryToSphere = (geometry: BufferGeometry, radius: number): void => {
	const position = geometry.getAttribute('position');

	const projected = new Float32Array(position.count * COMPONENTS_PER_VERTEX);
	const indices: number[] = [];

	for (let nextIndex = 0; nextIndex < position.count; nextIndex++) indices.push(nextIndex);

	indices.forEach((index) => {
		const point = convertToSphereCoords(position.getX(index), position.getY(index), radius);
		projected.set([point.x, point.y, point.z], index * COMPONENTS_PER_VERTEX);
	});

	geometry.setAttribute('position', new Float32BufferAttribute(projected, COMPONENTS_PER_VERTEX));
	geometry.computeVertexNormals();
};

const subdivideOnSphere = (geometry: BufferGeometry, radius: number, levels: number): void => {
	for (let level = 0; level < levels; level++) {
		const pos = geometry.getAttribute('position');
		const idx = geometry.index;
		if (!idx) continue;

		const newPositions: number[] = [];
		const newIndices: number[] = [];
		const midpointCache = new Map<string, number>();

		for (let i = 0; i < pos.count; i++) newPositions.push(pos.getX(i), pos.getY(i), pos.getZ(i));

		const getMidpointOnSphere = (i1: number, i2: number): number => {
			const key = `${Math.min(i1, i2)}_${Math.max(i1, i2)}`;
			if (midpointCache.has(key)) return midpointCache.get(key)!;

			const mx = (newPositions[i1 * 3] + newPositions[i2 * 3]) / 2;
			const my = (newPositions[i1 * 3 + 1] + newPositions[i2 * 3 + 1]) / 2;
			const mz = (newPositions[i1 * 3 + 2] + newPositions[i2 * 3 + 2]) / 2;

			const len = Math.sqrt(mx * mx + my * my + mz * mz);
			const scale = radius / len;

			const newIdx = newPositions.length / 3;
			newPositions.push(mx * scale, my * scale, mz * scale);
			midpointCache.set(key, newIdx);
			return newIdx;
		};

		for (let i = 0; i < idx.count; i += 3) {
			const a = idx.getX(i);
			const b = idx.getX(i + 1);
			const c = idx.getX(i + 2);
			const ab = getMidpointOnSphere(a, b);
			const bc = getMidpointOnSphere(b, c);
			const ca = getMidpointOnSphere(c, a);
			newIndices.push(a, ab, ca, b, bc, ab, c, ca, bc, ab, bc, ca);
		}

		geometry.setAttribute('position', new Float32BufferAttribute(newPositions, 3));
		geometry.setIndex(newIndices);
	}
	geometry.computeVertexNormals();
};

const buildPolygonFill = (rings: [number, number][][], radius: number): BufferGeometry[] => {
	if (rings.length === 0) return [];

	const splitPolygons = splitPolygonAtAntimeridian(rings);
	const geometries: BufferGeometry[] = [];

	splitPolygons.forEach((splitRings) => {
		if (splitRings.length === 0) return;

		const shape = new Shape(toVector2Points(splitRings[0]));

		splitRings.slice(1).forEach((ring) => shape.holes.push(new Path(toVector2Points(ring))));

		const geometry = new ShapeGeometry(shape);
		projectGeometryToSphere(geometry, radius);
		subdivideOnSphere(geometry, radius, 2);

		geometries.push(geometry);
	});

	return geometries;
};

const buildPolygonOutline = (rings: [number, number][][], radius: number): BufferGeometry[] => {
	const lines: BufferGeometry[] = [];

	rings.forEach((ring) => {
		if (ring.length < 2) return;

		const splitRings = splitRingAtAntimeridian(ring);

		splitRings.forEach((splitRing) => {
			const points = splitRing.map(([lon, lat]) => convertToSphereCoords(lon, lat, radius));
			lines.push(new BufferGeometry().setFromPoints(points));
		});
	});

	return lines;
};

const Country = ({ feature, radius }: CountryProps) => {
	const [hovered, setHovered] = useState(false);
	const debouncedHover = useDebounce(hovered, 150);

	const backgroundColor = useTailwindColor('background');
	const chartColor = useTailwindColor('chart-1');
	const ringColor = useTailwindColor('ring');
	const mutedForegroundColor = useTailwindColor('muted-foreground');

	const { fillGeometries, outlineGeometries } = useMemo(() => {
		const { geometry } = feature;
		const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;

		const fills: BufferGeometry[] = [];
		const outlines: BufferGeometry[] = [];

		polygons.forEach((polygon) => {
			const polygonFills = buildPolygonFill(polygon, radius);
			fills.push(...polygonFills);
			outlines.push(...buildPolygonOutline(polygon, radius));
		});

		return { fillGeometries: fills, outlineGeometries: outlines };
	}, [feature.geometry, radius]);

	const { springScale } = useSpring({
		config: SPRING_CONFIG,
		springScale: debouncedHover ? 1.06 : 1,
	});

	const meshColor = debouncedHover ? chartColor : backgroundColor;
	const lineColor = debouncedHover ? mutedForegroundColor : ringColor;

	const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
		event.stopPropagation();
		if (hovered) return;

		setHovered(true);
	};

	const handlePointerOut = () => {
		if (!hovered) return;

		setHovered(false);
	};

	return (
		<animated.group
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
			scale={springScale}>
			{fillGeometries.map((geo, index) => (
				<mesh key={`fill-${index}`} geometry={geo} renderOrder={debouncedHover ? 2 : 1}>
					<meshBasicMaterial
						side={DoubleSide}
						color={meshColor}
						transparent
						opacity={debouncedHover ? 1 : 0.6}
						depthWrite={false}
					/>
				</mesh>
			))}
			{outlineGeometries.map((geo, index) => (
				<lineLoop key={`outline-${index}`} geometry={geo} raycast={() => null}>
					<lineBasicMaterial color={lineColor} />
				</lineLoop>
			))}
		</animated.group>
	);
};

export { Country };
