import { writeFileSync } from 'node:fs'

import { defineConfig } from 'cspell'

import { DEFAULT_GLOB_SRC, GLOB_EXCLUDE } from '../src/consts'

const config = defineConfig({
  words: [
    'antfu',
    'hyoban',
    'vitepress',
    'nuxt',
    'defu',
  ],
  ignorePaths: [
    ...GLOB_EXCLUDE,
    ...DEFAULT_GLOB_SRC,
  ],
})

writeFileSync(
  'cspell.json',
  `${JSON.stringify(
    {
      $schema: 'https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json',
      version: '0.2',
      ...config,
    },
    null,
    2,
  )}\n`,
)
