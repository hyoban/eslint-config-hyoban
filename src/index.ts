/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import process from 'node:process'

import * as pluginPackageJson from '@hyoban/eslint-plugin-package-json'
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import type { UnifiedFlatConfig } from 'eslint-flat-config'
import { config } from 'eslint-flat-config'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import pluginEarlyReturn from 'eslint-plugin-early-return'
import format from 'eslint-plugin-format'
import * as eslintPluginImport from 'eslint-plugin-import'
import pluginJsonc from 'eslint-plugin-jsonc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import parserJsonc from 'jsonc-eslint-parser'
import { isPackageExists } from 'local-pkg'
import tseslint from 'typescript-eslint'

import { ensurePackages, interopDefault } from './utils'

const GLOB_TS = '**/*.?([cm])ts'
const GLOB_TSX = '**/*.?([cm])tsx'

const GLOB_JSON = '**/*.json'
const GLOB_JSON5 = '**/*.json5'
const GLOB_JSONC = '**/*.jsonc'

export type Options = {
  react?: boolean
  next?: boolean
  typescript?: {
    strict?: boolean
    typeChecked?: boolean
    tsconfigRootDir?: string
  }
  style?: StylisticCustomizeOptions
}

const reactRelatedPackages = ['react', 'react-dom']
const nextRelatedPackages = ['next']

export default async function hyoban(options?: Options) {
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
                project: true,
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
    {
      files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
      plugins: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jsonc: pluginJsonc as any,
      },
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        'jsonc/no-bigint-literals': 'error',
        'jsonc/no-binary-expression': 'error',
        'jsonc/no-binary-numeric-literals': 'error',
        'jsonc/no-dupe-keys': 'error',
        'jsonc/no-escape-sequence-in-identifier': 'error',
        'jsonc/no-floating-decimal': 'error',
        'jsonc/no-hexadecimal-numeric-literals': 'error',
        'jsonc/no-infinity': 'error',
        'jsonc/no-multi-str': 'error',
        'jsonc/no-nan': 'error',
        'jsonc/no-number-props': 'error',
        'jsonc/no-numeric-separators': 'error',
        'jsonc/no-octal': 'error',
        'jsonc/no-octal-escape': 'error',
        'jsonc/no-octal-numeric-literals': 'error',
        'jsonc/no-parenthesized': 'error',
        'jsonc/no-plus-sign': 'error',
        'jsonc/no-regexp-literals': 'error',
        'jsonc/no-sparse-arrays': 'error',
        'jsonc/no-template-literals': 'error',
        'jsonc/no-undefined-value': 'error',
        'jsonc/no-unicode-codepoint-escapes': 'error',
        'jsonc/no-useless-escape': 'error',
        'jsonc/space-unary-ops': 'error',
        'jsonc/valid-json-number': 'error',
        'jsonc/vue-custom-block/no-parsing-error': 'error',

        'jsonc/array-bracket-spacing': ['error', 'never'],
        'jsonc/comma-dangle': ['error', 'never'],
        'jsonc/comma-style': ['error', 'last'],
        'jsonc/indent': ['error', style?.indent ?? 2],
        'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
        'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],
        'jsonc/object-curly-spacing': ['error', 'always'],
        'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
        'jsonc/quote-props': 'error',
        'jsonc/quotes': 'error',
      },
    },
    {
      files: ['**/package.json'],
      languageOptions: {
        parser: parserJsonc,
      },
      plugins: {
        'package-json': pluginPackageJson,
      },
      rules: {
        ...pluginPackageJson.configs.recommended.rules,
        'package-json/order-properties': 'off',
        'package-json/sort-collections': 'off',
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^files$',
          },
        ],
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'scripts',
              'release-it',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
            ],
            pathPattern: '^$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
          },
          {
            order: [
              'types',
              'import',
              'require',
              'default',
            ],
            pathPattern: '^exports.*$',
          },
        ],
      },
    },
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
