import pluginStylistic from '@stylistic/eslint-plugin'
import type { ESLint } from 'eslint'
import pluginAntfu from 'eslint-plugin-antfu'
import pluginHyoban from 'eslint-plugin-hyoban'
import typescriptEslint from 'typescript-eslint'

import { GLOB_JSX_SRC, GLOB_TS_SRC } from '../consts'
import type { Options } from '../option'
import type { ConfigArray, LinterConfig } from '../utils'

function formattingConfigs({ formatting, lessOpinionated }: Required<Options>): ConfigArray {
  if (!formatting) {
    return []
  }

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
        '@stylistic/indent': [
          'error',
          formatting.indent,
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
            }
        ),
      },
    },
    {
      files: GLOB_JSX_SRC,
      rules: {
        '@stylistic/indent': [
          'error',
          formatting.indent,
          {
            ...basicIndentRuleOptions,
            ignoredNodes: jsxIgnoreNodes,
          },
        ],
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
