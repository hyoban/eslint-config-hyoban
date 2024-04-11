export const DEFAULT_GLOB_SRC = '**/*.?([cm])[jt]s?(x)'

export const GLOB_EXCLUDE = [
	'**/node_modules',
	'**/dist',
	'**/package-lock.json',
	'**/yarn.lock',
	'**/pnpm-lock.yaml',
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

	'**/CHANGELOG*.md',
	'**/*.min.*',
	'**/LICENSE*',
	'**/__snapshots__',
	'**/auto-import?(s).d.ts',
	'**/components.d.ts',
]

export const DEFAULT_IGNORE_FILES = ['.gitignore', '.eslintignore']
