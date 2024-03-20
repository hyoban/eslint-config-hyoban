/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import process from 'node:process'

import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import type { ConfigOptions, UnifiedFlatConfig } from 'eslint-flat-config'
import { config } from 'eslint-flat-config'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import format from 'eslint-plugin-format'
import pluginGitHub from 'eslint-plugin-github'
import pluginHyoban from 'eslint-plugin-hyoban'
import pluginUnicorn from 'eslint-plugin-unicorn'
import { isPackageExists } from 'local-pkg'
import tseslint from 'typescript-eslint'

import { imports } from './configs/imports'
import { json } from './configs/json'
import { ensurePackages, interopDefault } from './utils'

const GLOB_TS = '**/*.?([cm])ts'
const GLOB_TSX = '**/*.?([cm])tsx'

export type Options = {
  react?: boolean,
  next?: boolean,
  typescript?: {
    strict?: boolean,
    typeChecked?: boolean | 'essential',
    project?: string[] | string | boolean | null,
    tsconfigRootDir?: string,
    filesDisableTypeChecking?: string[],
  },
  style?: StylisticCustomizeOptions,
}

const reactRelatedPackages = ['react', 'react-dom']
const nextRelatedPackages = ['next']

type ArrayExcludeFirst<T extends unknown[]> = T extends [unknown, ...infer U] ? U : never

export default async function hyoban(
  options?: Options & Pick<ConfigOptions, 'ignores' | 'ignoreFiles'>,
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
    strict = false,
    typeChecked = 'essential',
    project = true,
    tsconfigRootDir = process.cwd(),
    filesDisableTypeChecking = [],
  } = typescript ?? {}
  const typescriptPresets = [
    ...tseslint.configs.stylistic,
    ...(strict
      ? (typeChecked === true
          ? tseslint.configs.strictTypeChecked
          : tseslint.configs.strict)
      : (typeChecked === true
          ? tseslint.configs.recommendedTypeChecked
          : tseslint.configs.recommended)),
  ]

  return config(
    {
      ignores: options?.ignores,
      ignoreFiles: options?.ignoreFiles,
      rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }],
        // https://youtu.be/XTXPKbPcvl4?si=J_2E9dM25sAEXM2x
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
        rules: {
          '@stylistic/quotes': ['error', style?.quotes === 'double' ? 'double' : 'single'],
          '@stylistic/jsx-self-closing-comp': ['error', {
            component: true,
            html: true,
          }],
          '@stylistic/member-delimiter-style': ['error', {
            multiline: { delimiter: 'comma', requireLast: true },
            singleline: { delimiter: 'comma', requireLast: false },
            multilineDetection: 'brackets',
          }],
        },
      },
      {
        plugins: {
          antfu: eslintPluginAntfu,
        },
        rules: {
          'antfu/consistent-list-newline': 'error',
          'antfu/if-newline': 'error',
          'antfu/top-level-function': 'error',
          'curly': ['error', 'multi-or-nest', 'consistent'],
          'prefer-template': 'error',
          'prefer-destructuring': [
            'error',
            {
              array: false,
              object: true,
            },
          ],
        },
      },
    ],
    [
      pluginUnicorn.configs['flat/recommended'],
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
      {
        plugins: {
          github: pluginGitHub,
        },
        rules: {
          'github/no-then': 'error',
        },
      },
    ],
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
          'no-unused-vars': 'off',
          '@typescript-eslint/no-unused-vars': [
            'error',
            {
              args: 'all',
              argsIgnorePattern: '^_',
              caughtErrors: 'all',
              caughtErrorsIgnorePattern: '^_',
              destructuredArrayIgnorePattern: '^_',
              varsIgnorePattern: '^_',
              ignoreRestSiblings: true,
            },
          ],

          '@typescript-eslint/consistent-type-imports': 'error',
          '@typescript-eslint/no-import-type-side-effects': 'error',

          '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
          '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

          // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
          '@typescript-eslint/method-signature-style': [
            'error',
            'property',
          ],
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
        ? (typeChecked === 'essential'
            ? {
                rules: {
                  // https://youtu.be/OVNQWzdhCQA?si=PvPOOgtGW5H4uRB7
                  '@typescript-eslint/await-thenable': 'error',
                  '@typescript-eslint/no-floating-promises': 'error',
                  '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { arguments: false, attributes: false } }],
                },
              }
            : {
                rules: {
                  '@typescript-eslint/consistent-type-exports': 'error',
                  '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { arguments: false, attributes: false } }],
                },
              })
        : {},
    ],
    imports(),
    ...json({ style }),
    {
      plugins: {
        hyoban: pluginHyoban,
      },
      rules: {
        'hyoban/prefer-early-return': 'error',
        'hyoban/no-extra-space-jsx-expression': 'error',
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
            '@eslint-react/hooks-extra/ensure-use-memo-has-non-empty-deps': 'off',
            '@eslint-react/hooks-extra/ensure-use-callback-has-non-empty-deps': 'off',
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
    () => {
      if (filesDisableTypeChecking.length === 0)
        return
      return [
        {
          ...tseslint.configs.disableTypeChecked,
          files: filesDisableTypeChecking,
        },
        {
          rules: {
            '@eslint-react/no-leaked-conditional-rendering': 'off',
          },
        },
      ]
    },
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
