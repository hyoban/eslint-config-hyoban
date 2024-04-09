/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import stylistic from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'
import tseslint from 'typescript-eslint'

import type { Options } from '..'

export function stylisticConfigs(style?: Options['style']): Array<Linter.FlatConfig | Linter.FlatConfig[]> {
  if (style === false)
    return []

  return [
    [
      ...tseslint.configs.stylistic as any,
      {
        rules: {
          '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        },
      },
    ],
    [
      stylistic.configs.customize(style),
      {
        name: 'stylistic/base',
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
    ],
    {
      name: 'stylistic/extra',
      plugins: {
        antfu: eslintPluginAntfu,
        hyoban: pluginHyoban as any,
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

        'hyoban/prefer-early-return': 'error',
        'hyoban/no-extra-space-jsx-expression': 'error',
      },
    },
  ]
}
