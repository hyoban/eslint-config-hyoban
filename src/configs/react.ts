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
      } satisfies Linter.Config
    },
    async () => {
      const eslintReact = await interopDefault(import('@eslint-react/eslint-plugin'))
      const config = strict ? eslintReact.configs.all : eslintReact.configs.recommended

      return {
        name: `react/${strict ? 'all' : 'recommended'}`,
        files: GLOB_TS_SRC,
        rules: config.rules,
      } satisfies Linter.Config
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
            '@eslint-react/prefer-react-namespace-import': 'warn',
          },
        } satisfies Linter.Config
      }
      return {
        name: 'react/recommended/custom',
        files: GLOB_TS_SRC,
        rules: {
          '@eslint-react/hooks-extra/ensure-custom-hooks-using-other-hooks': 'warn',
          '@eslint-react/no-unstable-context-value': 'warn',
          '@eslint-react/dom/no-dangerously-set-innerhtml': 'off',
          // https://github.com/jsx-eslint/eslint-plugin-react/issues/2628#issuecomment-984160944
          // {
          //   selector: 'ImportDeclaration[source.value=\'react\'][specifiers.0.type=\'ImportDefaultSpecifier\']',
          //   message: 'Default React import not allowed, use import * as React from \'react\'',
          // },
          '@eslint-react/prefer-react-namespace-import': 'warn',
        },
      } satisfies Linter.Config
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
      } satisfies Linter.Config
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
    } satisfies Linter.Config,
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
                  : react === 'expo'
                    ? [
                        'unstable_settings',
                      ]
                    : undefined),
          },
        ],
      },
    } satisfies Linter.Config,
  ]
}
