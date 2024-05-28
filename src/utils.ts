import js from '@eslint/js'
import { createDefu } from 'defu'
import type { Linter } from 'eslint'
import globals from 'globals'

import { GLOB_SRC } from './consts'
import type { Options } from './option'

type MaybeArray<T> = T | T[]
type Awaitable<T> = T | Promise<T>

export async function interopDefault<T>(
  m: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  return (resolved as any).default || resolved
}

const severities = new Set([0, 1, 2, 'off', 'warn', 'error'])

export const defu = createDefu((obj, key, value) => {
  if (
    Array.isArray(value)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    && severities.has(value[0])
    && Array.isArray(obj[key])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    && severities.has(obj[key][0])
  ) {
    // @ts-expect-error It's fine here
    obj[key] = [...value]
    return true
  }

  // use set to merge arrays
  if (Array.isArray(value) && Array.isArray(obj[key])) {
    // @ts-expect-error It's fine here
    obj[key] = [...new Set([...obj[key], ...value].sort())]
    return true
  }
})

type CreateFlatConfig = () => Awaitable<MaybeArray<Linter.FlatConfig> | undefined>

export type ConfigArray = Array<
  | undefined
  | null
  | false
  | MaybeArray<Awaitable<Linter.FlatConfig | undefined>>
  | CreateFlatConfig
>

export async function config(
  options: Required<Options>,
  ...configs: ConfigArray
): Promise<Linter.FlatConfig[]> {
  /// keep-sorted
  const { ignoreFiles, ignores, linterOptions, settings, strict } = options

  const gitignore = await interopDefault(import('eslint-config-flat-gitignore'))
  const globalIgnores = defu(
    {
      ignores,
    },
    gitignore(
      {
        files: ignoreFiles,
        strict: false,
      },
    ),
  )

  return [
    globalIgnores,
    /// keep-sorted
    {
      files: GLOB_SRC,
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
      linterOptions,
      name: strict ? '@eslint/js/all' : '@eslint/js/recommended',
      rules: strict ? js.configs.all.rules : js.configs.recommended.rules,
      settings,
    },
    ...(
      await Promise.all(
        configs.map(async (c) => {
          if (typeof c === 'function') {
            const resolved = await c()

            if (!resolved)
              return

            return mergeConfigs(resolved)
          }

          if (!c)
            return

          return mergeConfigs(c)
        }),
      )
    ).filter(Boolean),
  ]
}

async function mergeConfigs(
  _c: MaybeArray<Awaitable<Linter.FlatConfig | undefined>>,
): Promise<Linter.FlatConfig | undefined> {
  const c = await _c

  if (!c)
    return

  if (Array.isArray(c))
    return withFiles(defu({}, ...c.reverse()))

  return withFiles(c)
}

function withFiles(
  config: Linter.FlatConfig,
): Linter.FlatConfig {
  return defu<Linter.FlatConfig, Linter.FlatConfig[]>(
    config,
    'files' in config ? {} : { files: GLOB_SRC },
  )
}
