# eslint-config-hyoban

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Hyoban's ESLint Config enables most of the recommended rules for `js`, `ts`, and `react`, uses ESLint for formatting, and provides a lot of useful plugins.

Read more about why I use ESLint for linting and formatting on [xLog](https://hyoban.xlog.app/why-eslint).

| Basic              | Style            | React         | Others              | Tools                  |
| ------------------ | ---------------- | ------------- | ------------------- | ---------------------- |
| [js] ✅            | [stylistic] ✅   | [react] ✅    | [Tailwind CSS] ✅   | [config-inspector] ✅  |
| [ts] ✅            | [antfu] ✅       | [hooks] ✅    | [UnoCSS] ✅         | [eslint-types]         |
| [unicorn] ✅       | [import-sort] ✅ | [refresh] ✅  | [flat-gitignore] ✅ | [eslint-typegen] ✅    |
| [import-x] ✅      | [jsonc] ✅       | [compiler] ✅ | [command] ✅        | [@antfu/eslint-config] |
| [unused-import] ✅ | [yml]            | [jsx-a11y]    | [regexp] ✅         |                        |
| [n]                | [perfectionist]  | [next]        | [package-json] ✅   |                        |
| [compat]           | [format]         | [jsx-nesting] | [cspell]            |                        |

## Usage

> [!TIP]
> You may not need `lint-staged` and `simple-git-hooks` if you don't ignore auto-fix for rules in the editor.

```sh
ni -D eslint eslint-config-hyoban lint-staged simple-git-hooks
```

> [!TIP]
> You can install the nightly version from [pkg.pr.new](https://github.com/stackblitz-labs/pkg.pr.new), for example, `ni -D https://pkg.pr.new/hyoban/eslint-config-hyoban@{commit}`.

`eslint.config.mjs`

```ts
// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig()
```

> [!TIP]
> You can customize the preset by passing options according to [available options](https://github.com/hyoban/eslint-config-hyoban/blob/main/src/option.ts)

`package.json`

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix",
    "prepare": "simple-git-hooks"
  },
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

`.vscode/settings.json` for VSCode.

```jsonc
{
  // You shouldn't use formatter with this ESLint config
  "[javascript][javascriptreact][typescript][typescriptreact][json][jsonc]": {
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },

  // If you do not want to auto fix some rules on save
  // You can put this in your user settings or workspace settings
  "eslint.codeActionsOnSave.rules": [
    "!prefer-const",
    "!unused-imports/no-unused-imports",
    "!@stylistic/jsx-self-closing-comp",
    "!tailwindcss/classnames-order",
    "*"
  ],

  // If you want to silent stylistic rules
  // You can put this in your user settings or workspace settings
  "eslint.rules.customizations": [
    { "rule": "@stylistic/*", "severity": "off", "fixable": true },
    { "rule": "antfu/consistent-list-newline", "severity": "off" },
    { "rule": "hyoban/jsx-attribute-spacing", "severity": "off" },
    { "rule": "simple-import-sort/*", "severity": "off" },
    { "rule": "prefer-const", "severity": "off" },
    { "rule": "unused-imports/no-unused-imports", "severity": "off" },
    { "rule": "tailwindcss/classnames-order", "severity": "off" }
  ],

  // You can also silent all auto fixable rules
  "eslint.rules.customizations": [
    { "rule": "*", "fixable": true, "severity": "off" }
  ]
}
```

## Who is using?

- [Follow](https://github.com/RSSNext/Follow)
- [fisand](https://github.com/fisand)
- [Shiro](https://github.com/Innei/Shiro)
- [vite-react-tailwind-template](https://github.com/innei-template/vite-react-tailwind-template)

[npm-version-src]: https://img.shields.io/npm/v/eslint-config-hyoban?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/eslint-config-hyoban
[npm-downloads-src]: https://img.shields.io/npm/dm/eslint-config-hyoban?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/eslint-config-hyoban
[license-src]: https://img.shields.io/github/license/hyoban/eslint-config-hyoban.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hyoban/eslint-config-hyoban/blob/main/LICENSE
[js]: https://www.npmjs.com/package/@eslint/js
[ts]: https://typescript-eslint.io
[unicorn]: https://github.com/sindresorhus/eslint-plugin-unicorn
[import-x]: https://github.com/un-ts/eslint-plugin-import-x
[n]: https://github.com/eslint-community/eslint-plugin-n
[compat]: https://github.com/amilajack/eslint-plugin-compat
[stylistic]: https://eslint.style
[antfu]: https://github.com/antfu/eslint-plugin-antfu
[import-sort]: https://github.com/lydell/eslint-plugin-simple-import-sort
[jsonc]: https://github.com/ota-meshi/eslint-plugin-jsonc
[yml]: https://github.com/ota-meshi/eslint-plugin-yml
[perfectionist]: https://github.com/azat-io/eslint-plugin-perfectionist
[react]: https://eslint-react.xyz
[hooks]: https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
[next]: https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-plugin
[refresh]: https://github.com/ArnaudBarre/eslint-plugin-react-refresh
[jsx-nesting]: https://github.com/MananTank/eslint-plugin-validate-jsx-nesting
[jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[Tailwind CSS]: https://github.com/francoismassart/eslint-plugin-tailwindcss
[UnoCSS]: https://unocss.dev/integrations/eslint
[flat-gitignore]: https://github.com/antfu/eslint-config-flat-gitignore
[config-inspector]: https://github.com/eslint/config-inspector
[@antfu/eslint-config]: https://github.com/antfu/eslint-config
[eslint-types]: https://github.com/eslint-types
[format]: https://github.com/antfu/eslint-plugin-format
[unused-import]: https://github.com/sweepline/eslint-plugin-unused-imports
[package-json]: https://github.com/JoshuaKGoldberg/eslint-plugin-package-json
[eslint-typegen]: https://github.com/antfu/eslint-typegen
[command]: https://github.com/antfu/eslint-plugin-command
[regexp]: https://github.com/ota-meshi/eslint-plugin-regexp
[compiler]: https://github.com/facebook/react/tree/main/compiler/packages/eslint-plugin-react-compiler
[cspell]: https://github.com/streetsidesoftware/cspell/tree/main/packages/cspell-eslint-plugin#readme
