import '../eslint-typegen.d.ts'

import type {
  Awaitable,
  ConfigNames,
  OptionsConfig,
  OptionsFiles,
  OptionsOverrides,
  RuleOptions,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import antfu, { GLOB_MARKDOWN, GLOB_MARKDOWN_IN_MARKDOWN } from '@antfu/eslint-config'
import markdown from '@eslint/markdown'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import md from 'eslint-markdown'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import { tailwindcss } from './configs/tailwindcss'
import { mergeOptions } from './merge-options'
import type { OptionsTailwindcss } from './types.js'

export type OptionsAddons = {
  tailwindcss?: boolean | (OptionsOverrides & OptionsFiles & OptionsTailwindcss)
}

export type Options = OptionsConfig & Omit<TypedFlatConfigItem, 'files' | 'ignores'> & OptionsAddons

const GLOB_MARKDOWNS = [
  GLOB_MARKDOWN,
  GLOB_MARKDOWN_IN_MARKDOWN,
]

export function defineConfig(
  options?: Options,
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const config = antfu(
    mergeOptions(options),
    ...userConfigs,
  )
    .overrides({
      'antfu/javascript/rules': {
        ignores: GLOB_MARKDOWNS,
      },
      'antfu/command/rules': {
        ignores: GLOB_MARKDOWNS,
      },
      'antfu/stylistic/rules': {
        ignores: GLOB_MARKDOWNS,
      },
      'antfu/regexp/rules': {
        ignores: GLOB_MARKDOWNS,
      },
      'antfu/jsdoc/rules': {
        ignores: GLOB_MARKDOWNS,
      },
    })
    .insertBefore(
      'antfu/perfectionist/setup',
      {
        name: 'hyoban/imports/simple-import-sort',
        plugins: {
          'import-sort': simpleImportSort,
        },
        rules: {
          'import-sort/imports': 'error',
          'import-sort/exports': 'error',
        } as Partial<RuleOptions>,
      },
    )
    .insertAfter(
      'antfu/markdown/setup',
      {
        name: 'hyoban/md/setup',
        plugins: {
          md,
        },
      },
    )
    .insertAfter(
      'antfu/markdown/disables',
      {
        name: 'hyoban/md/rules',
        files: GLOB_MARKDOWNS,
        rules: {
          ...markdown.configs.recommended.at(0)?.rules,
          ...md.configs.recommended.rules,
          ...md.configs.stylistic.rules,
          'md/code-lang-shorthand': 'error',
          'md/consistent-delete-style': ['error', { style: '~~' }],
          'md/consistent-emphasis-style': ['error', { style: '_' }],
          'md/consistent-strong-style': ['error', { style: '*' }],
          'md/consistent-thematic-break-style': ['error', { style: '---' }],
          'md/no-url-trailing-slash': 'error',

          // > [!TIP]
          // >
          'markdown/no-missing-label-refs': 'off',
        } as Partial<RuleOptions>,
      },
    )
    .insertBefore(
      'antfu/markdown/parser',
      {
        name: 'hyoban/markdown/language',
        files: GLOB_MARKDOWNS,
        language: 'markdown/gfm',
      },
    )
    .remove('antfu/perfectionist/setup')
    .remove('antfu/markdown/parser')
    .renamePlugins({
      'simple-import-sort': 'import-sort',
      'better-tailwindcss': 'tailwindcss',
    })

  if (options?.tailwindcss) {
    config.append(tailwindcss(typeof options.tailwindcss === 'boolean' ? {} : options.tailwindcss))
  }

  return config
}

export * from '@antfu/eslint-config'
