import fs from 'node:fs/promises'

import { builtinRules } from 'eslint/use-at-your-own-risk'
import { flatConfigsToPlugins, pluginsToRulesDTS } from 'eslint-typegen/core'

import { defineConfig } from '../src'

const plugins = await flatConfigsToPlugins(
  [
    {
      plugins: {
        '': {
          rules: Object.fromEntries(builtinRules.entries()),
        },
      },
    },
    ...(await defineConfig({ react: 'vite', strict: true, typeChecked: true, tailwindCSS: true })),
  ],
)
const dts = await pluginsToRulesDTS(plugins)

await fs.writeFile('eslint-typegen.d.ts', dts)
