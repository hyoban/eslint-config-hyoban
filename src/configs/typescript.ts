import typescriptEslint from 'typescript-eslint'

import { GLOB_TS_SRC } from '../consts'
import type { Options } from '../option'
import type { LinterConfig } from '../utils'

export function typeScriptConfigs({
  strict,
  typeChecked,
  project,
  projectService,
  tsconfigRootDir,
  filesDisableTypeChecking,
  preferESM,
}: Required<Options>) {
  const typescriptPreset = strict
    ? (typeChecked === true
        ? typescriptEslint.configs.strictTypeChecked
        : typescriptEslint.configs.strict)
    : (typeChecked === true
        ? typescriptEslint.configs.recommendedTypeChecked
        : typescriptEslint.configs.recommended)

  return [
    typescriptEslint.configs.base as LinterConfig,
    [
      ...typescriptPreset,
      typeChecked && {
        languageOptions: {
          parserOptions: {
            project,
            projectService,
            tsconfigRootDir,
          },
        },
      },
    ] as LinterConfig[],
    [
      {
        name: 'typescript-eslint/custom',
        files: GLOB_TS_SRC,
        rules: {
          'no-use-before-define': 'off',

          '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
          '@typescript-eslint/no-import-type-side-effects': 'error',
          // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
          '@typescript-eslint/method-signature-style': ['error', 'property'],

          '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
          '@typescript-eslint/no-dynamic-delete': 'off',

          '@typescript-eslint/no-empty-object-type': [
            'error',
            {
              allowInterfaces: 'with-single-extends', // interface Derived extends Base {}
              allowObjectTypes: 'never',
              allowWithName: 'Props$',
            },
          ],
        },
      },
      strict
        ? {
            rules: {
              '@typescript-eslint/no-non-null-assertion': 'off',
            },
          }
        : {
            rules: {
              '@typescript-eslint/ban-ts-comment': 'off',
              '@typescript-eslint/no-explicit-any': 'off',
              '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
            },
          },
      !preferESM && {
        rules: {
          '@typescript-eslint/no-require-imports': 'off',
        },
      },
      typeChecked
      && (typeChecked === 'essential'
        ? {
            rules: {
              // https://youtu.be/OVNQWzdhCQA?si=PvPOOgtGW5H4uRB7
              '@typescript-eslint/await-thenable': 'error',
              '@typescript-eslint/no-floating-promises': 'error',
              '@typescript-eslint/no-misused-promises': [
                'error',
                {
                  checksVoidReturn: { arguments: false, attributes: false },
                },
              ],
            },
          }
        : {
            rules: {
              '@typescript-eslint/consistent-type-exports': 'error',
              '@typescript-eslint/no-misused-promises': [
                'error',
                {
                  checksVoidReturn: { arguments: false, attributes: false },
                },
              ],
              '@typescript-eslint/restrict-template-expressions': ['error', {}],
              '@typescript-eslint/no-deprecated': 'warn',
            },
          }),
    ] as LinterConfig[],
    () => {
      if (filesDisableTypeChecking.length === 0)
        return

      return {
        files: filesDisableTypeChecking,
        ...typescriptEslint.configs.disableTypeChecked,
      } as LinterConfig
    },
  ]
}
