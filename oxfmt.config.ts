import { defineConfig } from 'oxfmt';

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
	arrowParens: 'always',
	bracketSameLine: true,
	bracketSpacing: true,
	endOfLine: 'lf',
	ignorePatterns: [
		'.agents',
		'.husky',
		'.idea',
		'.output',
		'node_modules',
		'.tanstack',
		'.git',
		'.github',
		'*.md',
		'*.yaml',
		'*.yml',
		'*.json',
		'*.lock,',
		'pnpm-lock.yaml',
		'*.gen.ts',
	],
	printWidth: 100,
	semi: true,
	singleQuote: true,
	sortImports: {
		groups: [
			'type-import',
			['value-builtin', 'value-external'],
			'type-internal',
			'value-internal',
			['type-parent', 'type-sibling', 'type-index'],
			['value-parent', 'value-sibling', 'value-index'],
			'unknown',
		],
	},
	sortPackageJson: {
		sortScripts: true,
	},
	sortTailwindcss: {
		functions: ['clsx', 'cn'],
		preserveWhitespace: true,
		stylesheet: 'src/styles.css',
	},
	tabWidth: 2,
	trailingComma: 'es5',
	useTabs: true,
});
