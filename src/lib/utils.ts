/*oxlint-disable no-magic-numbers */
import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Vector3 } from 'three';

const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

const convertToSphereCoords = (lon: number, lat: number, radius: number) => {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lon + 180) * (Math.PI / 180);

	// oxlint-disable-next-line id-length
	const x = radius * Math.sin(phi) * Math.sin(theta);
	// oxlint-disable-next-line id-length
	const y = radius * Math.cos(phi);
	// oxlint-disable-next-line id-length
	const z = radius * Math.sin(phi) * Math.cos(theta);

	return new Vector3(x, y, z);
};

export { cn, convertToSphereCoords };
