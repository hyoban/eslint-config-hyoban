/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import "../eslint-typegen.d.ts";

import process from "node:process";

import eslintPluginAntfu from "eslint-plugin-antfu";
import pluginHyoban from "eslint-plugin-hyoban";

import { importConfig } from "./configs/imports";
import { reactConfigs } from "./configs/react";
import { typeScriptConfigs } from "./configs/typescript";
import { unicornConfigs } from "./configs/unicorn";
import type { ConfigArray, ConfigOptions } from "./utils";
import { config } from "./utils";

export interface Options {
	react?: boolean;
	strict?: boolean;
	typeChecked?: boolean | "essential";
	project?: string[] | string | boolean | null;
	tsconfigRootDir?: string;
	filesDisableTypeChecking?: string[];
	disableCustomConfig?: boolean;
}

function mergeDefaultOptions(
	options?: Options & Pick<ConfigOptions, "ignores" | "ignoreFiles">,
): Required<Options> {
	return {
		react: false,
		strict: false,
		typeChecked: "essential",
		project: true,
		tsconfigRootDir: process.cwd(),
		filesDisableTypeChecking: [],
		disableCustomConfig: false,
		...options,
	};
}

export * from "./consts";

export default async function hyoban(
	options?: Options & Pick<ConfigOptions, "ignores" | "ignoreFiles">,
	...args: ConfigArray
) {
	const finalOptions = mergeDefaultOptions(options);
	const { disableCustomConfig } = finalOptions;

	return config(
		{
			ignores: options?.ignores,
			ignoreFiles: options?.ignoreFiles,
		},
		!disableCustomConfig && {
			name: "js/custom",
			rules: {
				// https://twitter.com/karlhorky/status/1773632485055680875
				"array-callback-return": "error",
				"no-console": ["error", { allow: ["warn", "error"] }],
				// https://youtu.be/XTXPKbPcvl4?si=J_2E9dM25sAEXM2x
				"no-restricted-syntax": [
					"error",
					{
						selector: "TSEnumDeclaration",
						message: "We should not use Enum",
					},
				],
			},
		},
		...unicornConfigs(finalOptions),
		importConfig(),
		!disableCustomConfig && {
			name: "stylistic/custom",
			plugins: {
				antfu: eslintPluginAntfu,
				hyoban: pluginHyoban as any,
			},
			rules: {
				"object-shorthand": "warn",
				"prefer-template": "warn",
				"prefer-destructuring": [
					"warn",
					{
						array: false,
						object: true,
					},
				],
				"antfu/top-level-function": "warn",
				"hyoban/prefer-early-return": "warn",
			},
		},
		...typeScriptConfigs(finalOptions),
		...reactConfigs(finalOptions),
		...args,
	);
}
