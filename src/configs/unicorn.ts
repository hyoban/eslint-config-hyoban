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
      },
    } satisfies Linter.Config,
  ]
}
