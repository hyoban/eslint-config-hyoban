import type { OptionsFiles, OptionsOverrides, RuleOptions, TypedFlatConfigItem } from '@antfu/eslint-config'
import { GLOB_SRC, interopDefault } from '@antfu/eslint-config'

import type { OptionsTailwindcss } from '../types'

export async function tailwindcss(
  options: OptionsOverrides & OptionsFiles & OptionsTailwindcss = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_SRC],
    overrides = {},
    settings = {},
  } = options

  const tailwindCSSPlugin = await interopDefault(import('eslint-plugin-better-tailwindcss'))

  return [
    {
      name: 'hyoban/tailwindcss/setup',
      plugins: {
        tailwindcss: tailwindCSSPlugin,
      },
    },
    {
      files,
      name: 'hyoban/tailwindcss/rules',
      rules: {
        'tailwindcss/enforce-consistent-class-order': 'error',
        'tailwindcss/no-duplicate-classes': 'error',
        'tailwindcss/no-unnecessary-whitespace': 'error',
        'tailwindcss/no-unknown-classes': 'warn',
        ...overrides,
      } as Partial<RuleOptions>,
      settings: {
        'better-tailwindcss': settings,
      },
    },
  ]
}
