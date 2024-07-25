import fs from 'node:fs/promises'

import { builtinRules } from 'eslint/use-at-your-own-risk'
import { flatConfigsToPlugins, pluginsToRulesDTS } from 'eslint-typegen/core'

import { defineConfig } from '../src'

const plugins = await flatConfigsToPlugins(
  [
    {
      plugins: {
        '': {
          // @ts-expect-error - wait for type to be updated
          rules: Object.fromEntries(builtinRules.entries()),
        },
      },
    },
    // @ts-expect-error - wait for type to be updated
    ...(await defineConfig({ react: 'vite', strict: true, typeChecked: true, tailwindCSS: true })),
  ],
)
const dts = await pluginsToRulesDTS(plugins)

await fs.writeFile('eslint-typegen.d.ts', dts)
