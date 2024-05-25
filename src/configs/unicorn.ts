import type { Linter } from 'eslint'
import pluginUnicorn from 'eslint-plugin-unicorn'

import type { Options } from '../option'

export function unicornConfigs({ fileCase }: Required<Options>) {
  return [
    [
      { name: 'unicorn/recommended' } satisfies Linter.FlatConfig,
      pluginUnicorn.configs['flat/recommended'] as Linter.FlatConfig,
    ],
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
        'unicorn/prefer-spread': 'off',
        // https://github.com/orgs/web-infra-dev/discussions/10
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/prevent-abbreviations': 'off',
      },
    } satisfies Linter.FlatConfig,
  ]
}
