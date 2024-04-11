/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Linter } from 'eslint'

import type { Options } from '..'
import { interopDefault } from '../utils'

const GLOB_TS = '**/*.?([cm])ts'
const GLOB_TSX = '**/*.?([cm])tsx'

export function reactConfigs({
	react,
	typescript,
}: {
	react: boolean
	typescript: Options['typescript']
}) {
	if (!react) {
		return []
	}
	return [
		async () => {
			const eslintReact = await interopDefault(
				import('@eslint-react/eslint-plugin'),
			)
			const config = typescript?.strict
				? eslintReact.configs.all
				: eslintReact.configs.recommended
			const { rules } = config

			const alwaysOffRules = [
				'@eslint-react/naming-convention/filename',
				'@eslint-react/naming-convention/use-state',
				'@eslint-react/hooks-extra/ensure-use-memo-has-non-empty-deps',
				'@eslint-react/hooks-extra/ensure-use-callback-has-non-empty-deps',
			]
			for (const rule of alwaysOffRules) {
				if (!rules[rule]) {
					continue
				}
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete rules[rule]
			}

			const alwaysOnRules = [
				'@eslint-react/hooks-extra/ensure-custom-hooks-using-other-hooks',
			]
			for (const rule of alwaysOnRules) {
				rules[rule] = 'error'
			}

			return {
				name: 'react/basic',
				files: [GLOB_TS, GLOB_TSX],
				plugins: config.plugins,
				rules: config.rules,
			} as Linter.FlatConfig
		},
		() => {
			if (!typescript?.typeChecked) {
				return
			}

			return {
				name: 'react/type-checked',
				files: [GLOB_TS, GLOB_TSX],
				ignores: typescript.filesDisableTypeChecking,
				rules: {
					'@eslint-react/no-leaked-conditional-rendering': 'error',
				},
			} as Linter.FlatConfig
		},
		async () => {
			const reactHooks = await interopDefault(
				import('eslint-plugin-react-hooks'),
			)
			return {
				name: 'react/hooks',
				files: [GLOB_TS, GLOB_TSX],
				plugins: {
					'react-hooks': reactHooks,
				},
				rules: reactHooks.configs.recommended.rules,
			} as Linter.FlatConfig
		},
	]
}
