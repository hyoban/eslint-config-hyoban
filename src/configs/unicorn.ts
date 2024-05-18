/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Linter } from 'eslint'
import pluginUnicorn from 'eslint-plugin-unicorn'

export function unicornConfigs() {
  return [
    [
      { name: 'unicorn/recommended' } satisfies Linter.FlatConfig,
      pluginUnicorn.configs['flat/recommended'] as Linter.FlatConfig,
    ],
    {
      name: 'unicorn/custom',
      /// keep-sorted
      rules: {
        // work with eslint-plugin-regexp
        'unicorn/better-regex': 'off',
        'unicorn/catch-error-name': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-await-expression-member': 'off',
        'unicorn/no-negated-condition': 'off',
        // https://github.com/sindresorhus/meta/discussions/7
        'unicorn/no-null': 'off',
        'unicorn/prefer-spread': 'off',
        // https://github.com/orgs/web-infra-dev/discussions/10
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/prevent-abbreviations': 'off',
      },
    } satisfies Linter.FlatConfig,
  ]
}
