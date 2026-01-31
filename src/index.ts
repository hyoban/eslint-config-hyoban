import type { Awaitable, ConfigNames, OptionsConfig, Rules } from '@antfu/eslint-config'
import antfu, { GLOB_MARKDOWN, GLOB_MARKDOWN_IN_MARKDOWN } from '@antfu/eslint-config'
import markdown from '@eslint/markdown'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import md from 'eslint-markdown'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import type { RuleOptions } from '../eslint-typegen'
import { mergeOptions } from './merge-options'

type TypedFlatConfigItem = Omit<Linter.Config, 'plugins' | 'rules'> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>
  /**
   * An object containing the configured rules. When `files` or `ignores` are
   * specified, these rule configurations are only available to the matching files.
   */
  rules?: Rules & RuleOptions
}

export type Options = OptionsConfig & Omit<TypedFlatConfigItem, 'files' | 'ignores'>

const GLOB_MARKDOWNS = [
  GLOB_MARKDOWN,
  GLOB_MARKDOWN_IN_MARKDOWN,
]

export function defineConfig(
  options?: Options,
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  return antfu(
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
          'simple-import-sort': simpleImportSort,
        },
        rules: {
          'simple-import-sort/imports': 'error',
          'simple-import-sort/exports': 'error',
        },
      } satisfies TypedFlatConfigItem,
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
          'md/consistent-thematic-break-style': ['error', { style: '- - -' }],
          'md/no-url-trailing-slash': 'error',

          // > [!TIP]
          // >
          'markdown/no-missing-label-refs': 'off',
        },
      } satisfies TypedFlatConfigItem,
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
}

export * from '@antfu/eslint-config'
