import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'

import type { RuleOptions } from '../eslint-typegen'
import type { ConfigOptions } from './utils'

type TypeWithGeneric<T> = T[]
type ExtractGeneric<Type> = Type extends TypeWithGeneric<infer X> ? X : never

export type CSpellOption = Exclude<ExtractGeneric<RuleOptions['@cspell/spellchecker']>, Linter.RuleLevel>
export interface Options {
  react?: 'vite' | 'remix' | 'next' | false
  strict?: boolean
  typeChecked?: boolean | 'essential'
  project?: string[] | string | boolean | null
  tsconfigRootDir?: string
  filesDisableTypeChecking?: string[]
  stylistic?: Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'semi'>
  restrictedSyntax?: Array<string | { selector: string, message?: string }>
  cspell?: Partial<CSpellOption> | boolean
}

export function mergeDefaultOptions(
  options?: Options & Pick<ConfigOptions, 'ignores' | 'ignoreFiles'>,
): Required<Options> {
  return {
    react: false,
    strict: false,
    typeChecked: 'essential',
    project: true,
    tsconfigRootDir: process.cwd(),
    filesDisableTypeChecking: [],
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },
    restrictedSyntax: [],
    cspell: false,
    ...options,
  }
}
