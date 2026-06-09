import { defineConfig } from 'oxlint';

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
	categories: {
		correctness: 'error', // Catch bugs and broken code immediately
		perf: 'error', // Performance optimization rules
		style: 'error', // Stylistic/readability warnings
	},
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
		'import',
		'oxc',
		'promise',
		'vitest',
		'react',
		'react-perf',
		'typescript',
		'unicorn',
		'eslint',
	],
	rules: {
		'class-methods-use-this': 'off',
		curly: ['error', 'multi'],
		'func-style': ['error', 'expression'],
		'import/consistent-type-specifier-style': 'off',
		'import/no-named-export': 'off',
		'import/prefer-default-export': 'off',
		'jsx-max-depth': ['error', { max: 10 }],
		'max-statements': ['error', { max: 15 }],
		'no-console': 'error',
		'no-continue': 'off',
		'no-debugger': 'error',
		'no-duplicate-imports': 'off',
		'no-duplicates': 'error',
		'no-magic-numbers': [
			'error',
			{ ignore: [0, 1], ignoreArrayIndexes: true, ignoreTypeIndexes: true },
		],
		'no-ternary': 'off',
		'react-perf/jsx-no-jsx-as-prop': 'off',
		'react-perf/jsx-no-new-function-as-prop': 'off',
		'react/jsx-pascal-case': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/no-array-index-key': 'off',
		'react/no-children-prop': 'off',
		'sort-imports': [
			'error',
			{
				ignoreDeclarationSort: true,
				ignoreMemberSort: false,
			},
		],
		'typescript/consistent-type-imports': [
			'error',
			{ disallowTypeAnnotations: false, fixStyle: 'separate-type-imports' },
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
