import type { Linter } from 'eslint'
import pluginUnicorn from 'eslint-plugin-unicorn'

import type { Options } from '../option'

export function unicornConfigs({ fileCase, strict, preferESM }: Required<Options>) {
  return [
    pluginUnicorn.configs[strict ? 'flat/all' : 'flat/recommended'],
    [
      strict
        ? {
            rules: {
              'unicorn/no-keyword-prefix': 'off',
            },
          }
        : {
            /// keep-sorted
            rules: {
              'unicorn/consistent-function-scoping': 'warn',
              'unicorn/no-negation-in-equality-check': 'off',
              'unicorn/prefer-add-event-listener': 'off',
              'unicorn/prefer-array-some': 'off',
              'unicorn/prefer-ternary': 'off',
              'unicorn/text-encoding-identifier-case': 'off',
            },
          },
      !preferESM && {
        rules: {
          'unicorn/prefer-module': 'off',
        },
      },
      {
        name: 'unicorn/custom',
        /// keep-sorted
        rules: {
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
          'unicorn/prefer-spread': 'off',
          // https://github.com/orgs/web-infra-dev/discussions/10
          'unicorn/prefer-top-level-await': 'off',
          'unicorn/prevent-abbreviations': 'off',
        },
      },
    ] satisfies Array<Linter.FlatConfig | boolean>,
  ]
}
