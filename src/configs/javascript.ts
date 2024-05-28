import js from '@eslint/js'
import type { Linter } from 'eslint'
import globals from 'globals'

import { GLOB_SRC } from '../consts'
import type { Options } from '../option'

export function javaScriptConfigs({
  strict,
  restrictedSyntax,
  linterOptions,
  settings,
}: Required<Options>): [Linter.FlatConfig, Linter.FlatConfig[]] {
  return [
    /// keep-sorted
    {
      files: GLOB_SRC,
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions,
      name: strict ? '@eslint/js/all' : '@eslint/js/recommended',
      rules: strict ? js.configs.all.rules : js.configs.recommended.rules,
      settings,
    },
    [
      // we can enabled in stylistic config if needed
      strict
        ? {
            /// keep-sorted
            rules: {
              'arrow-body-style': 'off',
              'curly': 'off',
              'func-style': 'off',
              'object-shorthand': 'off',
              'prefer-destructuring': 'off',
              'prefer-template': 'off',
            },
          }
        : {},
      // too opinionated, let this be decided by the user
      strict
        ? {
            /// keep-sorted
            rules: {
              'camelcase': 'off',
              'capitalized-comments': 'off',
              'complexity': 'off',
              'consistent-return': 'off',
              'id-length': 'off',
              'max-lines-per-function': 'off',
              'max-lines': 'off',
              'max-statements': 'off',
              'no-implicit-coercion': 'off',
              'no-inline-comments': 'off',
              'no-magic-numbers': 'off',
              'no-warning-comments': 'off',
            },
          }
        : {},
      // may not very useful
      strict
        ? {
            /// keep-sorted
            rules: {
              'init-declarations': 'off',
              'no-continue': 'off',
              'no-shadow': 'off',
              'no-ternary': 'off',
              'no-undefined': 'off',
              'no-underscore-dangle': 'off',
              'one-var': 'off',
              'prefer-named-capture-group': 'off',
              'require-unicode-regexp': 'off',
              'sort-keys': 'off',
              'sort-vars': 'off',
            },
          }
        : {},
      // change for more precise
      strict
        ? {
            /// keep-sorted
            rules: {
              'no-void': ['error', { allowAsStatement: true }],
            },
          }
        : {},
      // all rules here are nice to have, let's enable them
      {
        name: '@eslint/js/custom',
        /// keep-sorted
        rules: {
          // https://twitter.com/karlhorky/status/1773632485055680875
          'array-callback-return': 'error',
          'eqeqeq': ['error', 'smart'],
          'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],
          'no-console': ['error', { allow: ['warn', 'error'] }],
          // https://twitter.com/ryanflorence/status/1786394911895683512
          'no-param-reassign': 'error',
          'no-restricted-syntax': ['error', ...restrictedSyntax],
          'no-template-curly-in-string': 'error',
          'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
          'prefer-arrow-callback': ['error', { allowNamedFunctions: true, allowUnboundThis: true }],
        },
      },
    ],
  ]
}
