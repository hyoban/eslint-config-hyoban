import type { Linter } from 'eslint'
import pluginUnicorn from 'eslint-plugin-unicorn'

import type { Options } from '../option'

export function unicornConfigs({ fileCase, preferESM }: Required<Options>) {
  return [
    pluginUnicorn.configs.unopinionated,
    {
      name: 'unicorn/custom',
      rules: {
        'unicorn/filename-case': fileCase ? ['error', { case: fileCase }] : 'off',
        'unicorn/prefer-module': preferESM ? 'error' : 'off',

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

        'unicorn/no-array-sort': 'off',
        'unicorn/no-array-reverse': 'off',

        'unicorn/text-encoding-identifier-case': 'off',
      },
    } satisfies Linter.Config,
  ]
}
