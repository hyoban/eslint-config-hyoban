import { defu } from 'defu'
import type { Linter } from 'eslint'

import type { CSpellOption, Options } from '../option'

export async function cspellConfig({ cspell }: Required<Options>): Promise<Linter.FlatConfig | undefined> {
  if (!cspell)
    return

  const cspellPlugin = await import('@cspell/eslint-plugin')
  let cspellOption: CSpellOption = {
    autoFix: false,
    generateSuggestions: true,
    numSuggestions: 8,
  }
  if (typeof cspell === 'object')
    cspellOption = defu(cspell as CSpellOption, cspellOption)

  return {
    name: 'cspell/recommended',
    plugins: { '@cspell': cspellPlugin },
    rules: {
      '@cspell/spellchecker': ['warn', cspellOption],
    },
  }
}
