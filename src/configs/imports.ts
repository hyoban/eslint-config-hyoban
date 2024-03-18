/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { UnifiedFlatConfig } from 'eslint-flat-config'
import pluginAntfu from 'eslint-plugin-antfu'
import * as pluginImport from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export function imports(): UnifiedFlatConfig {
  return {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'import': pluginImport,
      'antfu': pluginAntfu,

    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      'antfu/import-dedupe': 'error',
      'antfu/no-import-dist': 'error',
      'antfu/no-import-node-modules-by-path': 'error',
    },
  }
}
