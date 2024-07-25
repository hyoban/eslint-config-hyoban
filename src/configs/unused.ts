import type { ESLint, Linter } from 'eslint'
import pluginUnusedImports from 'eslint-plugin-unused-imports'

export function unusedConfig(): Linter.Config {
  return {
    name: 'extend/unused',
    plugins: {
      'unused-imports': pluginUnusedImports as ESLint.Plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  }
}
