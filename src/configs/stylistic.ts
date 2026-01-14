import pluginStylistic from '@stylistic/eslint-plugin'
import type { ESLint } from 'eslint'
import pluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'
import typescriptEslint from 'typescript-eslint'

import { GLOB_TS_SRC } from '../consts'
import type { Options } from '../option'
import type { ConfigArray, LinterConfig } from '../utils'

function formattingConfigs({ formatting, lessOpinionated }: Required<Options>): ConfigArray {
  if (!formatting) {
    return []
  }

  return [
    {
      name: '@stylistic/shared',
      files: undefined,
      ...pluginStylistic.configs.customize(formatting),
    },
    {
      name: '@stylistic/customize',
      files: undefined,
      plugins: {
        'antfu': pluginAntfu,
        'hyoban': pluginHyoban as unknown as ESLint.Plugin,
        '@stylistic': pluginStylistic as unknown as ESLint.Plugin,
      },
      rules: {
        '@stylistic/quotes': ['error', formatting.quotes, { allowTemplateLiterals: 'always', avoidEscape: true }],
        '@stylistic/max-statements-per-line': 'off',
        '@stylistic/multiline-ternary': ['error', 'always-multiline', { ignoreJSX: true }],
        '@stylistic/operator-linebreak': ['error', formatting.lineBreak ?? 'before'],
        '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-line' }],
        'antfu/consistent-chaining': 'error',
        'antfu/consistent-list-newline': 'error',
        'hyoban/jsx-attribute-spacing': 'error',

        '@stylistic/no-tabs': 'off',
        '@stylistic/jsx-indent-props': 'off',

        ...(lessOpinionated
          ? {
              curly: ['error', 'multi-line', 'consistent'],
            }
          : {
              'antfu/curly': 'error',
              'antfu/if-newline': 'error',
            }
        ),
      },
    },
  ]
}

export function stylisticConfigs(options: Required<Options>): ConfigArray {
  const { typeChecked, lessOpinionated } = options
  return [
    ...formattingConfigs(options),
    (typeChecked === true
      ? typescriptEslint.configs.stylisticTypeChecked
      : typescriptEslint.configs.stylistic) as LinterConfig,
    {
      name: 'typescript-eslint/stylistic/custom',
      files: GLOB_TS_SRC,
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',

        ...(lessOpinionated
          ? {
              '@typescript-eslint/array-type': 'off',
            }
          : {
              '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
            }
        ),
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
      name: '@stylistic/customize',
      files: undefined,
      plugins: {
        'antfu': pluginAntfu,
        'hyoban': pluginHyoban as unknown as ESLint.Plugin,
        '@stylistic': pluginStylistic as unknown as ESLint.Plugin,
      },
      rules: {
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
        '@stylistic/jsx-self-closing-comp': ['error', { component: true, html: true }],
        ...(lessOpinionated
          ? {}
          : {
              'antfu/top-level-function': 'error',
              'hyoban/prefer-early-return': 'error',
            }
        ),
      },
    },
  ]
}
