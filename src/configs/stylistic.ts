import stylistic from '@stylistic/eslint-plugin'
import type { UnifiedFlatConfig } from 'eslint-flat-config'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'

import type { Options } from '..'

export function stylisticConfig(style?: Options['style']) {
  if (style === false)
    return

  return [
    stylistic.configs.customize(style),
    {
      name: 'stylistic',
      rules: {
        '@stylistic/quotes': ['error', style?.quotes === 'double' ? 'double' : 'single'],
        '@stylistic/jsx-self-closing-comp': ['error', {
          component: true,
          html: true,
        }],
        '@stylistic/member-delimiter-style': ['error', {
          multiline: { delimiter: 'comma', requireLast: true },
          singleline: { delimiter: 'comma', requireLast: false },
          multilineDetection: 'brackets',
        }],
      },
    },
    {
      plugins: {
        antfu: eslintPluginAntfu,
      },
      rules: {
        'antfu/consistent-list-newline': 'error',
        'antfu/if-newline': 'error',
        'antfu/top-level-function': 'error',
        'curly': ['error', 'multi-or-nest', 'consistent'],
        'prefer-template': 'error',
        'prefer-destructuring': [
          'error',
          {
            array: false,
            object: true,
          },
        ],
      },
    },
    {
      plugins: {
        hyoban: pluginHyoban,
      },
      rules: {
        'hyoban/prefer-early-return': 'error',
        'hyoban/no-extra-space-jsx-expression': 'error',
      },
    },
  ] as UnifiedFlatConfig[]
}
