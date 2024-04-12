// ni -D prettier @ianvs/prettier-plugin-sort-imports prettier-plugin-packagejson

/** @type {import('@ianvs/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
	experimentalTernaries: true,
	useTabs: true,
	quoteProps: "consistent",
	overrides: [
		{
			files: "pnpm-lock.yaml",
			options: {
				requirePragma: true, // default: false
			},
		},
	],
	plugins: [
		"@ianvs/prettier-plugin-sort-imports",
		"prettier-plugin-packagejson",
	],
	importOrder: [
		"<BUILTIN_MODULES>",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		"^~/(.*)$",
		"",
		"^[.]",
	],
};

export default config;
