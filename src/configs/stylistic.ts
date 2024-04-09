import stylistic from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'
import tseslint from 'typescript-eslint'

import type { Options } from '..'

export function stylisticConfigs(style?: Options['style']) {
  if (style === false)
    return []

  return [
    tseslint.configs.stylistic,
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
        hyoban: pluginHyoban,
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
  ] as Linter.FlatConfig[]
}
