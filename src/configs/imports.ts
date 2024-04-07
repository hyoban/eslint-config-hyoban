/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Linter } from 'eslint'
import pluginAntfu from 'eslint-plugin-antfu'
import * as pluginImport from 'eslint-plugin-import-x'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export function importConfig(): Linter.FlatConfig {
  return {
    name: 'import/sort',
    plugins: {
      'simple-import-sort': simpleImportSort,
      'import-x': pluginImport,
      'antfu': pluginAntfu,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',

      'antfu/import-dedupe': 'error',
      'antfu/no-import-dist': 'error',
      'antfu/no-import-node-modules-by-path': 'error',
    },
  }
}
