import { writeFileSync } from 'node:fs'

import { defineConfig } from 'cspell'

import { GLOB_EXCLUDE, GLOB_SRC } from '../src/consts'

const config = defineConfig({
  words: [
    'antfu',
    'hyoban',
    'vitepress',
    'nuxt',
    'defu',
    'jiti',
    'importx',
  ],
  ignorePaths: [
    ...GLOB_EXCLUDE,
    ...GLOB_SRC,
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
