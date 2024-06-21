import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import defu from 'defu'
import type { Linter } from 'eslint'
import { isPackageExists } from 'local-pkg'
import { readPackageUp } from 'read-package-up'

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
  preferESM?: boolean
  project?: string[] | string | boolean | null
  projectService?: boolean
  react?: 'vite' | 'remix' | 'next' | boolean
  restrictedSyntax?: Array<string | { selector: string, message?: string }>
  strict?: boolean
  stylistic?: Omit<StylisticCustomizeOptions, 'flat' | 'pluginName'> & { lineBreak?: 'after' | 'before' }
  tailwindCSS?: boolean | { order: boolean }
  tsconfigRootDir?: string
  typeChecked?: boolean | 'essential'
} & Pick<Linter.FlatConfig, 'linterOptions' | 'settings'>

export async function mergeDefaultOptions(
  options?: Options,
): Promise<Required<Options>> {
  const packageJson = await readPackageUp()
  const hasReact = isPackageExists('react')
  const hasVite = isPackageExists('vite')
  const hasRemix = isPackageExists('remix')
  const hasNext = isPackageExists('next')

  const hasTailwindCSS = isPackageExists('tailwindcss')

  /// keep-sorted
  const defaultOptions: Required<Options> = {
    cspell: false,
    fileCase: false,
    filesDisableTypeChecking: [],
    ignoreFiles: DEFAULT_IGNORE_FILES,
    ignores: GLOB_EXCLUDE,
    lessOpinionated: false,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    preferESM: packageJson?.packageJson.type === 'module',
    project: !!options?.typeChecked,
    projectService: false,
    react: hasNext ? 'next' : hasRemix ? 'remix' : (hasVite && hasReact) ? 'vite' : hasReact,
    restrictedSyntax: [
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
      // https://www.typescriptlang.org/docs/handbook/enums.html#const-enums
      // https://youtu.be/XTXPKbPcvl4?si=J_2E9dM25sAEXM2x
      'TSEnumDeclaration[const=true]',
      'TSExportAssignment',
      // https://github.com/jsx-eslint/eslint-plugin-react/issues/2628#issuecomment-984160944
      {
        selector: 'ImportDeclaration[source.value=\'react\'][specifiers.0.type=\'ImportDefaultSpecifier\']',
        message: 'Default React import not allowed, use import * as React from \'react\'',
      },
    ],
    settings: {
      ...(
        hasTailwindCSS
          ? {
              tailwindcss: {
                // eslint-disable-next-line @cspell/spellchecker
                callees: ['classnames', 'clsx', 'ctl', 'cn'],
              },
            }
          : {}
      ),
    },
    strict: false,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },
    tailwindCSS: hasTailwindCSS,
    tsconfigRootDir: process.cwd(),
    typeChecked: false,
  }

  return defu<Required<Options>, Options[]>(
    options,
    defaultOptions,
  )
}
