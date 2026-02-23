import '../eslint-typegen.d.ts'

import type {
  Awaitable,
  ConfigNames,
  OptionsConfig,
  OptionsFiles,
  OptionsOverrides,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import antfu, { GLOB_MARKDOWN, GLOB_MARKDOWN_IN_MARKDOWN } from '@antfu/eslint-config'
import markdown from '@eslint/markdown'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import md from 'eslint-markdown'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import { hyoban } from './configs/hyoban'
import { tailwindcss } from './configs/tailwindcss'
import { mergeOptions } from './merge-options'
import type { OptionsTailwindcss } from './types.js'

export type OptionsAddons = {
  tailwindcss?: boolean | (OptionsOverrides & OptionsFiles & OptionsTailwindcss)
  hyoban?: boolean | (OptionsOverrides)
  sortImports?: 'simple-import-sort' | 'perfectionist'
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
  const {
    tailwindcss: enableTailwindCSS,
    hyoban: enableHyoban = true,
    sortImports = 'simple-import-sort',
    ...antfuOptions
  } = options || {}

  const config = antfu(
    mergeOptions(antfuOptions),
    ...userConfigs,
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
        },
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
    .remove('antfu/markdown/parser')
    .append(
      {
        name: 'hyoban/markdown/ignores',
        files: GLOB_MARKDOWNS,
        rules: {
          'no-irregular-whitespace': 'off',
          'command/command': 'off',
          'regexp/no-legacy-features': 'off',
          'regexp/no-missing-g-flag': 'off',
          'regexp/no-useless-dollar-replacements': 'off',
          'regexp/no-useless-flag': 'off',
          'perfectionist/sort-exports': 'off',
          'perfectionist/sort-imports': 'off',
        },
      },
    )

  if (sortImports === 'simple-import-sort') {
    config
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
  }

  if (enableTailwindCSS) {
    config
      .append(tailwindcss(typeof enableTailwindCSS === 'boolean' ? {} : enableTailwindCSS))
      .renamePlugins({
        'better-tailwindcss': 'tailwindcss',
      })
  }

  if (enableHyoban) {
    config.append(hyoban(typeof enableHyoban === 'boolean' ? {} : enableHyoban))
  }

  return config
}

export * from '@antfu/eslint-config'
