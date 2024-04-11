/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Linter } from 'eslint'
import pluginJsonc from 'eslint-plugin-jsonc'
import * as parserJsonc from 'jsonc-eslint-parser'


export function jsonConfigs(): Linter.FlatConfig[] {
  const jsonFormateRulesStrict = {
    'jsonc/array-bracket-newline': ['error', { minItems: 1 }],
    'jsonc/array-element-newline': ['error', 'always'],
    'jsonc/comma-style': ['error', 'last'],
    'jsonc/indent': ['error', 2],
    'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'jsonc/object-curly-newline': ['error', { minProperties: 1 }],
    'jsonc/object-curly-spacing': ['error', 'always'],
    'jsonc/object-property-newline': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/eol-last': ['error', 'always'],
  }

  return [
    {
      name: 'json/package',
      files: ['**/package.json'],
      plugins: {
        'jsonc': pluginJsonc as any,
      },
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
