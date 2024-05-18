import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'

import type { ConfigOptions } from './utils'

export interface Options {
  react?: 'vite' | 'remix' | 'next' | false,
  strict?: boolean,
  typeChecked?: boolean | 'essential',
  project?: string[] | string | boolean | null,
  tsconfigRootDir?: string,
  filesDisableTypeChecking?: string[],
  stylistic?: Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'semi'>,
  restrictedSyntax?: Array<string | { selector: string, message?: string }>,
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
    ...options,
  }
}
