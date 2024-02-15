# eslint-config-hyoban

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Hyoban's ESLint Config

## Usage

```sh
ni -D eslint eslint-config-hyoban
```

eslint.config.js

```js
import hyoban from "eslint-config-hyoban"

export default hyoban()
```

for cjs

```js
const hyoban = require("eslint-config-hyoban").default

module.exports = hyoban()
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [Stephen Zhou](https://github.com/hyoban)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/eslint-config-hyoban?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/eslint-config-hyoban
[npm-downloads-src]: https://img.shields.io/npm/dm/eslint-config-hyoban?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/eslint-config-hyoban
[bundle-src]: https://img.shields.io/bundlephobia/minzip/eslint-config-hyoban?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=eslint-config-hyoban
[license-src]: https://img.shields.io/github/license/hyoban/eslint-config-hyoban.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hyoban/eslint-config-hyoban/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/eslint-config-hyoban
