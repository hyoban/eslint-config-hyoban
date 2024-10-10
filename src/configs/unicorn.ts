import type { Linter } from 'eslint'
import * as pluginUnicorn from 'eslint-plugin-unicorn'

import type { Options } from '../option'

export function unicornConfigs({ fileCase, strict, preferESM, formatting }: Required<Options>) {
  return [
    pluginUnicorn.configs['flat/recommended'],
    [
      strict
        ? {}
        : {
            /// keep-sorted
            rules: {
              'unicorn/no-negation-in-equality-check': 'off',
              'unicorn/prefer-add-event-listener': 'off',
              'unicorn/prefer-array-some': 'off',
              'unicorn/prefer-math-trunc': 'off',
              'unicorn/prefer-ternary': 'off',
              'unicorn/text-encoding-identifier-case': 'off',
            },
          },
      !preferESM && {
        rules: {
          'unicorn/prefer-module': 'off',
        },
      },
      !formatting && {
        rules: {
          'unicorn/template-indent': 'off',
          'unicorn/empty-brace-spaces': 'off',
          'unicorn/no-nested-ternary': 'off',
          'unicorn/number-literal-case': 'off',
        },
      },
      {
        name: 'unicorn/custom',
        rules: {
          // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1109#issuecomment-782689255
          'unicorn/consistent-destructuring': 'off',
          // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2341
          'unicorn/escape-case': 'off',
          'unicorn/no-hex-escape': 'off',
          // Buggy
          'unicorn/custom-error-definition': 'off',
          'unicorn/consistent-function-scoping': 'off',
          // Annoying
          'unicorn/no-keyword-prefix': 'off',

          'unicorn/prefer-global-this': 'off',
          'unicorn/catch-error-name': 'off',
          'unicorn/filename-case': !fileCase ? 'off' : ['error', { case: fileCase }],
          'unicorn/import-style': 'off',
          'unicorn/no-array-for-each': 'off',
          'unicorn/no-array-reduce': 'off',
          'unicorn/no-await-expression-member': 'off',
          'unicorn/no-negated-condition': 'off',
          'unicorn/no-nested-ternary': 'off',
          // https://github.com/sindresorhus/meta/discussions/7
          'unicorn/no-null': 'off',
          'unicorn/no-unreadable-array-destructuring': 'off',
          'unicorn/numeric-separators-style': 'off',
          'unicorn/prefer-spread': 'off',
          'unicorn/prefer-string-raw': 'off',
          // https://github.com/orgs/web-infra-dev/discussions/10
          'unicorn/prefer-top-level-await': 'off',
          'unicorn/prevent-abbreviations': 'off',
          // this is common in config files
          'unicorn/no-anonymous-default-export': 'off',
        },
      },
    ] satisfies Array<Linter.Config | boolean>,
  ]
}
