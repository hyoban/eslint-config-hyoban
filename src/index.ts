/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import process from 'node:process'

import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import type { UnifiedFlatConfig } from 'eslint-flat-config'
import { config } from 'eslint-flat-config'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import pluginEarlyReturn from 'eslint-plugin-early-return'
import format from 'eslint-plugin-format'
import * as eslintPluginImport from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import { isPackageExists } from 'local-pkg'
import tseslint from 'typescript-eslint'

import { json } from './configs/json'
import { ensurePackages, interopDefault } from './utils'

const GLOB_TS = '**/*.?([cm])ts'
const GLOB_TSX = '**/*.?([cm])tsx'

export type Options = {
  react?: boolean
  next?: boolean
  typescript?: {
    strict?: boolean
    typeChecked?: boolean
    project?: string[] | string | boolean | null
    tsconfigRootDir?: string
  }
  style?: StylisticCustomizeOptions
}

const reactRelatedPackages = ['react', 'react-dom']
const nextRelatedPackages = ['next']

type ArrayExcludeFirst<T extends unknown[]> = T extends [unknown, ...infer U] ? U : never

export default async function hyoban(
  options?: Options,
  ...args: ArrayExcludeFirst<Parameters<typeof config>>
) {
  const {
    react = reactRelatedPackages.some(element => isPackageExists(element)),
    next = nextRelatedPackages.some(element => isPackageExists(element)),
    typescript,
    style,
  } = options ?? {}

  const requiredPackages = [
    react && '@eslint-react/eslint-plugin',
    react && 'eslint-plugin-react-hooks',
    next && '@next/eslint-plugin-next',
  ].filter(Boolean)
  await ensurePackages(requiredPackages)

  const {
    strict = true,
    typeChecked = true,
    project = true,
    tsconfigRootDir = process.cwd(),
  } = typescript ?? {}
  const typescriptPresets = strict
    ? (typeChecked
        ? [
            ...tseslint.configs.strictTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
          ]
        : [
            ...tseslint.configs.strict,
            ...tseslint.configs.stylistic,
          ])
    : (typeChecked
        ? [
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
          ]
        : [
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
          ])

  return config(
    {
      rules: {
        'prefer-template': 'error',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration',
            message: 'We should not use Enum',
          },
        ],
      },
    },
    [
      stylistic.configs.customize(style),
      {
        plugins: {
          antfu: eslintPluginAntfu,
        },
        rules: {
          'antfu/consistent-list-newline': 'error',
          'antfu/if-newline': 'error',
          'antfu/top-level-function': 'error',
        },
      },
      {
        rules: {
          curly: ['error', 'multi-or-nest', 'consistent'],
        },
      },
    ],
    [
      eslintPluginUnicorn.configs['flat/recommended'],
      {
        rules: {
          // we should not restrict how we name our variables
          'unicorn/prevent-abbreviations': 'off',
          'unicorn/catch-error-name': 'off',
          // https://github.com/sindresorhus/meta/discussions/7
          'unicorn/no-null': 'off',
          // https://github.com/orgs/web-infra-dev/discussions/10
          'unicorn/prefer-top-level-await': 'off',
          'unicorn/no-negated-condition': 'off',
        },
      },
    ],
    {
      name: 'Import sort',
      plugins: {
        'simple-import-sort': simpleImportSort,
        'import': eslintPluginImport,
      },
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'antfu/import-dedupe': 'error',

        'antfu/no-import-dist': 'error',
        'antfu/no-import-node-modules-by-path': 'error',
      },
    },
    [
      ...typescriptPresets,
      typeChecked
        ? {
            languageOptions: {
              parserOptions: {
                project,
                tsconfigRootDir,
              },
            },
          }
        : {},
      {
        rules: {
          '@typescript-eslint/consistent-type-imports': 'error',
          '@typescript-eslint/no-import-type-side-effects': 'error',

          '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
          '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        },
      },
      strict
        ? {
            rules: {
              '@typescript-eslint/no-non-null-assertion': 'off',
            },
          }
        : {},
      typeChecked
        ? {
            rules: {
              '@typescript-eslint/consistent-type-exports': 'error',
              '@typescript-eslint/no-misused-promises': [
                'error',
                {
                  checksVoidReturn: {
                    arguments: false,
                    attributes: false,
                  },
                },
              ],
            },
          }
        : {},
    ],
    {
      plugins: {
        'unused-imports': pluginUnusedImports,
      },
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          { args: 'after-used', argsIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_' },
        ],
      },
    },
    ...json({ style }),
    {
      plugins: {
        'early-return': pluginEarlyReturn,
      },
      rules: {
        'early-return/prefer-early-return': 'error',
      },
    },
    async () => {
      if (!react)
        return
      const eslintReact = await interopDefault(import('@eslint-react/eslint-plugin'))
      return [
        eslintReact.configs.all,
        {
          files: [GLOB_TS, GLOB_TSX],
          rules: {
            '@eslint-react/naming-convention/filename': 'off',
          },
        },
        typeChecked
          ? {
              rules: {
                '@eslint-react/no-leaked-conditional-rendering': 'error',
              },
            }
          : {},
      ] as UnifiedFlatConfig[]
    },
    async () => {
      if (!react)
        return
      const reactHooks = await interopDefault(import('eslint-plugin-react-hooks'))
      return {
        plugins: {
          'react-hooks': reactHooks,
        },
        rules: reactHooks.configs.recommended.rules,
      } as UnifiedFlatConfig
    },
    async () => {
      if (!next)
        return
      const eslintPluginNext = await interopDefault(import('@next/eslint-plugin-next'))
      return {
        plugins: {
          '@next/next': eslintPluginNext,
        },
        rules: eslintPluginNext.configs.recommended.rules,
      } as UnifiedFlatConfig
    },
    ...[
      'css',
      {
        exts: ['md'],
        parser: 'markdown',
      },
      'mdx',
      'html',
      {
        parser: 'yaml',
        exts: ['yaml', 'yml'],
      },
    ].map(element => createFormatter(element)),
    ...args,
  )
}

function createFormatter(input: { exts: string[], parser: string } | string) {
  return {
    files:
      typeof input === 'string'
        ? [`**/*.${input}`]
        : input.exts.map(ext => `**/*.${ext}`),
    languageOptions: {
      parser: format.parserPlain,
    },
    plugins: {
      format,
    },
    rules: {
      'format/prettier': ['error', { parser: typeof input === 'string' ? input : input.parser }],
    },
  } as UnifiedFlatConfig
}
