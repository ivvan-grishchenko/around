import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import rsc from '@vitejs/plugin-rsc';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

const config = defineConfig(({ command }) => ({
	plugins: [
		devtools(),
		tailwindcss(),
		...(command === 'build' ? [nitro({ rollupConfig: { external: [/^@sentry\//] } })] : []),
		tanstackStart({
			importProtection: {
				behavior: { build: 'error', dev: 'error' },
				client: {
					files: ['**/*.server.*', '**/config/**'],
					specifiers: ['@prisma/client', 'better-auth', 'pg'],
				},
				exclude: ['src/generated/**'],
				include: ['src/**'],
				server: {
					files: ['**/*.client.*'],
					specifiers: ['better-auth/react', '@react-three/fiber', '@react-three/drei'],
				},
			},
			router: { routeFileIgnorePattern: '.((test).tsx)' },
			rsc: { enabled: true },
		}),
		rsc(),
		babel({ presets: [reactCompilerPreset()] }),
		viteReact(),
	],
	resolve: { tsconfigPaths: true },
	server: {
		port: 3000,
	},
	ssr: {
		external: ['pg', 'pg-native'],
	},
}));

export default config;
