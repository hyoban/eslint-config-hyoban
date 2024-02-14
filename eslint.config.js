// @ts-check
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import stylistic from '@stylistic/eslint-plugin'
import { config } from 'eslint-flat-config'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import * as eslintPluginImport from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default config(
  {
    rules: {
      'prefer-template': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  stylistic.configs['recommended-flat'],
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
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          project: true,
          tsconfigRootDir: __dirname,
        },
      },
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration',
            message: 'We should not use Enum',
          },
        ],

        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],

        '@typescript-eslint/no-non-null-assertion': 'off',

        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/consistent-type-exports': 'error',

        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

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
    },
  ],
)
