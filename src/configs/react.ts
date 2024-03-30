/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { UnifiedFlatConfig } from 'eslint-flat-config'

import { interopDefault } from '../utils'

const GLOB_TS = '**/*.?([cm])ts'
const GLOB_TSX = '**/*.?([cm])tsx'

export function reactConfigs(
  {
    react,
    typeChecked,
  }: {
    react: boolean,
    typeChecked?: boolean | 'essential',
  },
) {
  return [
    async () => {
      if (!react)
        return
      const eslintReact = await interopDefault(import('@eslint-react/eslint-plugin'))
      const config = eslintReact.configs.all
      return {
        name: 'react:basic',
        plugins: config.plugins,
        rules: {
          ...config.rules,
          '@eslint-react/naming-convention/filename': undefined,
          '@eslint-react/naming-convention/use-state': undefined,
          '@eslint-react/hooks-extra/ensure-use-memo-has-non-empty-deps': undefined,
          '@eslint-react/hooks-extra/ensure-use-callback-has-non-empty-deps': undefined,
        },
      } as UnifiedFlatConfig
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
  ]
}
