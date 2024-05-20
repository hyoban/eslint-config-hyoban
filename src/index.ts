import '../eslint-typegen.d.ts'

import commandConfig from 'eslint-plugin-command/config'

import { importConfig } from './configs/imports'
import { jsonConfigs } from './configs/json'
import { reactConfigs } from './configs/react'
import { regexConfig } from './configs/regex'
import { stylisticConfigs } from './configs/stylistic'
import { typeScriptConfigs } from './configs/typescript'
import { unicornConfigs } from './configs/unicorn'
import { unusedConfig } from './configs/unused'
import type { Options } from './option'
import { mergeDefaultOptions } from './option'
import type { ConfigArray, ConfigOptions } from './utils'
import { config } from './utils'

export * from './consts'

export default async function hyoban(
  options?: Options & Pick<ConfigOptions, 'ignores' | 'ignoreFiles'>,
  ...args: ConfigArray
) {
  const finalOptions = mergeDefaultOptions(options)

  return config(
    {
      ignores: options?.ignores,
      ignoreFiles: options?.ignoreFiles,
      strict: finalOptions.strict,
    },
    [
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
          'no-restricted-syntax': [
            'error',
            'DebuggerStatement',
            'LabeledStatement',
            'WithStatement',
            // https://youtu.be/XTXPKbPcvl4?si=J_2E9dM25sAEXM2x
            'TSEnumDeclaration',
            'TSExportAssignment',
            ...finalOptions.restrictedSyntax,
          ],
          'no-template-curly-in-string': 'error',
          'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
          'prefer-arrow-callback': ['error', { allowNamedFunctions: true, allowUnboundThis: true }],
        },
      },
      finalOptions.strict
        ? {
            /// keep-sorted
            rules: {
              'camelcase': 'off',
              'capitalized-comments': 'off',
              'complexity': 'off',
              'consistent-return': 'off',
              'func-style': 'off',
              'id-length': 'off',
              'init-declarations': 'off',
              'max-lines-per-function': 'off',
              'max-statements': 'off',
              'no-duplicate-imports': 'off',
              'no-implicit-coercion': 'off',
              'no-inline-comments': 'off',
              'no-lonely-if': 'off',
              'no-magic-numbers': 'off',
              'no-shadow': 'off',
              'no-ternary': 'off',
              'no-undefined': 'off',
              'no-underscore-dangle': 'off',
              'no-useless-assignment': 'off',
              'no-warning-comments': 'off',
              'one-var': 'off',
              'prefer-named-capture-group': 'off',
              'require-unicode-regexp': 'off',
              // work with simple-import-sort
              'sort-imports': 'off',
              'sort-keys': 'off',
              'sort-vars': 'off',
            },
          }
        : {},
    ],
    ...unicornConfigs(),
    ...typeScriptConfigs(finalOptions),
    importConfig(),
    unusedConfig(),
    regexConfig(),
    commandConfig(),
    ...stylisticConfigs(finalOptions),
    ...jsonConfigs(finalOptions),
    ...reactConfigs(finalOptions),
    ...args,
  )
}
