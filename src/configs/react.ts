/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { UnifiedFlatConfig } from 'eslint-flat-config'

import { interopDefault } from '../utils'

const GLOB_TS = '**/*.?([cm])ts'
const GLOB_TSX = '**/*.?([cm])tsx'

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
          name: 'react:basic',
          rules: {
            '@eslint-react/naming-convention/filename': 'off',
            '@eslint-react/naming-convention/use-state': 'off',
            '@eslint-react/hooks-extra/ensure-use-memo-has-non-empty-deps': 'off',
            '@eslint-react/hooks-extra/ensure-use-callback-has-non-empty-deps': 'off',
          },
        },
      ] as UnifiedFlatConfig[]
    },
    () => {
      if (!react || !typeChecked)
        return

      return [
        {
          name: 'react:type-checked',
          files: [GLOB_TS, GLOB_TSX],
          rules: {
            '@eslint-react/no-leaked-conditional-rendering': 'error',
          },
        },
      ] as UnifiedFlatConfig[]
    },
    async () => {
      if (!react)
        return
      const reactHooks = await interopDefault(import('eslint-plugin-react-hooks'))
      return {
        name: 'react:hooks',
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
        name: 'react:next',
        plugins: {
          '@next/next': eslintPluginNext,
        },
        rules: {
          '@next/next/no-assign-module-variable': 'error',
        },
      } as UnifiedFlatConfig
    },
  ]
}
