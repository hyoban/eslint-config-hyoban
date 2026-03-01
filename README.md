# eslint-config-hyoban

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

Hyoban's ESLint Config is based on [@antfu/eslint-config].
Read more about why I use ESLint for linting and formatting on [my blog](https://hyoban.cc/why-eslint).

Extras on top of `@antfu/eslint-config`:

- replaces antfu's perfectionist sorting with [import-sort]
- extra Markdown linting rules powered by [eslint-markdown]
- optional Hyoban rules via `hyoban: true` (enabled by default)
- optional [Tailwind CSS] preset via `tailwindcss: true`
- little defaults config you can find in [merge-options](src/merge-options.ts) and dependencies

| Basic           | Style           | React         | Others           | Tools                  |
| --------------- | --------------- | ------------- | ---------------- | ---------------------- |
| [js]            | [stylistic]     | [react]       | [Tailwind CSS]   | [config-inspector]     |
| [ts]            | [antfu]         | [hooks]       | [UnoCSS]         | [eslint-types]         |
| [unicorn]       | [import-sort]   | [refresh]     | [flat-gitignore] | [eslint-typegen]       |
| [import]        | [jsonc]         | [compiler]    | [command]        | [@antfu/eslint-config] |
| [unused-import] | [yml]           | [jsx-a11y]    | [regexp]         | [npm-eslint-markdown]  |
| [n]             | [perfectionist] | [next]        | [package-json]   | [eslint-markdown]      |
| [compat]        | [format]        | [jsx-nesting] | [cspell]         | [hyoban]               |

## Usage

Follow [@antfu/eslint-config] for installation and usage.

```sh
ni -D eslint eslint-config-hyoban lint-staged simple-git-hooks
```

`eslint.config.mjs`

```ts
// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig()
```

with Tailwind CSS:

```ts
// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig({
  tailwindcss: {
    settings: {
      tailwindConfig: './tailwind.config.ts',
    },
    overrides: {
      'tailwindcss/no-unknown-classes': 'off',
    },
  },
})
```

## TypeAware Rules

We recommend using [tsslint](https://github.com/johnsoncodehk/tsslint) for type-aware rules.

A example `tsslint.config.ts`:

```ts
import { defineConfig, importESLintRules } from '@tsslint/config'

// Run `npx tsslint-docgen` to generate documentation for the configured rules.

export default defineConfig({
  rules: {
    ...await importESLintRules({
      'react-x/no-leaked-conditional-rendering': 'error',
    }),
  },
})
```

## Who is using?

- [Folo](https://github.com/RSSNext/Folo)
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
[import]: https://github.com/9romise/eslint-plugin-import-lite
[n]: https://github.com/eslint-community/eslint-plugin-n
[compat]: https://github.com/amilajack/eslint-plugin-compat
[stylistic]: https://eslint.style
[antfu]: https://github.com/antfu/eslint-plugin-antfu
[import-sort]: https://github.com/lydell/eslint-plugin-simple-import-sort
[eslint-markdown]: https://github.com/eslint/markdown
[npm-eslint-markdown]: https://github.com/lumirlumir/npm-eslint-markdown
[jsonc]: https://github.com/ota-meshi/eslint-plugin-jsonc
[yml]: https://github.com/ota-meshi/eslint-plugin-yml
[perfectionist]: https://github.com/azat-io/eslint-plugin-perfectionist
[react]: https://eslint-react.xyz
[hooks]: https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
[next]: https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-plugin
[refresh]: https://github.com/ArnaudBarre/eslint-plugin-react-refresh
[jsx-nesting]: https://github.com/MananTank/eslint-plugin-validate-jsx-nesting
[jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[Tailwind CSS]: https://github.com/schoero/eslint-plugin-better-tailwindcss
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
[hyoban]: https://github.com/hyoban/eslint-plugin-hyoban
