import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import defu from 'defu'
import type { Linter } from 'eslint'
import { isPackageExists } from 'local-pkg'
import { readPackageUp } from 'read-package-up'

import { DEFAULT_IGNORE_FILES, GLOB_EXCLUDE } from './consts'

/// keep-sorted
export type Options = {
  fileCase?: 'camelCase' | 'snakeCase' | 'kebabCase' | 'pascalCase' | false
  filesDisableTypeChecking?: string[]
  formatting?: false | Omit<StylisticCustomizeOptions, 'flat' | 'pluginName'> & { lineBreak?: 'after' | 'before' }
  ignoreFiles?: string[]
  ignores?: string[]
  lessOpinionated?: boolean
  preferESM?: boolean
  project?: string[] | string | boolean | null
  projectService?: boolean
  react?: 'vite' | 'remix' | 'next' | 'expo' | boolean
  restrictedSyntax?: Array<string | { selector: string, message?: string }>
  strict?: boolean
  tailwindCSS?: boolean | { order: boolean }
  tsconfigRootDir?: string
  typeChecked?: boolean | 'essential'
  unocss?: boolean
} & Pick<Linter.Config, 'linterOptions' | 'settings'>

export async function mergeDefaultOptions(
  options?: Options,
): Promise<Required<Options>> {
  const packageJson = await readPackageUp()
  const hasReact = isPackageExists('react')
  const hasVite = isPackageExists('vite')
  const hasRemix = isPackageExists('remix')
  const hasNext = isPackageExists('next')
  const hasExpo = isPackageExists('expo')
  const hasUnocss = isPackageExists('unocss')

  const hasTailwindCSS = isPackageExists('tailwindcss')

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
    react: hasNext ? 'next' : hasRemix ? 'remix' : hasExpo ? 'expo' : (hasVite && hasReact) ? 'vite' : hasReact,
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
                callees: ['classnames', 'clsx', 'ctl', 'cn'],
              },
            }
          : {}
      ),
    },
    strict: false,
    tailwindCSS: hasTailwindCSS,
    tsconfigRootDir: process.cwd(),
    typeChecked: false,
    unocss: hasUnocss,
  }

  return defu<Required<Options>, Options[]>(
    options,
    defaultOptions,
  )
}
