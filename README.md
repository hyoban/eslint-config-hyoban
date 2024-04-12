# eslint-config-hyoban

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Hyoban's ESLint Config, enable most of the recommended rules from the following plugins:

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

```sh
npx eslint-config-hyoban
```

> [!Note]
> If your ESLint version is less than 8.57.0, you have to use eslint.config.js.

```js
module.exports = (async () => (await import("./eslint.config.mjs")).default)();
```

[npm-version-src]: https://img.shields.io/npm/v/eslint-config-hyoban?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/eslint-config-hyoban
[npm-downloads-src]: https://img.shields.io/npm/dm/eslint-config-hyoban?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/eslint-config-hyoban
[license-src]: https://img.shields.io/github/license/hyoban/eslint-config-hyoban.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hyoban/eslint-config-hyoban/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/eslint-config-hyoban
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
