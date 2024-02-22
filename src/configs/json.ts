/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import stylistic from '@stylistic/eslint-plugin'
import type { UnifiedFlatConfig } from 'eslint-flat-config'
import pluginJsonc from 'eslint-plugin-jsonc'
import * as pluginPackageJson from 'eslint-plugin-package-json'
import parserJsonc from 'jsonc-eslint-parser'

import type { Options } from '..'

const GLOB_JSON = '**/*.json'
const GLOB_JSON5 = '**/*.json5'
const GLOB_JSONC = '**/*.jsonc'

export function json(options?: { style?: Options['style'] }): UnifiedFlatConfig[] {
  const { style } = options ?? {}

  const jsonFormateRules = {
    'jsonc/array-bracket-spacing': ['error', 'never'],
    'jsonc/comma-style': ['error', 'last'],
    'jsonc/indent': ['error', style?.indent ?? 2],
    'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],
    'jsonc/object-curly-spacing': ['error', 'always'],
    'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
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
    '@stylistic/eol-last': ['error', 'always'],
  }

  return [
    {
      files: [GLOB_JSON],
      ignores: ['**/tsconfig.json', '**/tsconfig.*.json'],
      plugins: {
        'jsonc': pluginJsonc as any,
        '@stylistic': stylistic,
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
      files: [GLOB_JSONC, '**/tsconfig.json', '**/tsconfig.*.json'],
      plugins: {
        'jsonc': pluginJsonc as any,
        '@stylistic': stylistic,
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
      files: [GLOB_JSON5],
      plugins: {
        'jsonc': pluginJsonc as any,
        '@stylistic': stylistic,
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
      files: ['**/package.json'],
      plugins: {
        'package-json': pluginPackageJson,
      },
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        ...jsonFormateRulesStrict as any,
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
          {
            order: { type: 'asc' },
            pathPattern: 'scripts',
          },
        ],
      },
    },
  ]
}
