import type { Awaitable, ConfigNames, OptionsConfig, Rules } from '@antfu/eslint-config'
import antfu from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
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

export function defineConfig(
  options?: Options,
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  return antfu(
    mergeOptions(options),
    ...userConfigs,
  )
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
      },
    )
    .remove('antfu/perfectionist/setup')
}

export * from '@antfu/eslint-config'
