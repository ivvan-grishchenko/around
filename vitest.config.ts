import { defineConfig } from 'vitest/config';

const excludeFromCoverageFiles = [
	'src/routeTree.gen.ts',
	'src/styles.css',
	'src/start.ts',
	'src/router.tsx',
	'src/utils/vitest-setup.ts',
	'src/utils/clerk-setup.tsx',
	'src/utils/router-utils.tsx',
	'src/routes/__root.tsx',
];

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		coverage: {
			enabled: true,
			exclude: excludeFromCoverageFiles,
			include: ['src/**/*.ts', 'src/**/*.tsx'],
			thresholds: {
				branches: 80,
				functions: 80,
				lines: 80,
				statements: 80,
			},
		},
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/utils/vitest-setup.ts', './src/utils/clerk-setup.tsx'],
		typecheck: { enabled: true },
	},
});
