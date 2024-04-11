import js from '@eslint/js'
import { createDefu } from 'defu'
import type { Linter } from 'eslint'
import globals from 'globals'

import { DEFAULT_GLOB_SRC, DEFAULT_IGNORE_FILES, GLOB_EXCLUDE } from './consts'

type MaybeArray<T> = T | T[]
type Awaitable<T> = T | Promise<T>

export async function interopDefault<T>(
	m: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
	const resolved = await m
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
	return (resolved as any).default || resolved
}

export interface ConfigOptions {
	files?: string[]
	ignores?: string[]
	ignoreFiles?: string[]
}

type ConfigOptionsWithFlatConfig = ConfigOptions &
	Pick<
		Linter.FlatConfig,
		'rules' | 'languageOptions' | 'linterOptions' | 'settings'
	>

const severities = new Set([0, 1, 2, 'off', 'warn', 'error'])

export const defu = createDefu((obj, key, value) => {
	if (
		Array.isArray(value) &&
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		severities.has(value[0]) &&
		Array.isArray(obj[key]) &&
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		severities.has(obj[key][0])
	) {
		// @ts-expect-error It's fine here
		obj[key] = [...value]
		return true
	}
})

function create(
	config: Linter.FlatConfig,
	options: Required<ConfigOptions>,
): Linter.FlatConfig {
	const { files } = options
	return defu<Linter.FlatConfig, Linter.FlatConfig[]>(
		config,
		config.files ? {} : { files },
	)
}

type CreateFlatConfig = () => MaybeArray<Linter.FlatConfig> | undefined
type AsyncCreateFlatConfig = () => Promise<
	MaybeArray<Linter.FlatConfig> | undefined
>

export async function config(
	options: ConfigOptionsWithFlatConfig,
	...configs: Array<
		| undefined
		| null
		| false
		| MaybeArray<Linter.FlatConfig>
		| CreateFlatConfig
		| AsyncCreateFlatConfig
	>
): Promise<Linter.FlatConfig[]> {
	const finalOptions = defu(options, {
		ignores: GLOB_EXCLUDE,
		ignoreFiles: DEFAULT_IGNORE_FILES,
		files: [DEFAULT_GLOB_SRC],
	})
	const { ignores, ignoreFiles, files: _files, ...rest } = finalOptions

	const gitignore = await interopDefault(import('eslint-config-flat-gitignore'))

	const globalIgnores = defu(
		{
			ignores,
		},
		gitignore({
			files: ignoreFiles,
			strict: false,
		}),
	)

	return [
		globalIgnores,
		defu<Linter.FlatConfig, Linter.FlatConfig[]>(rest as Linter.FlatConfig, {
			name: 'js/recommended',
			files: finalOptions.files,
			languageOptions: {
				ecmaVersion: 2022,
				globals: {
					...globals.browser,
					...globals.es2021,
					...globals.node,
					document: 'readonly',
					navigator: 'readonly',
					window: 'readonly',
				},
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
					ecmaVersion: 2022,
					sourceType: 'module',
				},
				sourceType: 'module',
			},
			linterOptions: {
				reportUnusedDisableDirectives: true,
			},
			rules: js.configs.recommended.rules,
		}),
		...(
			await Promise.all(
				configs.map(async (c) => {
					if (typeof c === 'function') {
						const resolved = await c()

						if (!resolved) {
							return
						}
						return mergeConfigs(resolved, finalOptions)
					}

					if (!c) {
						return
					}
					return mergeConfigs(c, finalOptions)
				}),
			)
		).filter(Boolean),
	]
}

function mergeConfigs(
	c: MaybeArray<Linter.FlatConfig>,
	finalOptions: Required<ConfigOptions>,
): Linter.FlatConfig {
	if (Array.isArray(c)) {
		return create(defu({}, ...c.reverse()), finalOptions)
	}
	return create(c, finalOptions)
}
