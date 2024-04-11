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

			return {
				name: `react/${strict ? 'all' : 'recommended'}`,
				files: DEFAULT_GLOB_TS_SRC,
				plugins: config.plugins,
				rules: config.rules,
			} as Linter.FlatConfig
		},
		() => {
			if (strict) {
				return {
					name: 'react/all/custom',
					files: DEFAULT_GLOB_TS_SRC,
					rules: {
						'@eslint-react/naming-convention/filename': 'off',
						'@eslint-react/naming-convention/use-state': 'off',
						'@eslint-react/hooks-extra/ensure-use-memo-has-non-empty-deps':
							'off',
						'@eslint-react/hooks-extra/ensure-use-callback-has-non-empty-deps':
							'off',
					},
				} satisfies Linter.FlatConfig
			}
			return {
				name: 'react/recommended/custom',
				files: DEFAULT_GLOB_TS_SRC,
				rules: {
					'@eslint-react/hooks-extra/ensure-custom-hooks-using-other-hooks':
						'error',
				},
			} satisfies Linter.FlatConfig
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
			} satisfies Linter.FlatConfig
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
