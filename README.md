<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">nodemod</h1>

  <p>A collection of node modules for The Really Project</p>
</div>

<hr />

<a href="https://www.buymeacoffee.com/RLmMhgXFb" target="_blank" rel="noopener noreferrer"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 20px !important;width: auto !important;" ></a>
[![tippin.me][tippin-me-badge]][tippin-me-url]
[![Follow me][follow-me-badge]][follow-me-url]

[![Version][version-badge]][version-url]
[![Node version][node-version-badge]][node-version-url]
[![MIT License][mit-license-badge]][mit-license-url]

[![Downloads][downloads-badge]][downloads-url]
[![Total downloads][total-downloads-badge]][downloads-url]
[![Packagephobia][packagephobia-badge]][packagephobia-url]
[![Bundlephobia][bundlephobia-badge]][bundlephobia-url]

[![ci][ga-badge]][ga-url]
[![codecov][codecov-badge]][codecov-url]

[![Code of Conduct][coc-badge]][coc-url]

> Helper functions made specifically for The Really Project. All modules are shipped in [ES Modules] and users are required to create their own CJS builds if needed, or use [esm] for bundle-less module loader.

## Table of contents <!-- omit in toc -->

- [Pre-requisites](#pre-requisites)
- [Install](#install)
- [Usage](#usage)
- [Available modules](#available-modules)
- [Deno equivalent](#deno-equivalent)
- [License](#license)

## Pre-requisites

- [Node.js][nodejs-url] >= 14.17.3
- [NPM][npm-url] >= 6.14.13 ([NPM][npm-url] comes with [Node.js][nodejs-url] so there is no need to install separately.)
- [ES Modules]

## Install

```sh
# Install via NPM
$ npm i nodemod
```

```sh
# [OPTIONAL] Only install this as `devDependencies` if you do not use
# any bundler or compiler for your project. Note that all modules are 
# exported using ES modules. See Usage section for more details.
$ npm i -D esm
```

## Usage

All modules are exported using JavaScript's ES modules. Users are recommended to use [esm] to run their scripts.

```js
// index.js
import { html } from 'nodemod/dist/lit-ntml/index.js';

await html`<h1>Hello, World!</h1>`;
```

```sh
$ node -r esm index.js # Run script with `esm` to transpile ES Modules on the fly.
```

## Available modules

* [calendar] - Minimal module to compute a calendar
* [deep-clone] - Simple and fast deep cloning
* [delay-until] - A typical delay function but Promise based
* [fetch-as] - Simple fetch helper with type resolver
* [lit-ntml] - Expressive HTML Templates
* [normalize-diacritics] - Remove accents/ diacritics in string
* [polling-observer] - A new way of running polling function with observer pattern
* [scryptify] - A stronger encryption and decryption in Node.js
* [signatur] - Sign and unsign HTTP request with ease
* [utc-date] - Generate UTC date with various offsets
* [utc-time] - Generate UTC time with various offsets

## Deno equivalent

Showing some ❤️ and support for [deno].

* [deno_mod]

## License

[MIT License](https://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->
[typescript-url]: https://github.com/Microsoft/TypeScript
[nodejs-url]: https://nodejs.org
[npm-url]: https://www.npmjs.com
[node-releases-url]: https://nodejs.org/en/download/releases
[deno]: https://github.com/denoland/deno
[deno_mod]: https://github.com/motss/deno_mod
[esm]: https://github.com/standard-things/esm
[ES Modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[calendar]: /src/calendar
[deep-clone]: /src/deep-clone
[delay-until]: /src/delay-until
[fetch-as]: /src/fetch-as
[lit-ntml]: /src/lit-ntml
[normalize-diacritics]: /src/normalize-diacritics
[polling-observer]: /src/polling-observer
[scryptify]: /src/scryptify
[signatur]: /src/signatur
[utc-date]: /src/utc-date
[utc-time]: /src/utc-time

<!-- Badges -->
[tippin-me-badge]: https://badgen.net/badge/%E2%9A%A1%EF%B8%8Ftippin.me/@igarshmyb/F0918E
[follow-me-badge]: https://flat.badgen.net/twitter/follow/igarshmyb?icon=twitter

[version-badge]: https://flat.badgen.net/npm/v/nodemod?icon=npm
[node-version-badge]: https://flat.badgen.net/npm/node/nodemod
[mit-license-badge]: https://flat.badgen.net/npm/license/nodemod

[downloads-badge]: https://flat.badgen.net/npm/dm/nodemod
[total-downloads-badge]: https://flat.badgen.net/npm/dt/nodemod?label=total%20downloads
[packagephobia-badge]: https://flat.badgen.net/packagephobia/install/nodemod
[bundlephobia-badge]: https://flat.badgen.net/bundlephobia/minzip/nodemod

[ga-badge]: https://github.com/motss/nodemod/actions/workflows/ci.yml/badge.svg?branch=main
[codecov-badge]: https://flat.badgen.net/codecov/c/github/motss/nodemod?label=codecov&icon=codecov

[coc-badge]: https://flat.badgen.net/badge/code%20of/conduct/pink

<!-- Links -->
[tippin-me-url]: https://tippin.me/@igarshmyb
[follow-me-url]: https://twitter.com/igarshmyb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=motss/app-datepicker

[version-url]: https://www.npmjs.com/package/nodemod
[node-version-url]: https://nodejs.org/en/download
[mit-license-url]: https://github.com/motss/nodemod/blob/master/LICENSE

[downloads-url]: https://www.npmtrends.com/nodemod
[packagephobia-url]: https://packagephobia.now.sh/result?p=nodemod
[bundlephobia-url]: https://bundlephobia.com/result?p=nodemod

[ga-url]: https://github.com/motss/nodemod/actions/workflows/ci.yml
[codecov-url]: https://codecov.io/gh/motss/nodemod

[coc-url]: https://github.com/motss/nodemod/blob/master/CODE_OF_CONDUCT.md
