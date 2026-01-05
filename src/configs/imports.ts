import type { ESLint } from 'eslint'
import pluginAntfu from 'eslint-plugin-antfu'
import * as pluginImport from 'eslint-plugin-import-lite'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import type { LinterConfig } from '../utils'

export function importConfig(): LinterConfig {
  return {
    name: 'extend/import',
    plugins: {
      'simple-import-sort': simpleImportSort,
      'import-lite': pluginImport as unknown as ESLint.Plugin,
      'antfu': pluginAntfu,
    },
    rules: {
      'sort-imports': 'off',
      'import-lite/order': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'import-lite/first': 'error',
      'import-lite/newline-after-import': 'error',
      'no-duplicate-imports': 'off',
      'import-lite/no-duplicates': 'error',
      'antfu/import-dedupe': 'error',

      'import-lite/consistent-type-specifier-style': ['error', 'prefer-top-level'],

      'antfu/no-import-dist': 'error',
      'antfu/no-import-node-modules-by-path': 'error',
    },
  }
}
