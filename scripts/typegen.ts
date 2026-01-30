import fs from 'node:fs/promises'

import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { flatConfigsToPlugins, pluginsToRulesDTS } from 'eslint-typegen/core'

const plugins = await flatConfigsToPlugins([
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
  },
])
const dts = await pluginsToRulesDTS(plugins, { includeAugmentation: false })
await fs.writeFile('eslint-typegen.d.ts', dts)
