import pluginStylistic from '@stylistic/eslint-plugin'
import type { ESLint, Linter } from 'eslint'
import pluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'
import tseslint from 'typescript-eslint'

import { DEFAULT_GLOB_TS_SRC } from '../consts'
import type { Options } from '../option'

export function stylisticConfigs({ stylistic, typeChecked }: Required<Options>) {
  return [
    typeChecked === true
      ? tseslint.configs.stylisticTypeChecked
      : tseslint.configs.stylistic,
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
      files: undefined,
      ...pluginStylistic.configs.customize(stylistic),
    },
    {
      name: '@stylistic/customize',
      files: undefined,
      plugins: {
        'antfu': pluginAntfu,
        'hyoban': pluginHyoban as unknown as ESLint.Plugin,
        '@stylistic': pluginStylistic,
      },
      rules: {
        '@stylistic/jsx-self-closing-comp': [
          'error',
          {
            component: true,
            html: true,
          },
        ],
        'curly': ['error', 'multi-or-nest', 'consistent'],
        'prefer-template': 'error',
        'prefer-destructuring': [
          'error',
          {
            VariableDeclarator: {
              array: false,
              object: true,
            },
            AssignmentExpression: {
              array: false,
              object: false,
            },
          },
          {
            enforceForRenamedProperties: false,
          },
        ],
        'object-shorthand': 'error',
        'arrow-body-style': 'error',

        'antfu/consistent-list-newline': 'error',
        'antfu/if-newline': 'error',
        'antfu/top-level-function': 'error',

        'hyoban/prefer-early-return': 'error',
        'hyoban/jsx-attribute-spacing': 'error',
      },
    },
  ] as Linter.FlatConfig[]
}
