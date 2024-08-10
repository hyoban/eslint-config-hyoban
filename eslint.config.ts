import { defineConfig } from './src/index'

export default defineConfig(
  {
    react: 'vite',
    strict: true,
    typeChecked: true,
    fileCase: 'kebabCase',
    tailwindCSS: { order: false },
    unocss: true,
  },
  {
    name: 'project/disable',
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
