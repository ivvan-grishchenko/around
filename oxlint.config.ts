import { defineConfig } from 'oxlint';

export default defineConfig({
	categories: {
		correctness: 'error', // Catch bugs and broken code immediately
		perf: 'error', // Performance optimization rules
		style: 'error', // Stylistic/readability warnings
	},

	env: {
		browser: true,
		node: true,
	},

	ignorePatterns: [
		'.agents',
		'.husky',
		'.idea',
		'node_modules',
		'dist',
		'.wrangler',
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

	options: {
		maxWarnings: 10,
		typeAware: true,
		typeCheck: true,
	},

	overrides: [
		{
			files: ['src/components/**/*.tsx', 'src/components/**/*.ts'],
			rules: {
				'unicorn/filename-case': ['error', { case: 'pascalCase' }],
			},
		},
	],

	plugins: [
		'eslint',
		'react',
		'unicorn',
		'typescript',
		'oxc',
		'import',
		'vitest',
		'react-perf',
		'promise',
		'node',
	],

	rules: {
		'class-methods-use-this': 'off',
		curly: ['error', 'multi'],
		'func-style': ['error', 'expression'],
		'import/consistent-type-specifier-style': 'off',
		'import/no-named-export': 'off',
		'import/prefer-default-export': 'off',
		'jsx-max-depth': ['error', { max: 5 }],
		'no-console': 'error',
		'no-debugger': 'error',
		'no-duplicate-imports': 'off',
		'no-duplicates': 'error',
		'no-magic-numbers': [
			'error',
			{ ignore: [1], ignoreArrayIndexes: true, ignoreTypeIndexes: true },
		],
		'no-ternary': 'off',
		'react/jsx-pascal-case': 'off',
		'sort-imports': [
			'error',
			{
				ignoreDeclarationSort: true,
				ignoreMemberSort: false,
			},
		],
		'typescript/consistent-type-imports': [
			'error',
			{ disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' },
		],
		'typescript/no-explicit-any': 'error',
		'unicorn/filename-case': ['error', { case: 'kebabCase' }],
		'unicorn/no-null': 'off',
		'unicorn/prefer-global-this': 'off',
		'vitest/max-expects': 'off',
		'vitest/no-hooks': 'off',
		'vitest/no-importing-vitest-globals': 'off',
		'vitest/prefer-expect-assertions': 'off',
		'vitest/prefer-import-in-mock': 'off',
		'vitest/prefer-importing-vitest-globals': 'error',
		'vitest/prefer-strict-boolean-matchers': 'off',
	},
});
