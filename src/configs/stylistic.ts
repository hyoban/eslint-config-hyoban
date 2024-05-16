import pluginStylistic from '@stylistic/eslint-plugin'
import type { ESLint, Linter } from 'eslint'
import pluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'
import tseslint from 'typescript-eslint'

import type { Options } from '..'
import { DEFAULT_GLOB_TS_SRC } from '../consts'

export function stylisticConfigs({ stylistic }: Required<Options>) {
  return [
    tseslint.configs.stylistic,
    [
      {
        name: 'typescript-eslint/stylistic/custom',
        files: DEFAULT_GLOB_TS_SRC,
        rules: {
          '@typescript-eslint/array-type': [
            'error',
            { default: 'array-simple' },
          ],
        },
      },
    ],
    {
      name: '@stylistic/shared',
      ...pluginStylistic.configs.customize(stylistic),
    },
    {
      name: '@stylistic/customize',
      plugins: {
        'antfu': pluginAntfu,
        'hyoban': pluginHyoban as unknown as ESLint.Plugin,
        '@stylistic': pluginStylistic,
      },
      rules: {
        '@stylistic/quotes': [
          'error',
          stylistic.quotes === 'double' ? 'double' : 'single',
        ],
        '@stylistic/jsx-self-closing-comp': [
          'error',
          {
            component: true,
            html: true,
          },
        ],
        '@stylistic/member-delimiter-style': [
          'error',
          {
            multiline: { delimiter: 'comma', requireLast: true },
            singleline: { delimiter: 'comma', requireLast: false },
            multilineDetection: 'brackets',
          },
        ],
        'curly': ['error', 'multi-or-nest', 'consistent'],
        'prefer-template': 'error',
        'prefer-destructuring': [
          'error',
          {
            array: false,
            object: true,
          },
        ],
        'object-shorthand': 'error',
        'arrow-body-style': ['error', 'as-needed'],

        'antfu/consistent-list-newline': 'error',
        'antfu/if-newline': 'error',
        'antfu/top-level-function': 'error',

        'hyoban/prefer-early-return': 'error',
        'hyoban/jsx-attribute-spacing': 'error',
      },
    },
  ] as Linter.FlatConfig[]
}
