import type { Options } from '../option'
import type { LinterConfig } from '../utils'
import { interopDefault } from '../utils'

export function unocssConfig({ unocss }: Required<Options>) {
  if (!unocss)
    return

  return async () => {
    const unocss = await interopDefault(import ('@unocss/eslint-config/flat'))
    return unocss as unknown as LinterConfig
  }
}
