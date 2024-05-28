import pluginStylistic from '@stylistic/eslint-plugin'
import type { ESLint, Linter } from 'eslint'
import pluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'
import typescriptEslint from 'typescript-eslint'

import { GLOB_TS_SRC } from '../consts'
import type { Options } from '../option'

export function stylisticConfigs({ stylistic, typeChecked, lessOpinionated }: Required<Options>) {
  return [
    typeChecked === true
      ? typescriptEslint.configs.stylisticTypeChecked
      : typescriptEslint.configs.stylistic,
    {
      name: 'typescript-eslint/stylistic/custom',
      files: GLOB_TS_SRC,
      rules: {
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    typeChecked && {
      name: 'typescript-eslint/stylistic-type-checked/custom',
      files: GLOB_TS_SRC,
      rules: {
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
      },
    },
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
        'arrow-body-style': 'error',
        'object-shorthand': 'error',
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
        'prefer-template': 'error',
        '@stylistic/jsx-self-closing-comp': [
          'error',
          {
            component: true,
            html: true,
          },
        ],
        'antfu/consistent-list-newline': 'error',
        'hyoban/jsx-attribute-spacing': 'error',

        ...(lessOpinionated
          ? {
              curly: ['error', 'multi-line', 'consistent'],
            }
          : {
              'antfu/curly': 'error',
              'antfu/if-newline': 'error',
              'antfu/top-level-function': 'error',
              'hyoban/prefer-early-return': 'error',
            }
        ),
      },
    },
  ] as Linter.FlatConfig[]
}
