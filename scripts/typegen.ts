import fs from 'node:fs/promises'

import md from 'eslint-markdown'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { flatConfigsToPlugins, pluginsToRulesDTS } from 'eslint-typegen/core'

const plugins = await flatConfigsToPlugins([
  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
      'simple-import-sort': simpleImportSort,
      md,
    },
  },
])
const dts = await pluginsToRulesDTS(plugins, { includeAugmentation: false })

const ruleOptionsMatch = dts.match(/export interface RuleOptions \{[\s\S]*?\n\}/)
const declarationsMatch = dts.match(/\/\* ======= Declarations ======= \*\/[\s\S]*/)

const ruleOptions = ruleOptionsMatch?.[0] ?? ''
const declarations = declarationsMatch?.[0] ?? ''

const output = `/* eslint-disable */
/* prettier-ignore */
import '@antfu/eslint-config'
import type { Linter } from 'eslint'

declare module '@antfu/eslint-config' {
${ruleOptions}
}

${declarations}
`

await fs.writeFile('eslint-typegen.d.ts', output)
