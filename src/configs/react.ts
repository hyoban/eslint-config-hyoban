/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { UnifiedFlatConfig } from 'eslint-flat-config'

import { interopDefault } from '../utils'

export function react(
  {
    react,
    next,
    typeChecked,
  }: {
    react: boolean,
    next: boolean,
    typeChecked?: boolean | 'essential',
  },
) {
  return [
    async () => {
      if (!react)
        return
      const eslintReact = await interopDefault(import('@eslint-react/eslint-plugin'))
      return [
        eslintReact.configs.all,
        {
          rules: {
            '@eslint-react/naming-convention/filename': 'off',
            '@eslint-react/hooks-extra/ensure-use-memo-has-non-empty-deps': 'off',
            '@eslint-react/hooks-extra/ensure-use-callback-has-non-empty-deps': 'off',
          },
        },
        typeChecked
          ? {
              rules: {
                '@eslint-react/no-leaked-conditional-rendering': 'error',
              },
            }
          : {},
      ] as UnifiedFlatConfig[]
    },
    async () => {
      if (!react)
        return
      const reactHooks = await interopDefault(import('eslint-plugin-react-hooks'))
      return {
        plugins: {
          'react-hooks': reactHooks,
        },
        rules: reactHooks.configs.recommended.rules,
      } as UnifiedFlatConfig
    },
    async () => {
      if (!next)
        return
      const eslintPluginNext = await interopDefault(import('@next/eslint-plugin-next'))
      return {
        plugins: {
          '@next/next': eslintPluginNext,
        },
        rules: eslintPluginNext.configs.recommended.rules,
      } as UnifiedFlatConfig
    },
  ]
}
