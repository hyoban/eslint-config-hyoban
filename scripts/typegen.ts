import fs from 'node:fs/promises'

import type { ESLint } from 'eslint'
import md from 'eslint-markdown'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import eslintPluginHyoban from 'eslint-plugin-hyoban'
import markdownPreferences from 'eslint-plugin-markdown-preferences'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { flatConfigsToPlugins, pluginsToRulesDTS } from 'eslint-typegen/core'

const plugins = await flatConfigsToPlugins([
  {
    plugins: {
      'tailwindcss': eslintPluginBetterTailwindcss,
      'import-sort': simpleImportSort,
      'hyoban': eslintPluginHyoban as ESLint.Plugin,
      'md': md as ESLint.Plugin,
      'markdown-preferences': markdownPreferences as ESLint.Plugin,
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
