import '../eslint-typegen.d.ts'

import commandConfig from 'eslint-plugin-command/config'

import { cspellConfig } from './configs/cspell'
import { importConfig } from './configs/imports'
import { javaScriptConfigs } from './configs/javascript'
import { jsonConfigs } from './configs/json'
import { reactConfigs } from './configs/react'
import { regexConfig } from './configs/regex'
import { stylisticConfigs } from './configs/stylistic'
import { tailwindCSSConfig } from './configs/tailwindcss'
import { typeScriptConfigs } from './configs/typescript'
import { unicornConfigs } from './configs/unicorn'
import { unusedConfig } from './configs/unused'
import type { Options } from './option'
import { mergeDefaultOptions } from './option'
import type { ConfigArray } from './utils'
import { config } from './utils'

export * from './consts'

export async function defineConfig(
  options?: Options,
  ...args: ConfigArray
) {
  const finalOptions = mergeDefaultOptions(options)

  return config(
    finalOptions,
    ...javaScriptConfigs(finalOptions),
    ...unicornConfigs(finalOptions),
    ...typeScriptConfigs(finalOptions),
    importConfig(),
    unusedConfig(),
    regexConfig(),
    commandConfig(),
    cspellConfig(finalOptions),
    ...stylisticConfigs(finalOptions),
    ...jsonConfigs(finalOptions),
    ...reactConfigs(finalOptions),
    tailwindCSSConfig(finalOptions),
    ...args,
  )
}
