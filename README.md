# eslint-config-hyoban

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

Hyoban's ESLint Config, enable most of the recommended rules for `js`, `ts`, and `react`.

| Basic           | Style            | React         | Others                 |
| --------------- | ---------------- | ------------- | ---------------------- |
| [js] ✅         | [stylistic]      | [react] ✅    | [Tailwind CSS]         |
| [ts] ✅         | [antfu] ✅       | [hooks] ✅    | [UnoCSS]               |
| [unicorn] ✅    | [import-sort] ✅ | [refresh]     | [flat-gitignore] ✅    |
| [import-x] ✅   | [jsonc] ✅       | [jsx-nesting] | [config-inspector]     |
| [unused-import] | [yml]            | [jsx-a11y]    | [@antfu/eslint-config] |
| [n]             | [perfectionist]  | [next]        | [eslint-types]         |
| [compat]        | [format]         |               | [package-json] ✅      |
|                 |                  |               | [eslint-typegen] ✅    |

## Usage

```sh
ni -D eslint eslint-config-hyoban
```

`eslint.config.js` or `eslint.config.mjs`

```ts
// @ts-check
import hyoban from "eslint-config-hyoban";

export default hyoban();
```

> [!TIP]
> You can disable my custom rules by setting `hyoban({ disableCustomConfig: true, disableLintForPackageJson: true })`.

`scripts` in `package.json`

```json
{
	"scripts": {
		"lint": "prettier --list-different . && eslint",
		"lint:fix": "prettier --list-different --write . && eslint --fix"
	}
}
```

> [!WARNING]
> If your ESLint version is less than 9.0.0, you have to use `eslint .` instead of `eslint`.

`settings.json` for VSCode

```jsonc
{
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit",
	},

	"eslint.experimental.useFlatConfig": true,
	"eslint.probe": [
		"javascript",
		"javascriptreact",
		"typescript",
		"typescriptreact",
		"json",
	],
}
```

> [!WARNING]
> If your ESLint version is less than 8.57.0, you have to use eslint.config.js.

```js
module.exports = (async () => (await import("./eslint.config.mjs")).default)();
```

> [!TIP]
> Auto fix for Pull Request

```yml
name: Format

on:
  pull_request:
    branches:
      - main

jobs:
  format-code:
    runs-on: ubuntu-latest

    permissions:
      # Give the default GITHUB_TOKEN write permission to commit and push the
      # added or changed files to the repository.
      contents: write

    steps:
      - uses: actions/checkout@v4

      - name: Set node
        uses: actions/setup-node@v4
        with:
          node-version: lts/*

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          run_install: |
            - args: [--frozen-lockfile]

      - name: Lint
        run: pnpm run lint:fix

      # Commit all changed files back to the repository
      - uses: stefanzweifel/git-auto-commit-action@v5
```

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
