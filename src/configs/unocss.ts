import type { Linter } from 'eslint'

import type { Options } from '../option'
import { interopDefault } from '../utils'

export function unocssConfig({ unocss }: Required<Options>) {
  if (!unocss)
    return

  return async () => {
    const unocss = await interopDefault(import ('@unocss/eslint-config/flat'))
    return unocss as unknown as Linter.Config
  }
}
