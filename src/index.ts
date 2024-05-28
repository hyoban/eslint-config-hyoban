import '../eslint-typegen.d.ts'

import commandConfig from 'eslint-plugin-command/config'

import { cspellConfig } from './configs/cspell'
import { importConfig } from './configs/imports'
import { jsonConfigs } from './configs/json'
import { reactConfigs } from './configs/react'
import { regexConfig } from './configs/regex'
import { stylisticConfigs } from './configs/stylistic'
import { tailwindCSSConfig } from './configs/tailwindcss'
import { typeScriptConfigs } from './configs/typescript'
import { unicornConfigs } from './configs/unicorn'
import { unusedConfig } from './configs/unused'
import type { Options } from './option'
import { mergeDefaultOptions } from './option'
import type { ConfigArray } from './utils'
import { config } from './utils'

export * from './consts'

export default async function hyoban(
  options?: Options,
  ...args: ConfigArray
) {
  const finalOptions = mergeDefaultOptions(options)

  return config(
    finalOptions,
    [
      // all rules here are nice to have, let's enable them
      {
        name: '@eslint/js/custom',
        /// keep-sorted
        rules: {
          // https://twitter.com/karlhorky/status/1773632485055680875
          'array-callback-return': 'error',
          'eqeqeq': ['error', 'smart'],
          'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],
          'no-console': ['error', { allow: ['warn', 'error'] }],
          // https://twitter.com/ryanflorence/status/1786394911895683512
          'no-param-reassign': 'error',
          'no-restricted-syntax': ['error', ...finalOptions.restrictedSyntax],
          'no-template-curly-in-string': 'error',
          'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
          'prefer-arrow-callback': ['error', { allowNamedFunctions: true, allowUnboundThis: true }],
        },
      },
      // we can enabled in stylistic config if needed
      finalOptions.strict
        ? {
            /// keep-sorted
            rules: {
              'arrow-body-style': 'off',
              'curly': 'off',
              'func-style': 'off',
              'object-shorthand': 'off',
              'prefer-destructuring': 'off',
              'prefer-template': 'off',
            },
          }
        : {},
      // too opinionated, let this be decided by the user
      finalOptions.strict
        ? {
            /// keep-sorted
            rules: {
              'camelcase': 'off',
              'capitalized-comments': 'off',
              'complexity': 'off',
              'consistent-return': 'off',
              'id-length': 'off',
              'max-lines-per-function': 'off',
              'max-lines': 'off',
              'max-statements': 'off',
              'no-implicit-coercion': 'off',
              'no-inline-comments': 'off',
              'no-magic-numbers': 'off',
              'no-warning-comments': 'off',
            },
          }
        : {},
      // may not very useful
      finalOptions.strict
        ? {
            /// keep-sorted
            rules: {
              'init-declarations': 'off',
              'no-continue': 'off',
              'no-shadow': 'off',
              'no-ternary': 'off',
              'no-undefined': 'off',
              'no-underscore-dangle': 'off',
              'one-var': 'off',
              'prefer-named-capture-group': 'off',
              'require-unicode-regexp': 'off',
              'sort-keys': 'off',
              'sort-vars': 'off',

            },
          }
        : {},
      // change for more precise
      finalOptions.strict
        ? {
            /// keep-sorted
            rules: {
              'no-void': ['error', { allowAsStatement: true }],
            },
          }
        : {},
    ],
    ...unicornConfigs(finalOptions),
    ...typeScriptConfigs(finalOptions),
    importConfig(),
    unusedConfig(),
    regexConfig(),
    commandConfig(),
    cspellConfig(finalOptions),
    ...stylisticConfigs(finalOptions),
    ...jsonConfigs(finalOptions),
    ...reactConfigs(finalOptions),
    tailwindCSSConfig(finalOptions),
    ...args,
  )
}
