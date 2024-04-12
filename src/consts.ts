export const DEFAULT_GLOB_TS_SRC = [
	"**/*.cts",
	"**/*.mts",
	"**/*.ts",
	"**/*.tsx",
];

export const DEFAULT_GLOB_JS_SRC = [
	"**/*.cjs",
	"**/*.mjs",
	"**/*.js",
	"**/*.jsx",
];

export const DEFAULT_GLOB_SRC = [
	...DEFAULT_GLOB_TS_SRC,
	...DEFAULT_GLOB_JS_SRC,
];

export const GLOB_EXCLUDE = [
	"**/node_modules",
	"**/dist",
	"**/package-lock.json",
	"**/yarn.lock",
	"**/pnpm-lock.yaml",
	"**/bun.lockb",

	"**/output",
	"**/coverage",
	"**/temp",
	"**/.temp",
	"**/tmp",
	"**/.tmp",
	"**/.history",
	"**/.vitepress/cache",
	"**/.nuxt",
	"**/.next",
	"**/.vercel",
	"**/.changeset",
	"**/.idea",
	"**/.cache",
	"**/.output",
	"**/.vite-inspect",
	"**/.yarn",

	"**/CHANGELOG*.md",
	"**/*.min.*",
	"**/LICENSE*",
	"**/__snapshots__",
	"**/auto-import?(s).d.ts",
	"**/components.d.ts",
];

export const DEFAULT_IGNORE_FILES = [".gitignore", ".eslintignore"];
