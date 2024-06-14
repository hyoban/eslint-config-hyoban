declare module 'eslint-plugin-unicorn' {
  import type { ESLint, Linter } from 'eslint'

  declare const eslintPluginUnicorn: ESLint.Plugin & {
    configs: {
      'flat/all': Linter.FlatConfig
      'flat/recommended': Linter.FlatConfig
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  export = eslintPluginUnicorn
}
declare module 'eslint-plugin-react-hooks'
declare module 'eslint-plugin-react-refresh'
declare module 'eslint-plugin-react-compiler'
declare module 'eslint-plugin-unused-imports'
declare module 'eslint-plugin-tailwindcss'
