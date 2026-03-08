import '../eslint-typegen.d.ts'

import type {
  Awaitable,
  ConfigNames,
  OptionsConfig,
  OptionsFiles,
  OptionsOverrides,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import antfu, { GLOB_MARKDOWN } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import md from 'eslint-markdown'
import hyoban from 'eslint-plugin-hyoban'
import markdownPreferences from 'eslint-plugin-markdown-preferences'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import { tailwindcss } from './configs/tailwindcss'
import { mergeOptions } from './merge-options'
import type { OptionsTailwindcss } from './types.js'

export type OptionsAddons = {
  tailwindcss?: boolean | (OptionsOverrides & OptionsFiles & OptionsTailwindcss)
}

export type Options = OptionsConfig & Omit<TypedFlatConfigItem, 'files' | 'ignores'> & OptionsAddons

export function defineConfig(
  options?: Options,
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const {
    tailwindcss: enableTailwindCSS,
    ...antfuOptions
  } = options || {}

  const base = antfu(mergeOptions(antfuOptions))

  base
    .insertAfter(
      'antfu/markdown/setup',
      {
        name: 'hyoban/md/setup',
        plugins: {
          md,
          'markdown-preferences': markdownPreferences,
        },
      },
    )
    .insertAfter(
      'antfu/markdown/rules',
      {
        name: 'hyoban/md/rules',
        files: [GLOB_MARKDOWN],
        rules: {
          ...markdownPreferences.configs.standard.rules,
          'md/no-url-trailing-slash': 'error',
        },
      },
    )

  base
    .insertBefore(
      'antfu/perfectionist/setup',
      {
        name: 'hyoban/import-sort/setup',
        plugins: {
          'import-sort': simpleImportSort,
        },
        rules: {
          'import-sort/imports': 'error',
          'import-sort/exports': 'error',
        },
      },
    )
    .remove('antfu/perfectionist/setup')
    .renamePlugins({
      'simple-import-sort': 'import-sort',
    })

  base
    .append(
      {
        name: 'hyoban/hyoban/setup',
        plugins: {
          hyoban,
        },
      },
    )
    .append(
      {
        files: [GLOB_MARKDOWN],
        name: 'hyoban/hyoban/rules',
        rules: {
          'hyoban/md-one-sentence-per-line': 'error',
        },
      },
    )

  if (enableTailwindCSS) {
    base
      .append(tailwindcss(typeof enableTailwindCSS === 'boolean' ? {} : enableTailwindCSS))
      .renamePlugins({
        'better-tailwindcss': 'tailwindcss',
      })
  }

  base.append(...userConfigs as any)

  return base
}

export * from '@antfu/eslint-config'
