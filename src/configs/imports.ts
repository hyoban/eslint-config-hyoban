import type { ESLint } from 'eslint'
import pluginAntfu from 'eslint-plugin-antfu'
import * as pluginImport from 'eslint-plugin-import-x'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import type { LinterConfig } from '../utils'

export function importConfig(): LinterConfig {
  return {
    name: 'extend/import',
    plugins: {
      'simple-import-sort': simpleImportSort,
      'import-x': pluginImport as unknown as ESLint.Plugin,
      'antfu': pluginAntfu,
    },
    rules: {
      'sort-imports': 'off',
      'import-x/order': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'no-duplicate-imports': 'off',
      'import-x/no-duplicates': 'error',
      'antfu/import-dedupe': 'error',

      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],

      'antfu/no-import-dist': 'error',
      'antfu/no-import-node-modules-by-path': 'error',
    },
  }
}
