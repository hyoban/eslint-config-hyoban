const { defineConfig } = await import('importx').then(x => x.import('./src/index.ts', {
  parentURL: import.meta.url, // *required

  // The following options are their default values
  cache: null, // false, if you want to always get a new module
  listDependencies: false, // true, if you need to get the list of dependencies
  loader: 'jiti', // most of the time, you don't need to change this as they will be chosen automatically
}))

export default defineConfig(
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
