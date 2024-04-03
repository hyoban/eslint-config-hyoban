/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Linter } from 'eslint'

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
      const { rules } = config
      for (const rule of [
        '@eslint-react/naming-convention/filename',
        '@eslint-react/naming-convention/use-state',
        '@eslint-react/hooks-extra/ensure-use-memo-has-non-empty-deps',
        '@eslint-react/hooks-extra/ensure-use-callback-has-non-empty-deps',
      ])
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete rules[rule]

      return {
        name: 'react:basic',
        plugins: config.plugins,
        rules: config.rules,
      } as Linter.FlatConfig
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
      ] as Linter.FlatConfig
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
      } as Linter.FlatConfig
    },
  ]
}
