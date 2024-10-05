import type { Linter } from 'eslint'
import * as regexpPlugin from 'eslint-plugin-regexp'

export function regexConfig(): Linter.Config[] {
  return [
    regexpPlugin.configs['flat/recommended'] as Linter.Config,
    {
      name: 'regexp/recommended',
    } satisfies Linter.Config,
  ]
}
