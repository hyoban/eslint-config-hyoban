import type { Linter } from 'eslint'

import { GLOB_TS_SRC } from '../consts'
import type { Options } from '../option'
import { interopDefault } from '../utils'

export function tailwindCSSConfig({ tailwindCSS }: Required<Options>) {
  if (!tailwindCSS)
    return

  return async () => {
    const tailwind = await interopDefault(import ('eslint-plugin-tailwindcss'))
    return [
      ...tailwind.configs['flat/recommended'],
      {
        name: 'tailwindcss/recommended',
        files: GLOB_TS_SRC,
      },
      typeof tailwindCSS === 'object' && !tailwindCSS.order && {
        rules: {
          'tailwindcss/classnames-order': 'off',
        },
      },
    ] as Linter.FlatConfig[]
  }
}
