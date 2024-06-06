// @eslint-ts-patch-loader jiti

import hyoban from './src'

export default hyoban(
  {
    react: 'vite',
    strict: true,
    typeChecked: true,
    cspell: true,
    fileCase: 'kebabCase',
    tailwindCSS: { order: false },
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
