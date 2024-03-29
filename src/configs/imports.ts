/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { UnifiedFlatConfig } from 'eslint-flat-config'
import pluginAntfu from 'eslint-plugin-antfu'
import * as pluginImport from 'eslint-plugin-import-x'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export function importConfig(): UnifiedFlatConfig {
  return {
    name: 'imports',
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
