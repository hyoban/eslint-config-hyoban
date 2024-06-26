import type { ESLint, Linter } from 'eslint'

import { GLOB_JSX_SRC, GLOB_TS_SRC } from '../consts'
import type { Options } from '../option'
import { interopDefault } from '../utils'

export function reactConfigs({
  react,
  strict,
  typeChecked,
  filesDisableTypeChecking,
}: Required<Options>) {
  if (!react)
    return []

  return [
    async () => {
      const eslintReact = await interopDefault(import('@eslint-react/eslint-plugin'))
      const config = strict ? eslintReact.configs.all : eslintReact.configs.recommended
      const reactHooks = await interopDefault(import('eslint-plugin-react-hooks')) as ESLint.Plugin
      const reactCompiler = await interopDefault(import('eslint-plugin-react-compiler')) as ESLint.Plugin
      const reactRefresh = await interopDefault(import('eslint-plugin-react-refresh')) as ESLint.Plugin

      return {
        name: `react/setup/${strict ? 'all' : 'recommended'}`,
        plugins: {
          ...(config.plugins as unknown as Record<string, ESLint.Plugin>),
          'react-compiler': reactCompiler,
          'react-hooks': reactHooks,
          'react-refresh': reactRefresh,
        },
      } satisfies Linter.FlatConfig
    },
    async () => {
      const eslintReact = await interopDefault(import('@eslint-react/eslint-plugin'))
      const config = strict ? eslintReact.configs.all : eslintReact.configs.recommended

      return {
        name: `react/${strict ? 'all' : 'recommended'}`,
        files: GLOB_TS_SRC,
        rules: config.rules,
      } satisfies Linter.FlatConfig
    },
    () => {
      if (strict) {
        return {
          name: 'react/all/custom',
          files: GLOB_TS_SRC,
          rules: {
            '@eslint-react/naming-convention/filename': 'off',
            '@eslint-react/naming-convention/use-state': 'off',
            '@eslint-react/hooks-extra/ensure-use-memo-has-non-empty-deps': 'off',
            '@eslint-react/hooks-extra/ensure-use-callback-has-non-empty-deps': 'off',
            '@eslint-react/avoid-shorthand-boolean': 'off',
            '@eslint-react/avoid-shorthand-fragment': 'off',
          },
        } satisfies Linter.FlatConfig
      }
      return {
        name: 'react/recommended/custom',
        files: GLOB_TS_SRC,
        rules: {
          '@eslint-react/hooks-extra/ensure-custom-hooks-using-other-hooks': 'error',
          '@eslint-react/no-unstable-context-value': 'warn',
        },
      } satisfies Linter.FlatConfig
    },
    () => {
      if (!typeChecked)
        return

      return {
        name: 'react/type-checked',
        files: GLOB_TS_SRC,
        ignores:
          filesDisableTypeChecking.length > 0
            ? filesDisableTypeChecking
            : undefined,
        rules: {
          '@eslint-react/no-leaked-conditional-rendering': 'error',
        },
      } satisfies Linter.FlatConfig
    },
    {
      name: 'react/official',
      files: GLOB_TS_SRC,
      /// keep-sorted
      rules: {
        'react-compiler/react-compiler': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
      },
    } satisfies Linter.FlatConfig,
    {
      name: 'react/refresh',
      files: GLOB_JSX_SRC,
      rules: {
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: react === 'vite',
            allowExportNames: react === 'next'
              ? [
                  'config',
                  'generateStaticParams',
                  'metadata',
                  'generateMetadata',
                  'viewport',
                  'generateViewport',
                ]
              : (react === 'remix'
                  ? [
                      'meta',
                      'links',
                      'headers',
                      'loader',
                      'action',
                    ]
                  : undefined),
          },
        ],
      },
    } satisfies Linter.FlatConfig,
  ]
}
