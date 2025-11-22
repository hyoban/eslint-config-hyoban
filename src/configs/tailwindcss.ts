import { GLOB_TS_SRC } from '../consts'
import type { Options } from '../option'
import type { LinterConfig } from '../utils'
import { interopDefault } from '../utils'

export function tailwindCSSConfig({ tailwindCSS }: Required<Options>) {
  if (!tailwindCSS)
    return
  process.env.TAILWIND_MODE = 'build'

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
    ] as LinterConfig[]
  }
}
