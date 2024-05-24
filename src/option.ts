import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import defu from 'defu'
import type { Linter } from 'eslint'

import type { RuleOptions } from '../eslint-typegen'
import { DEFAULT_IGNORE_FILES, GLOB_EXCLUDE } from './consts'

type ExtractGeneric<Type> = Type extends Array<infer X> ? X : never
export type CSpellOption = Exclude<ExtractGeneric<RuleOptions['@cspell/spellchecker']>, Linter.RuleLevel | undefined>
export type Options = {
  react?: 'vite' | 'remix' | 'next' | false
  strict?: boolean
  typeChecked?: boolean | 'essential'
  project?: string[] | string | boolean | null
  tsconfigRootDir?: string
  filesDisableTypeChecking?: string[]
  stylistic?: Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'semi'>
  restrictedSyntax?: Array<string | { selector: string, message?: string }>
  cspell?: Partial<CSpellOption> | boolean
  ignores?: string[]
  ignoreFiles?: string[]
} & Pick<Linter.FlatConfig, 'linterOptions' | 'settings'>

export function mergeDefaultOptions(
  options?: Options,
): Required<Options> {
  return defu<Required<Options>, Options[]>(
    options,
    {
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
      restrictedSyntax: [
        'DebuggerStatement',
        'LabeledStatement',
        'WithStatement',
        // https://youtu.be/XTXPKbPcvl4?si=J_2E9dM25sAEXM2x
        'TSEnumDeclaration',
        'TSExportAssignment',
      ],
      cspell: false,
      ignores: GLOB_EXCLUDE,
      ignoreFiles: DEFAULT_IGNORE_FILES,
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      settings: {},
    },
    {
      restrictedSyntax: options?.react
        ? [
            // https://github.com/jsx-eslint/eslint-plugin-react/issues/2628#issuecomment-984160944
            {
              selector: 'ImportDeclaration[source.value=\'react\'][specifiers.0.type=\'ImportDefaultSpecifier\']',
              message: 'Default React import not allowed',
            },
          ]
        : [],
    },
  )
}
