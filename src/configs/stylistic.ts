import pluginStylistic from '@stylistic/eslint-plugin'
import type { ESLint, Linter } from 'eslint'
import pluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'
import typescriptEslint from 'typescript-eslint'

import { GLOB_JSX_SRC, GLOB_TS_SRC } from '../consts'
import type { Options } from '../option'
import type { ConfigArray } from '../utils'

export function stylisticConfigs({ stylistic, typeChecked, lessOpinionated }: Required<Options>): ConfigArray {
  const jsxIgnoreNodes = [
    'TemplateLiteral *',
    'TSUnionType',
    'TSIntersectionType',
    'TSTypeParameterInstantiation',
    'FunctionExpression > .params[decorators.length > 0]',
    'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
  ]

  const nonJsxIgnoreNodes = [
    'JSXOpeningElement',
    'JSXClosingElement',
  ]

  const basicIndentRuleOptions = {
    ArrayExpression: 1,
    CallExpression: { arguments: 1 },
    flatTernaryExpressions: false,
    FunctionDeclaration: { body: 1, parameters: 1 },
    FunctionExpression: { body: 1, parameters: 1 },
    ignoreComments: false,
    ImportDeclaration: 1,
    MemberExpression: 1,
    ObjectExpression: 1,
    offsetTernaryExpressions: true,
    outerIIFEBody: 1,
    SwitchCase: 1,
    VariableDeclarator: 1,
  }

  return [
    (typeChecked === true
      ? typescriptEslint.configs.stylisticTypeChecked
      : typescriptEslint.configs.stylistic) as Linter.FlatConfig,
    {
      name: 'typescript-eslint/stylistic/custom',
      files: GLOB_TS_SRC,
      rules: {
        '@typescript-eslint/no-empty-function': 'off',

        ...(lessOpinionated
          ? {
              '@typescript-eslint/array-type': 'off',
              '@typescript-eslint/consistent-type-definitions': 'off',
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
      name: '@stylistic/shared',
      files: undefined,
      ...pluginStylistic.configs.customize(stylistic) as Linter.FlatConfig,
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
        '@stylistic/jsx-self-closing-comp': ['error', { component: true, html: true }],
        '@stylistic/max-statements-per-line': 'off',
        '@stylistic/multiline-ternary': ['error', 'always-multiline', { ignoreJSX: true }],
        '@stylistic/operator-linebreak': ['error', stylistic.lineBreak ?? 'before'],
        'antfu/consistent-list-newline': 'error',
        'hyoban/jsx-attribute-spacing': 'error',

        '@stylistic/jsx-indent': 'off',
        '@stylistic/indent': [
          'error',
          stylistic.indent,
          {
            ...basicIndentRuleOptions,
            ignoredNodes: [...jsxIgnoreNodes, ...nonJsxIgnoreNodes],
          },
        ],

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
    {
      files: GLOB_JSX_SRC,
      rules: {
        '@stylistic/indent': [
          'error',
          stylistic.indent,
          {
            ...basicIndentRuleOptions,
            ignoredNodes: jsxIgnoreNodes,
          },
        ],
      },
    },
  ]
}
