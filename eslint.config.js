const { defineConfig } = await import('importx').then(x => x.import('./src/index.ts', import.meta.url))

export default defineConfig(
  {
    react: 'vite',
    strict: true,
    typeChecked: true,
    cspell: true,
    fileCase: 'kebabCase',
    tailwindCSS: { order: false },
    unoCSS: true,
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
