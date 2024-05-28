import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import defu from 'defu'
import type { Linter } from 'eslint'

import type { RuleOptions } from '../eslint-typegen'
import { DEFAULT_IGNORE_FILES, GLOB_EXCLUDE } from './consts'

type ExtractGeneric<Type> = Type extends Array<infer X> ? X : never
export type CSpellOption = Exclude<ExtractGeneric<RuleOptions['@cspell/spellchecker']>, Linter.RuleLevel | undefined>

/// keep-sorted
export type Options = {
  cspell?: Partial<CSpellOption> | boolean
  fileCase?: 'camelCase' | 'snakeCase' | 'kebabCase' | 'pascalCase' | false
  filesDisableTypeChecking?: string[]
  ignoreFiles?: string[]
  ignores?: string[]
  lessOpinionated?: boolean
  project?: string[] | string | boolean | null
  projectService?: boolean
  react?: 'vite' | 'remix' | 'next' | false
  restrictedSyntax?: Array<string | { selector: string, message?: string }>
  strict?: boolean
  stylistic?: Omit<StylisticCustomizeOptions, 'flat' | 'pluginName'>
  tailwindCSS?: boolean | { order: boolean }
  tsconfigRootDir?: string
  typeChecked?: boolean | 'essential'
} & Pick<Linter.FlatConfig, 'linterOptions' | 'settings'>

export function mergeDefaultOptions(
  options?: Options,
): Required<Options> {
  /// keep-sorted
  const defaultOptions: Required<Options> = {
    cspell: false,
    fileCase: 'kebabCase',
    filesDisableTypeChecking: [],
    ignoreFiles: DEFAULT_IGNORE_FILES,
    ignores: GLOB_EXCLUDE,
    lessOpinionated: false,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    project: false,
    projectService: true,
    react: false,
    restrictedSyntax: [
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
      // https://youtu.be/XTXPKbPcvl4?si=J_2E9dM25sAEXM2x
      'TSEnumDeclaration',
      'TSExportAssignment',
      ...(
        options?.react
          ? [
            // https://github.com/jsx-eslint/eslint-plugin-react/issues/2628#issuecomment-984160944
              {
                selector: 'ImportDeclaration[source.value=\'react\'][specifiers.0.type=\'ImportDefaultSpecifier\']',
                message: 'Default React import not allowed',
              },
            ]
          : []
      ),
    ],
    settings: {
      tailwindcss: {
        // eslint-disable-next-line @cspell/spellchecker
        callees: ['classnames', 'clsx', 'ctl', 'cn'],
      },
    },
    strict: false,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },
    tailwindCSS: false,
    tsconfigRootDir: process.cwd(),
    typeChecked: 'essential',
  }

  return defu<Required<Options>, Options[]>(
    options,
    defaultOptions,
  )
}
