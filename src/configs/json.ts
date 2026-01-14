import type { ESLint } from 'eslint'
import pluginJsonc from 'eslint-plugin-jsonc'
import packageJson from 'eslint-plugin-package-json'
import * as parserJsonc from 'jsonc-eslint-parser'

import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_SHOULD_BE_JSONC } from '../consts'
import type { Options } from '../option'
import type { LinterConfig } from '../utils'

function formattingConfigs({ formatting }: Required<Options>): LinterConfig[] {
  if (!formatting)
    return []

  const jsonFormateRules: LinterConfig['rules'] = {
    'jsonc/array-bracket-spacing': ['error', 'never'],
    'jsonc/comma-dangle': ['error', 'never'],
    'jsonc/comma-style': ['error', 'last'],
    'jsonc/indent': ['error', (typeof formatting.indent === 'number' || formatting.indent === 'tab') ? formatting.indent : 2],
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
      } as LinterConfig['rules'],
    },
    {
      name: 'json/jsonc',
      files: [GLOB_JSONC, ...GLOB_SHOULD_BE_JSONC],
      rules: {
        ...pluginJsonc.configs['recommended-with-jsonc'].rules,
        ...jsonFormateRules,
      } as LinterConfig['rules'],
    },
    {
      name: 'json/json5',
      files: [GLOB_JSON5],
      rules: {
        ...pluginJsonc.configs['recommended-with-json5'].rules,
        ...jsonFormateRules,
      } as LinterConfig['rules'],
    },
  ]
}

export function jsonConfigs(options: Required<Options>): Array<LinterConfig | LinterConfig[]> {
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
    packageJson.configs.recommended,
    packageJson.configs.stylistic,
    {
      name: 'package-json/custom',
      files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
      settings: {
        packageJson: {
          enforceForPrivate: false,
        },
      },
    } satisfies LinterConfig,
  ]
}
