import type { OptionsOverrides, TypedFlatConfigItem } from '@antfu/eslint-config'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_IN_MARKDOWN, interopDefault } from '@antfu/eslint-config'

export async function hyoban(
  options: OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    overrides = {},
  } = options

  const hyobanPlugin = await interopDefault(import('eslint-plugin-hyoban'))

  return [
    {
      name: 'hyoban/hyoban/setup',
      plugins: {
        hyoban: hyobanPlugin,
      },
    },
    {
      files: [GLOB_MARKDOWN, GLOB_MARKDOWN_IN_MARKDOWN],
      name: 'hyoban/hyoban/rules',
      rules: {
        'hyoban/md-consistent-table-width': 'error',
        'hyoban/md-one-sentence-per-line': 'error',
        ...overrides,
      },
    },
  ]
}
