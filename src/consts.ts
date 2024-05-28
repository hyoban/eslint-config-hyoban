export const GLOB_TS_SRC = [
  '**/*.cts',
  '**/*.mts',
  '**/*.ts',
  '**/*.tsx',
]
export const GLOB_JS_SRC = [
  '**/*.cjs',
  '**/*.mjs',
  '**/*.js',
  '**/*.jsx',
]
export const GLOB_JSX_SRC = [
  '**/*.jsx',
  '**/*.tsx',
]
export const GLOB_SRC = [
  ...GLOB_TS_SRC,
  ...GLOB_JS_SRC,
]

export const GLOB_JSON = '**/*.json'
export const GLOB_SHOULD_BE_JSONC = [
  '**/tsconfig.json',
  '**/tsconfig.*.json',
  '**/.vscode/*.json',
]
export const GLOB_JSON5 = '**/*.json5'
export const GLOB_JSONC = '**/*.jsonc'
export const GLOB_JSON_SRC = [
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_JSONC,
]

export const GLOB_EXCLUDE = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  // eslint-disable-next-line @cspell/spellchecker
  '**/bun.lockb',

  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
  '**/eslint-typegen.d.ts',
]

export const DEFAULT_IGNORE_FILES = [
  '.gitignore',
  '.eslintignore',
]
