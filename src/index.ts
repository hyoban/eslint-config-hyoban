/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import '../eslint-typegen.d.ts'

import process from 'node:process'

import type { Linter } from 'eslint'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'

import { reactConfigs } from './configs/react'
import { typeScriptConfigs } from './configs/typescript.js'
import unicornConfig from './configs/unicorn'
import type { ConfigOptions } from './utils'
import { config } from './utils'

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
		...typeScriptConfigs(finalOptions),
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
		...args,
	)
}
