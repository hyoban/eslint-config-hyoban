import fs from 'node:fs/promises'

import md from 'eslint-markdown'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { flatConfigsToPlugins, pluginsToRulesDTS } from 'eslint-typegen/core'

const plugins = await flatConfigsToPlugins([
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      md,
    },
  },
])
const dts = await pluginsToRulesDTS(plugins, { includeAugmentation: false })
await fs.writeFile('eslint-typegen.d.ts', dts)
