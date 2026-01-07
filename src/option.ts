import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { ParserOptions } from '@typescript-eslint/types'
import defu from 'defu'
import { isPackageExists } from 'local-pkg'
import { readPackageUp } from 'read-package-up'

import { DEFAULT_IGNORE_FILES, GLOB_EXCLUDE } from './consts'
import type { LinterConfig } from './utils'

/// keep-sorted
export type Options = {
  fileCase?: 'camelCase' | 'snakeCase' | 'kebabCase' | 'pascalCase' | false
  filesDisableTypeChecking?: string[]
  formatting?: false | Omit<StylisticCustomizeOptions, 'flat' | 'pluginName'> & { lineBreak?: 'after' | 'before' }
  ignoreFiles?: string[]
  ignores?: string[]
  lessOpinionated?: boolean
  preferESM?: boolean
  project?: ParserOptions['project']
  projectService?: ParserOptions['projectService']
  react?: 'waku' | 'vite' | 'remix' | 'next' | 'expo' | boolean
  reactCompiler?: boolean | 'warn'
  restrictedSyntax?: Array<string | { selector: string, message?: string }>
  strict?: boolean
  tsconfigRootDir?: string
  typeChecked?: boolean | 'essential'
} & Pick<LinterConfig, 'linterOptions' | 'settings'>

export async function mergeDefaultOptions(
  options?: Options,
): Promise<Required<Options>> {
  const packageJson = await readPackageUp()
  const hasReact = isPackageExists('react')
  const hasVite = isPackageExists('vite')
  const hasRemix = isPackageExists('remix')
  const hasNext = isPackageExists('next')
  const hasExpo = isPackageExists('expo')
  const hasWaku = isPackageExists('waku')

  /// keep-sorted
  const defaultOptions: Required<Options> = {
    fileCase: false,
    filesDisableTypeChecking: [],
    formatting: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },
    ignoreFiles: DEFAULT_IGNORE_FILES,
    ignores: GLOB_EXCLUDE,
    lessOpinionated: false,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    preferESM: packageJson?.packageJson.type === 'module',
    project: !!options?.typeChecked,
    projectService: false,
    react: hasWaku ? 'waku' : hasNext ? 'next' : hasRemix ? 'remix' : hasExpo ? 'expo' : (hasVite && hasReact) ? 'vite' : hasReact,
    reactCompiler: false,
    restrictedSyntax: [
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
      // https://www.typescriptlang.org/docs/handbook/enums.html#const-enums
      // https://youtu.be/XTXPKbPcvl4?si=J_2E9dM25sAEXM2x
      'TSEnumDeclaration[const=true]',
      'TSExportAssignment',
    ],
    settings: {},
    strict: false,
    tsconfigRootDir: process.cwd(),
    typeChecked: false,
  }

  return defu<Required<Options>, Options[]>(
    options,
    defaultOptions,
  )
}
