import type { Linter } from 'eslint'
import tseslint from 'typescript-eslint'

import type { Options } from '..'
import { DEFAULT_GLOB_TS_SRC } from '../consts'

export function typeScriptConfigs({
	strict,
	typeChecked,
	project,
	tsconfigRootDir,
	filesDisableTypeChecking,
}: Required<Options>) {
	const typescriptPreset = strict
		? typeChecked === true
			? tseslint.configs.strictTypeChecked
			: tseslint.configs.strict
		: typeChecked === true
			? tseslint.configs.recommendedTypeChecked
			: tseslint.configs.recommended
	return [
		[...tseslint.configs.stylistic, ...typescriptPreset] as Linter.FlatConfig[],
		[
			{
				name: 'typescript-eslint/custom',
				files: DEFAULT_GLOB_TS_SRC,
			},
			{
				rules: {
					'@typescript-eslint/array-type': [
						'error',
						{ default: 'array-simple' },
					],
				},
			},
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
		() => {
			if (filesDisableTypeChecking.length === 0) {
				return
			}
			return {
				files: filesDisableTypeChecking,
				...tseslint.configs.disableTypeChecked,
			} as Linter.FlatConfig
		},
	]
}
