// ni -D prettier prettier-plugin-curly

/** @type {import("prettier").Config} */
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
	plugins: ['prettier-plugin-curly'],
}

export default config
