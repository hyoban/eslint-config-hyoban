import * as regexpPlugin from 'eslint-plugin-regexp'

import type { LinterConfig } from '../utils'

export function regexConfig(): LinterConfig[] {
  return [
    regexpPlugin.configs['flat/recommended'] as LinterConfig,
    {
      name: 'regexp/recommended',
    } satisfies LinterConfig,
  ]
}
