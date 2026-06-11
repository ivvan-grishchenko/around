import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import type { GeoJsonData } from './GlobeConstants';

import {
	AMBIENT_LIGHT_INTENSITY,
	CAMERA_CONFIG,
	DIRECTIONAL_LIGHT_COLOR,
	DIRECTIONAL_LIGHT_INTENSITY,
	DIRECTIONAL_LIGHT_POSITION,
	GLOBE_RADIUS,
	ORBIT_MAX_DISTANCE,
	ORBIT_MIN_DISTANCE,
	POINT_LIGHT_COLOR,
	POINT_LIGHT_INTENSITY,
	POINT_LIGHT_POSITION,
} from './GlobeConstants';
import { GlobeSceneClient } from './GlobeScene.client';

interface InteractiveGlobeClientProps {
	geoData: GeoJsonData;
}

const InteractiveGlobeClient = ({ geoData }: InteractiveGlobeClientProps) => (
	<Canvas camera={CAMERA_CONFIG}>
		<ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
		<pointLight
			position={POINT_LIGHT_POSITION}
			intensity={POINT_LIGHT_INTENSITY}
			color={POINT_LIGHT_COLOR}
		/>
		<directionalLight
			position={DIRECTIONAL_LIGHT_POSITION}
			intensity={DIRECTIONAL_LIGHT_INTENSITY}
			color={DIRECTIONAL_LIGHT_COLOR}
		/>
		<GlobeSceneClient radius={GLOBE_RADIUS} data={geoData} />
		<OrbitControls
			enableZoom
			enablePan={false}
			minDistance={ORBIT_MIN_DISTANCE}
			maxDistance={ORBIT_MAX_DISTANCE}
			makeDefault
		/>
	</Canvas>
);

export { InteractiveGlobeClient };
