import type { ESLint, Linter } from 'eslint'
import pluginAntfu from 'eslint-plugin-antfu'
import * as pluginImport from 'eslint-plugin-import-x'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export function importConfig(): Linter.FlatConfig {
  return {
    name: 'import',
    plugins: {
      'simple-import-sort': simpleImportSort,
      'import-x': pluginImport as unknown as ESLint.Plugin,
      'antfu': pluginAntfu,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'import-x/first': 'warn',
      'import-x/newline-after-import': 'warn',
      'import-x/no-duplicates': 'warn',
      'import-x/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
      'antfu/import-dedupe': 'warn',
      'antfu/no-import-dist': 'error',
      'antfu/no-import-node-modules-by-path': 'error',
    },
  }
}
