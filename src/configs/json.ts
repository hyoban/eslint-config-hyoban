import type { ESLint, Linter } from 'eslint'
import pluginJsonc from 'eslint-plugin-jsonc'
import packageJson from 'eslint-plugin-package-json'
import * as parserJsonc from 'jsonc-eslint-parser'

import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_SHOULD_BE_JSONC } from '../consts'
import type { Options } from '../option'

function formattingConfigs({ formatting }: Required<Options>): Linter.Config[] {
  if (!formatting)
    return []

  const jsonFormateRules: Linter.RulesRecord = {
    'jsonc/array-bracket-spacing': ['error', 'never'],
    'jsonc/comma-dangle': ['error', 'never'],
    'jsonc/comma-style': ['error', 'last'],
    'jsonc/indent': ['error', formatting.indent ?? 2],
    'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'jsonc/object-curly-spacing': ['error', 'always'],
    'jsonc/quote-props': 'error',
    'jsonc/quotes': 'error',
    'hyoban/jsonc-inline-spacing': 'error',
  }

  return [
    {
      name: 'json/json',
      files: [GLOB_JSON],
      ignores: GLOB_SHOULD_BE_JSONC,
      rules: {
        ...pluginJsonc.configs['recommended-with-json'].rules,
        ...jsonFormateRules,
      } as Linter.Config['rules'],
    },
    {
      name: 'json/jsonc',
      files: [GLOB_JSONC, ...GLOB_SHOULD_BE_JSONC],
      rules: {
        ...pluginJsonc.configs['recommended-with-jsonc'].rules,
        ...jsonFormateRules,
      } as Linter.Config['rules'],
    },
    {
      name: 'json/json5',
      files: [GLOB_JSON5],
      rules: {
        ...pluginJsonc.configs['recommended-with-json5'].rules,
        ...jsonFormateRules,
      } as Linter.Config['rules'],
    },
  ]
}

export function jsonConfigs(options: Required<Options>): Array<Linter.Config | Linter.Config[]> {
  return [
    {
      name: 'json/setup',
      files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
      /// keep-sorted
      plugins: {
        'jsonc': pluginJsonc as unknown as ESLint.Plugin,
        'package-json': packageJson as ESLint.Plugin,
      },
      languageOptions: {
        parser: parserJsonc,
      },
    },
    ...formattingConfigs(options),
    [
      packageJson.configs.recommended,
      {
        rules: {
          // TODO: enable in lib mode?
          'package-json/require-version': 'off',
          'package-json/require-description': 'off',
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
        },
      },
    ] as Linter.Config[],
  ]
}
