import '../eslint-typegen.d.ts'

import process from 'node:process'

import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { ESLint, Linter } from 'eslint'
import command from 'eslint-plugin-command/config'
import * as regexpPlugin from 'eslint-plugin-regexp'
import pluginUnusedImports from 'eslint-plugin-unused-imports'

import { importConfig } from './configs/imports'
import { jsonConfigs } from './configs/json'
import { reactConfigs } from './configs/react'
import { stylisticConfigs } from './configs/stylistic'
import { typeScriptConfigs } from './configs/typescript'
import { unicornConfigs } from './configs/unicorn'
import type { ConfigArray, ConfigOptions } from './utils'
import { config } from './utils'

export interface Options {
  react?: 'vite' | 'remix' | 'next' | false,
  strict?: boolean,
  typeChecked?: boolean | 'essential',
  project?: string[] | string | boolean | null,
  tsconfigRootDir?: string,
  filesDisableTypeChecking?: string[],
  stylistic?: Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'semi'>,
  restrictedSyntax?: Array<string | { selector: string, message?: string }>,
}

function mergeDefaultOptions(
  options?: Options & Pick<ConfigOptions, 'ignores' | 'ignoreFiles'>,
): Required<Options> {
  return {
    react: false,
    strict: false,
    typeChecked: 'essential',
    project: true,
    tsconfigRootDir: process.cwd(),
    filesDisableTypeChecking: [],
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },
    restrictedSyntax: [],
    ...options,
  }
}

export * from './consts'

export default async function hyoban(
  options?: Options & Pick<ConfigOptions, 'ignores' | 'ignoreFiles'>,
  ...args: ConfigArray
) {
  const finalOptions = mergeDefaultOptions(options)

  return config(
    {
      ignores: options?.ignores,
      ignoreFiles: options?.ignoreFiles,
    },
    {
      name: '@eslint/js/custom',
      /// keep-sorted
      rules: {
        // https://twitter.com/karlhorky/status/1773632485055680875
        'array-callback-return': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        // https://twitter.com/ryanflorence/status/1786394911895683512
        'no-param-reassign': 'error',
        // https://youtu.be/XTXPKbPcvl4?si=J_2E9dM25sAEXM2x
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration',
            message: 'We should not use Enum',
          },
          ...finalOptions.restrictedSyntax,
        ],
      },
    },
    ...typeScriptConfigs(finalOptions),
    ...unicornConfigs(),
    importConfig(),
    {
      name: 'unused-imports',
      plugins: {
        'unused-imports': pluginUnusedImports as ESLint.Plugin,
      },
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
    ...jsonConfigs(finalOptions),
    ...reactConfigs(finalOptions),
    ...stylisticConfigs(finalOptions),
    [
      regexpPlugin.configs['flat/recommended'] as Linter.FlatConfig,
      {
        name: 'regexp/recommended',
        rules: {
          'unicorn/better-regex': 'off',
        },
      } satisfies Linter.FlatConfig,
    ],
    command(),
    ...args,
  )
}
