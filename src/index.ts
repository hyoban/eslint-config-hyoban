import type { Awaitable, ConfigNames, OptionsConfig, Rules } from '@antfu/eslint-config'
import antfu from '@antfu/eslint-config'
import { createDefu } from 'defu'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { isPackageExists } from 'local-pkg'

import type { RuleOptions } from '../eslint-typegen'

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

type Options = OptionsConfig & Omit<TypedFlatConfigItem, 'files' | 'ignores'>

function isEmptyObject(obj: any) {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0
}

const isDefaultTrue = (value: any) => isEmptyObject(value) || value === true

const defu = createDefu((obj, key, value) => {
  if (isDefaultTrue(value)) {
    return true
  }
})

export function defineConfig(
  options?: Options,
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const merged = defu<Options, Options[]>(
    options as Options,
    {
      typescript: {
        overrides: {
          'ts/consistent-type-definitions': ['error', 'type'],
          'ts/no-explicit-any': 'warn',
        },
      },
      react: isPackageExists('react')
        ? {
            overrides: {
              'react/no-context-provider': 'off',
              'react/no-forward-ref': 'off',
              'react/no-use-context': 'off',

              'react-hooks/set-state-in-effect': 'off',
              'react-hooks-extra/no-direct-set-state-in-use-effect': 'error',
            },
          }
        : undefined,
      pnpm: false,
    },
  )

  return antfu(
    merged,
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
