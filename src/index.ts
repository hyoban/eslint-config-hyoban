/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import '../eslint-typegen.d.ts'

import process from 'node:process'

import type { Linter } from 'eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'
import pluginUnicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

import { importConfig } from './configs/imports'
import { jsonConfigs } from './configs/json'
import { reactConfigs } from './configs/react'
import type { ConfigOptions } from './utils'
import { config } from './utils'

export interface Options {
  react?: boolean
  typescript?: {
    strict?: boolean
    typeChecked?: boolean | 'essential'
    project?: string[] | string | boolean | null
    tsconfigRootDir?: string
    filesDisableTypeChecking?: string[]
  }
}

export default async function hyoban(
  options?: Options & Pick<ConfigOptions, 'ignores' | 'ignoreFiles'>,
  ...args: Array<
    | Linter.FlatConfig
    | (() => Linter.FlatConfig)
    | (() => Promise<Linter.FlatConfig>)
  >
) {
  const { react = false, typescript } = options ?? {}

  const {
    strict = false,
    typeChecked = 'essential',
    project = true,
    tsconfigRootDir = process.cwd(),
    filesDisableTypeChecking = [],
  } = typescript ?? {}

  const typescriptPreset = strict
    ? typeChecked === true
      ? tseslint.configs.strictTypeChecked
      : tseslint.configs.strict
    : typeChecked === true
      ? tseslint.configs.recommendedTypeChecked
      : tseslint.configs.recommended

  return config(
    {
      ignores: options?.ignores,
      ignoreFiles: options?.ignoreFiles,
      rules: {
        // https://twitter.com/karlhorky/status/1773632485055680875
        'array-callback-return': 'error',
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
      pluginUnicorn.configs['flat/recommended'],
      {
        name: 'unicorn/recommended',
        rules: {
          'unicorn/prevent-abbreviations': 'off',
          'unicorn/catch-error-name': 'off',
          // https://github.com/sindresorhus/meta/discussions/7
          'unicorn/no-null': 'off',
          // https://github.com/orgs/web-infra-dev/discussions/10
          'unicorn/prefer-top-level-await': 'off',
          'unicorn/no-negated-condition': 'off',
          'unicorn/no-await-expression-member': 'off',
        },
      },
    ],
    [
      ...typescriptPreset,
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

          // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
          '@typescript-eslint/method-signature-style': ['error', 'property'],
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
        ? typeChecked === 'essential'
          ? {
              rules: {
                // https://youtu.be/OVNQWzdhCQA?si=PvPOOgtGW5H4uRB7
                '@typescript-eslint/await-thenable': 'error',
                '@typescript-eslint/no-floating-promises': 'error',
                '@typescript-eslint/no-misused-promises': [
                  'error',
                  { checksVoidReturn: { arguments: false, attributes: false } },
                ],
              },
            }
          : {
              rules: {
                '@typescript-eslint/consistent-type-exports': 'error',
                '@typescript-eslint/no-misused-promises': [
                  'error',
                  { checksVoidReturn: { arguments: false, attributes: false } },
                ],
              },
            }
        : {},
    ] as Linter.FlatConfig[],
    importConfig(),
    {
      name: 'stylistic/extra',
      plugins: {
        antfu: eslintPluginAntfu,
        hyoban: pluginHyoban as any,
      },
      rules: {
        'antfu/top-level-function': 'error',
        'prefer-template': 'error',
        'prefer-destructuring': [
          'error',
          {
            array: false,
            object: true,
          },
        ],
        'hyoban/prefer-early-return': 'error',
      },
    },
    ...jsonConfigs(),
    ...reactConfigs({ react, typeChecked }),
    () => {
      if (filesDisableTypeChecking.length === 0) {
        return
      }
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
      ] as Linter.FlatConfig[]
    },
    ...args,
    {
      rules: Object.fromEntries(
        Object.entries(eslintConfigPrettier.rules).filter(([rule]) =>
          rule.startsWith('unicorn/'),
        ),
      ),
    },
  )
}
