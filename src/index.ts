/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import '../eslint-typegen.d.ts'

import process from 'node:process'

import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import type { ConfigOptions } from 'eslint-flat-config'
import { config } from 'eslint-flat-config'
import pluginUnicorn from 'eslint-plugin-unicorn'
import { isPackageExists } from 'local-pkg'
import tseslint from 'typescript-eslint'

import { formatConfigs } from './configs/format'
import { importConfig } from './configs/imports'
import { jsonConfigs } from './configs/json'
import { reactConfigs } from './configs/react'
import { stylisticConfig } from './configs/stylistic'
import { ensurePackages } from './utils'

export interface Options {
  react?: boolean,
  typescript?: {
    strict?: boolean,
    typeChecked?: boolean | 'essential',
    project?: string[] | string | boolean | null,
    tsconfigRootDir?: string,
    filesDisableTypeChecking?: string[],
  },
  style?: StylisticCustomizeOptions | false,
}

const reactRelatedPackages = ['react', 'react-dom']

export default async function hyoban(
  options?: Options & Pick<ConfigOptions, 'ignores' | 'ignoreFiles'>,
  ...args: Array<Linter.FlatConfig | (() => Linter.FlatConfig) | (() => Promise<Linter.FlatConfig>)>
) {
  const {
    react = reactRelatedPackages.some(element => isPackageExists(element)),
    typescript,
    style,
  } = options ?? {}

  const requiredPackages = [
    react && '@eslint-react/eslint-plugin',
    react && 'eslint-plugin-react-hooks',
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
      pluginUnicorn.configs['flat/recommended'],
      {
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
    importConfig(),
    stylisticConfig(style),
    ...jsonConfigs(style),
    ...reactConfigs({ react, typeChecked }),
    ...formatConfigs(style),
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
  ) as Promise<Linter.FlatConfig[]>
}
