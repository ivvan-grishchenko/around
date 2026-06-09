/* oxlint-disable no-magic-numbers */
const GLOBE_RADIUS = 2;
const GLOBE_INNER_RADIUS_FACTOR = 0.99;
const COUNTRY_SURFACE_LIFT = 0.01;
const GLOBE_GEOMETRY_SEGMENTS = 32;
const GLOBE_ROTATION_SPEED = 0.02;

const GRATICULE_LAT_STEP = 15;
const GRATICULE_LON_STEP = 15;

const CAMERA_POSITION_Z = 5.5;
const CAMERA_FIELD_OF_VIEW = 45;
const ORBIT_MIN_DISTANCE = 3.5;
const ORBIT_MAX_DISTANCE = 8;

const AMBIENT_LIGHT_INTENSITY = 0.5;
const POINT_LIGHT_INTENSITY = 1.5;
const POINT_LIGHT_COLOR = '#818cf8';
const POINT_LIGHT_POSITION: [number, number, number] = [10, 10, 10];
const DIRECTIONAL_LIGHT_INTENSITY = 0.5;
const DIRECTIONAL_LIGHT_COLOR = '#38bdf8';
const DIRECTIONAL_LIGHT_POSITION: [number, number, number] = [-10, 5, -5];

const COMPONENTS_PER_VERTEX = 3;

const GEOJSON_URL =
	'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';

const CAMERA_CONFIG = {
	fov: CAMERA_FIELD_OF_VIEW,
	position: [0, 0, CAMERA_POSITION_Z] as [number, number, number],
};

type GeoJsonGeometry =
	| {
			type: 'Polygon';
			coordinates: [number, number][][];
	  }
	| {
			type: 'MultiPolygon';
			coordinates: [number, number][][][];
	  };
interface GeoJsonFeature {
	id: string;
	properties: { name: string };
	geometry: GeoJsonGeometry;
}

interface GeoJsonData {
	features: GeoJsonFeature[];
}

export {
	AMBIENT_LIGHT_INTENSITY,
	CAMERA_CONFIG,
	CAMERA_FIELD_OF_VIEW,
	CAMERA_POSITION_Z,
	COMPONENTS_PER_VERTEX,
	COUNTRY_SURFACE_LIFT,
	DIRECTIONAL_LIGHT_COLOR,
	DIRECTIONAL_LIGHT_INTENSITY,
	DIRECTIONAL_LIGHT_POSITION,
	GEOJSON_URL,
	GLOBE_GEOMETRY_SEGMENTS,
	GLOBE_INNER_RADIUS_FACTOR,
	GLOBE_RADIUS,
	GLOBE_ROTATION_SPEED,
	GRATICULE_LAT_STEP,
	GRATICULE_LON_STEP,
	ORBIT_MAX_DISTANCE,
	ORBIT_MIN_DISTANCE,
	POINT_LIGHT_COLOR,
	POINT_LIGHT_INTENSITY,
	POINT_LIGHT_POSITION,
};

export type { GeoJsonData, GeoJsonFeature };
