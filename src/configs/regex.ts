import type { Linter } from 'eslint'
import * as regexpPlugin from 'eslint-plugin-regexp'

export function regexConfig(): Linter.FlatConfig[] {
  return [
    regexpPlugin.configs['flat/recommended'] as Linter.FlatConfig,
    { name: 'regexp/recommended' } satisfies Linter.FlatConfig,
  ]
}
