import pluginStylistic from '@stylistic/eslint-plugin'
import type { ESLint, Linter } from 'eslint'
import pluginJsonc from 'eslint-plugin-jsonc'
import packageJson from 'eslint-plugin-package-json/configs/recommended'
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

export function jsonConfigs({ stylistic }: Required<Options>): Linter.FlatConfig[] {
  const jsonFormateRules = {
    'jsonc/array-bracket-spacing': ['error', 'never'],
    'jsonc/comma-style': ['error', 'last'],
    'jsonc/indent': ['error', stylistic.indent ?? 2],
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
    'jsonc/indent': ['error', stylistic.indent ?? 2],
    'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'jsonc/object-curly-newline': ['error', { minProperties: 1 }],
    'jsonc/object-curly-spacing': ['error', 'always'],
    'jsonc/object-property-newline': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/eol-last': ['error', 'always'],
  }

  return [
    {
      name: 'json/setup',
      files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
      plugins: {
        'jsonc': pluginJsonc as unknown as ESLint.Plugin,
        '@stylistic': pluginStylistic as unknown as ESLint.Plugin,
        'package-json': packageJson.plugins['package-json'] as ESLint.Plugin,
      },
      languageOptions: {
        parser: parserJsonc,
      },
    },
    {
      name: 'json/json',
      files: [GLOB_JSON],
      ignores: GLOB_SHOULD_BE_JSONC,
      rules: {
        ...pluginJsonc.configs['recommended-with-json'].rules,
        ...jsonFormateRules,
      } as Linter.FlatConfig['rules'],
    },
    {
      name: 'json/jsonc',
      files: [GLOB_JSONC, ...GLOB_SHOULD_BE_JSONC],
      rules: {
        ...pluginJsonc.configs['recommended-with-jsonc'].rules,
        ...jsonFormateRules,
      } as Linter.FlatConfig['rules'],
    },
    {
      name: 'json/json5',
      files: [GLOB_JSON5],
      rules: {
        ...pluginJsonc.configs['recommended-with-json5'].rules,
        ...jsonFormateRules,
      } as Linter.FlatConfig['rules'],
    },
    {
      name: 'json/package',
      files: ['**/package.json'],
      rules: {
        ...packageJson.rules,
        'package-json/order-properties': 'off',
        'package-json/sort-collections': 'off',
        ...jsonFormateRulesStrict as Linter.FlatConfig['rules'],
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
      } as Linter.FlatConfig['rules'],
    },
  ]
}
