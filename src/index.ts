/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import '../eslint-typegen.d.ts'

import process from 'node:process'

import type { Linter } from 'eslint'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'
import tseslint from 'typescript-eslint'

import { reactConfigs } from './configs/react'
import unicornConfig from './configs/unicorn'
import { config } from './utils'
import type { ConfigOptions } from './utils'

export interface Options {
	react?: boolean
	strict?: boolean
	typeChecked?: boolean | 'essential'
	project?: string[] | string | boolean | null
	tsconfigRootDir?: string
	filesDisableTypeChecking?: string[]
}

function mergeDefaultOptions(
	options?: Options & Pick<ConfigOptions, 'ignores' | 'ignoreFiles'>,
): Required<Options> {
	return {
		react: false,
		strict: false,
		typeChecked: 'essential',
		project: true,
		tsconfigRootDir: process.cwd(),
		filesDisableTypeChecking: [],
		...options,
	}
}

export default async function hyoban(
	options?: Options & Pick<ConfigOptions, 'ignores' | 'ignoreFiles'>,
	...args: Array<
		| Linter.FlatConfig
		| (() => Linter.FlatConfig)
		| (() => Promise<Linter.FlatConfig>)
	>
) {
	const finalOptions = mergeDefaultOptions(options)
	const {
		strict,
		typeChecked,
		project,
		tsconfigRootDir,
		filesDisableTypeChecking,
	} = finalOptions

	const typescriptPreset = strict
		? typeChecked === true
			? tseslint.configs.strictTypeChecked
			: tseslint.configs.strict
		: typeChecked === true
			? tseslint.configs.recommendedTypeChecked
			: tseslint.configs.recommended

	return config(
		{
			ignores: options?.ignores,
			ignoreFiles: options?.ignoreFiles,
			rules: {
				// https://twitter.com/karlhorky/status/1773632485055680875
				'array-callback-return': 'error',
				'no-console': ['error', { allow: ['warn', 'error'] }],
				// https://youtu.be/XTXPKbPcvl4?si=J_2E9dM25sAEXM2x
				'no-restricted-syntax': [
					'error',
					{
						selector: 'TSEnumDeclaration',
						message: 'We should not use Enum',
					},
				],
			},
		},
		unicornConfig(),
		[
			...typescriptPreset,
			typeChecked
				? {
						languageOptions: {
							parserOptions: {
								project,
								tsconfigRootDir,
							},
						},
					}
				: {},
			{
				rules: {
					'no-unused-vars': 'off',
					'@typescript-eslint/no-unused-vars': [
						'error',
						{
							args: 'all',
							argsIgnorePattern: '^_',
							caughtErrors: 'all',
							caughtErrorsIgnorePattern: '^_',
							destructuredArrayIgnorePattern: '^_',
							varsIgnorePattern: '^_',
							ignoreRestSiblings: true,
						},
					],

					'@typescript-eslint/consistent-type-imports': 'error',
					'@typescript-eslint/no-import-type-side-effects': 'error',

					// https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
					'@typescript-eslint/method-signature-style': ['error', 'property'],
				},
			},
			strict
				? {
						rules: {
							'@typescript-eslint/no-non-null-assertion': 'off',
						},
					}
				: {},
			typeChecked
				? typeChecked === 'essential'
					? {
							rules: {
								// https://youtu.be/OVNQWzdhCQA?si=PvPOOgtGW5H4uRB7
								'@typescript-eslint/await-thenable': 'error',
								'@typescript-eslint/no-floating-promises': 'error',
								'@typescript-eslint/no-misused-promises': [
									'error',
									{ checksVoidReturn: { arguments: false, attributes: false } },
								],
							},
						}
					: {
							rules: {
								'@typescript-eslint/consistent-type-exports': 'error',
								'@typescript-eslint/no-misused-promises': [
									'error',
									{ checksVoidReturn: { arguments: false, attributes: false } },
								],
							},
						}
				: {},
		] as Linter.FlatConfig[],
		[
			...(tseslint.configs.stylistic as any),
			{
				rules: {
					'@typescript-eslint/array-type': [
						'error',
						{ default: 'array-simple' },
					],
				},
			},
		],
		{
			name: 'stylistic/extra',
			plugins: {
				antfu: eslintPluginAntfu,
				hyoban: pluginHyoban as any,
			},
			rules: {
				'object-shorthand': 'warn',
				'prefer-template': 'warn',
				'prefer-destructuring': [
					'warn',
					{
						array: false,
						object: true,
					},
				],
				'antfu/top-level-function': 'warn',
				'hyoban/prefer-early-return': 'warn',
			},
		},
		...reactConfigs(finalOptions),
		() => {
			if (filesDisableTypeChecking.length === 0) {
				return
			}
			return {
				files: filesDisableTypeChecking,
				...tseslint.configs.disableTypeChecked,
			} as Linter.FlatConfig
		},
		...args,
	)
}
