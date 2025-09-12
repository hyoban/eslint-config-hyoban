import type { ESLint, Linter } from 'eslint'

import { GLOB_JSX_SRC, GLOB_TS_SRC } from '../consts'
import type { Options } from '../option'
import { interopDefault } from '../utils'

function excludePlugins(object: any) {
  const { plugins, ...rest } = object
  return rest
}

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
      const reactRefresh = await interopDefault(import('eslint-plugin-react-refresh')) as ESLint.Plugin
      const reactGoogleTranslate = await interopDefault(import('eslint-plugin-react-google-translate')) as ESLint.Plugin
      const eslintReact = await interopDefault(import('@eslint-react/eslint-plugin'))
      const config = strict ? eslintReact.configs.all : eslintReact.configs.recommended
      const reactHooks = await interopDefault(import('eslint-plugin-react-hooks'))

      return {
        name: `react/setup/${strict ? 'all' : 'recommended'}`,
        plugins: {
          'react-refresh': reactRefresh,
          'react-google-translate': reactGoogleTranslate,
          'react-hooks': reactHooks,
          ...(config.plugins as unknown as Record<string, ESLint.Plugin>),
        },
      } satisfies Linter.Config
    },
    async () => {
      const eslintReact = await interopDefault(import('@eslint-react/eslint-plugin'))
      const config = strict ? eslintReact.configs.all : eslintReact.configs.recommended

      return {
        ...(excludePlugins(config)),
        name: `react/${strict ? 'all' : 'recommended'}`,
        files: GLOB_TS_SRC,
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
          '@eslint-react/naming-convention/use-state': 'off',
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
    async () => {
      const reactHooks = await interopDefault(import('eslint-plugin-react-hooks'))
      return {
        // @ts-expect-error type error
        ...(excludePlugins(reactHooks.configs.recommended)),
        name: 'react/official',
        files: GLOB_TS_SRC,
      } satisfies Linter.Config
    },
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
                  'dynamic',
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
    {
      name: 'react/google-translate',
      files: GLOB_JSX_SRC,
      rules: {
        'react-google-translate/no-conditional-text-nodes-with-siblings': 'warn',
        'react-google-translate/no-return-text-nodes': 'warn',
      },
    } satisfies Linter.Config,
  ]
}
