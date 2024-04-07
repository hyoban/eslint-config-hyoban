/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import stylistic from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import pluginJsonc from 'eslint-plugin-jsonc'
import * as parserJsonc from 'jsonc-eslint-parser'

import type { Options } from '..'

const GLOB_JSON = '**/*.json'
const GLOB_SHOULD_BE_JSONC = [
  '**/tsconfig.json',
  '**/tsconfig.*.json',
  '**/.vscode/*.json',
]
const GLOB_JSON5 = '**/*.json5'
const GLOB_JSONC = '**/*.jsonc'

export function jsonConfigs(style?: Options['style']): Linter.FlatConfig[] {
  if (style === false)
    return []

  const jsonFormateRules = {
    'jsonc/array-bracket-spacing': ['error', 'never'],
    'jsonc/comma-style': ['error', 'last'],
    'jsonc/indent': ['error', style?.indent ?? 2],
    'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],
    'jsonc/object-curly-spacing': ['error', 'always'],
    'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/eol-last': ['error', 'always'],
  }

  const jsonFormateRulesStrict = {
    'jsonc/array-bracket-newline': ['error', { minItems: 1 }],
    'jsonc/array-element-newline': ['error', 'always'],
    'jsonc/comma-style': ['error', 'last'],
    'jsonc/indent': ['error', style?.indent ?? 2],
    'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'jsonc/object-curly-newline': ['error', { minProperties: 1 }],
    'jsonc/object-curly-spacing': ['error', 'always'],
    'jsonc/object-property-newline': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/eol-last': ['error', 'always'],
  }

  return [
    {
      name: 'json/json',
      files: [GLOB_JSON],
      ignores: GLOB_SHOULD_BE_JSONC,
      plugins: {
        'jsonc': pluginJsonc as any,
        '@stylistic': stylistic as any,
      },
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        ...pluginJsonc.configs['recommended-with-json'].rules as Record<string, string>,
        ...jsonFormateRules as any,
      },
    },
    {
      name: 'json/jsonc',
      files: [GLOB_JSONC, ...GLOB_SHOULD_BE_JSONC],
      plugins: {
        'jsonc': pluginJsonc as any,
        '@stylistic': stylistic as any,
      },
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        ...pluginJsonc.configs['recommended-with-jsonc'].rules as Record<string, string>,
        ...jsonFormateRules as any,
      },
    },
    {
      name: 'json/json5',
      files: [GLOB_JSON5],
      plugins: {
        'jsonc': pluginJsonc as any,
        '@stylistic': stylistic as any,
      },
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        ...pluginJsonc.configs['recommended-with-json5'].rules as Record<string, string>,
        ...jsonFormateRules as any,
      },
    },
    {
      name: 'json/package',
      files: ['**/package.json'],
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        ...jsonFormateRulesStrict as any,
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
              'import',
              'require',
              'types',
              'default',
            ],
            pathPattern: '^exports.*$',
          },
          {
            order: { type: 'asc' },
            pathPattern: 'scripts',
          },
        ],
      },
    },
  ]
}
