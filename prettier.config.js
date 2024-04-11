// ni -D prettier prettier-plugin-curly @ianvs/prettier-plugin-sort-imports

/** @type {import('@ianvs/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
	semi: false,
	singleQuote: true,
	useTabs: true,
	overrides: [
		{
			files: 'pnpm-lock.yaml',
			options: {
				requirePragma: true, // default: false
			},
		},
	],
	plugins: ['prettier-plugin-curly', '@ianvs/prettier-plugin-sort-imports'],
	importOrder: [
		'<BUILTIN_MODULES>',
		'',
		'<THIRD_PARTY_MODULES>',
		'',
		'^~/(.*)$',
		'',
		'^[.]',
	],
}

export default config
