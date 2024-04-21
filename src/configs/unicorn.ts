/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Linter } from "eslint";
import pluginUnicorn from "eslint-plugin-unicorn";

export function unicornConfigs() {
  return [
    [
      { name: "unicorn/recommended" } satisfies Linter.FlatConfig,
      pluginUnicorn.configs["flat/recommended"] as Linter.FlatConfig,
    ],
    {
      name: "unicorn/custom",
      rules: {
        "unicorn/prevent-abbreviations": "off",
        "unicorn/catch-error-name": "off",
        // https://github.com/sindresorhus/meta/discussions/7
        "unicorn/no-null": "off",
        // https://github.com/orgs/web-infra-dev/discussions/10
        "unicorn/prefer-top-level-await": "off",
        "unicorn/no-negated-condition": "off",
        "unicorn/no-await-expression-member": "off",

        // conflicts with prettier
        "unicorn/template-indent": "off",
        "unicorn/empty-brace-spaces": "off",
        "unicorn/no-nested-ternary": "off",
        "unicorn/number-literal-case": "off",
      },
    } satisfies Linter.FlatConfig,
  ];
}
