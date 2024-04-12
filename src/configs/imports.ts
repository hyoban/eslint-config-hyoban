/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Linter } from "eslint";
import pluginAntfu from "eslint-plugin-antfu";
import * as pluginImport from "eslint-plugin-import-x";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export function importConfig(): Linter.FlatConfig {
	return {
		name: "import",
		plugins: {
			"simple-import-sort": simpleImportSort,
			"import-x": pluginImport as any,
			antfu: pluginAntfu,
		},
		rules: {
			"simple-import-sort/imports": "warn",
			"simple-import-sort/exports": "warn",
			"import-x/first": "warn",
			"import-x/newline-after-import": "warn",
			"import-x/no-duplicates": "warn",

			"antfu/import-dedupe": "warn",
			"antfu/no-import-dist": "error",
			"antfu/no-import-node-modules-by-path": "error",
		},
	};
}
