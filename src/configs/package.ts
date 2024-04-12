/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Linter } from "eslint";
import pluginJsonc from "eslint-plugin-jsonc";
import packageJson from "eslint-plugin-package-json/configs/recommended";

import type { Options } from "..";

export function packageConfig({ indent }: Required<Options>) {
	return [
		packageJson,
		{
			plugins: {
				jsonc: pluginJsonc as any,
			},
			rules: {
				"package-json/order-properties": "off",
				"package-json/sort-collections": "off",
				"jsonc/indent": ["warn", indent],
				"jsonc/sort-array-values": [
					"error",
					{
						order: { type: "asc" },
						pathPattern: "^files$",
					},
				],
				"jsonc/sort-keys": [
					"error",
					{
						order: [
							"publisher",
							"name",
							"displayName",
							"type",
							"version",
							"private",
							"packageManager",
							"description",
							"author",
							"license",
							"funding",
							"homepage",
							"repository",
							"bugs",
							"keywords",
							"categories",
							"sideEffects",
							"exports",
							"main",
							"module",
							"unpkg",
							"jsdelivr",
							"types",
							"typesVersions",
							"bin",
							"icon",
							"files",
							"engines",
							"activationEvents",
							"contributes",
							"scripts",
							"release-it",
							"peerDependencies",
							"peerDependenciesMeta",
							"dependencies",
							"optionalDependencies",
							"devDependencies",
							"pnpm",
							"overrides",
							"resolutions",
							"husky",
							"simple-git-hooks",
							"lint-staged",
							"eslintConfig",
						],
						pathPattern: "^$",
					},
					{
						order: { type: "asc" },
						pathPattern:
							"^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$",
					},
					{
						order: { type: "asc" },
						pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$",
					},
					{
						order: ["import", "require", "types", "default"],
						pathPattern: "^exports.*$",
					},
					{
						order: { type: "asc" },
						pathPattern: "scripts",
					},
				],
			},
		},
	] as Linter.FlatConfig[];
}
