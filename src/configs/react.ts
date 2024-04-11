/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Linter } from 'eslint'

import type { Options } from '..'
import { DEFAULT_GLOB_TS_SRC } from '../consts'
import { interopDefault } from '../utils'

export function reactConfigs({
	react,
	strict,
	typeChecked,
	filesDisableTypeChecking,
}: Required<Options>) {
	if (!react) {
		return []
	}
	return [
		async () => {
			const eslintReact = await interopDefault(
				import('@eslint-react/eslint-plugin'),
			)
			const config = strict
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
				files: DEFAULT_GLOB_TS_SRC,
				plugins: config.plugins,
				rules: config.rules,
			} as Linter.FlatConfig
		},
		() => {
			if (!typeChecked) {
				return
			}

			return {
				name: 'react/type-checked',
				files: DEFAULT_GLOB_TS_SRC,
				ignores:
					filesDisableTypeChecking.length > 0
						? filesDisableTypeChecking
						: undefined,
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
				files: DEFAULT_GLOB_TS_SRC,
				plugins: {
					'react-hooks': reactHooks,
				},
				rules: reactHooks.configs.recommended.rules,
			} as Linter.FlatConfig
		},
	]
}
