import type { ESLint, Linter } from 'eslint'
import pluginJsonc from 'eslint-plugin-jsonc'
import packageJson from 'eslint-plugin-package-json/configs/recommended'
import * as parserJsonc from 'jsonc-eslint-parser'

import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_SHOULD_BE_JSONC } from '../consts'
import type { Options } from '../option'

export function jsonConfigs({ stylistic }: Required<Options>): Linter.FlatConfig[] {
  const jsonFormateRules: Linter.RulesRecord = {
    'jsonc/array-bracket-spacing': ['error', 'never'],
    'jsonc/comma-dangle': ['error', 'never'],
    'jsonc/comma-style': ['error', 'last'],
    'jsonc/indent': ['error', stylistic.indent ?? 2],
    'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'jsonc/object-curly-spacing': ['error', 'always'],
    'jsonc/quote-props': 'error',
    'jsonc/quotes': 'error',
    'hyoban/jsonc-inline-spacing': 'error',
  }

  return [
    {
      name: 'json/setup',
      files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
      /// keep-sorted
      plugins: {
        'jsonc': pluginJsonc as unknown as ESLint.Plugin,
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
        'package-json/sort-collections': 'off',
        ...jsonFormateRules,
        'package-json/order-properties': [
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
              'contributors',
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
          },
        ],
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
            order: { type: 'asc' },
            // eslint-disable-next-line @cspell/spellchecker
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
