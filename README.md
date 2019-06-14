<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">node_modules</h1>

  <p>A collection of node modules for The Really Project</p>
</div>

<hr />

[![Follow me][follow-me-badge]][follow-me-url]

[![Version][version-badge]][version-url]
[![Node version][node-version-badge]][node-version-url]
[![MIT License][mit-license-badge]][mit-license-url]

[![Downloads][downloads-badge]][downloads-url]
[![Total downloads][total-downloads-badge]][downloads-url]
[![Packagephobia][packagephobia-badge]][packagephobia-url]
[![Bundlephobia][bundlephobia-badge]][bundlephobia-url]

[![CircleCI][circleci-badge]][circleci-url]
[![Dependency Status][daviddm-badge]][daviddm-url]
[![codecov][codecov-badge]][codecov-url]
[![Coverage Status][coveralls-badge]][coveralls-url]

[![codebeat badge][codebeat-badge]][codebeat-url]
[![Codacy Badge][codacy-badge]][codacy-url]
[![Code of Conduct][coc-badge]][coc-url]

> Better greeting message

## Table of contents <!-- omit in toc -->

- [Pre-requisites](#pre-requisites)
- [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
    - [Node.js](#nodejs)
    - [Native ES modules or TypeScript](#native-es-modules-or-typescript)
- [API Reference](#api-reference)
  - [greeting([name])](#greetingname)
  - [greetingSync([name])](#greetingsyncname)
- [License](#license)

## Pre-requisites

- [Node.js][nodejs-url] >= 8.16.0
- [NPM][npm-url] >= 6.4.1 ([NPM][npm-url] comes with [Node.js][nodejs-url] so there is no need to install separately.)

## Setup

### Install

```sh
# Install via NPM
$ npm install --save node_modules
```

### Usage

#### Node.js

```js
const greeting = require('node_modules');
```

#### Native ES modules or TypeScript

```ts
import greeting from 'node_modules';
```

## API Reference

### greeting([name])

- `name` <[string][string-mdn-url]> Name of the person to greet at.
- returns: <[Promise][promise-mdn-url]<[string][string-mdn-url]>> Promise which resolves with a greeting message.

### greetingSync([name])

This methods works the same as `greeting(name)` except that this is the synchronous version.

## License

[MIT License](https://motss.mit-license.org/) © Rong Sen Ng (motss)

<!-- References -->
[typescript-url]: https://github.com/Microsoft/TypeScript
[nodejs-url]: https://nodejs.org
[npm-url]: https://www.npmjs.com
[node-releases-url]: https://nodejs.org/en/download/releases

<!-- MDN -->
[array-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[function-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[regexp-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[set-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

<!-- Badges -->
[follow-me-badge]: https://flat.badgen.net/twitter/follow/motss?icon=twitter

[version-badge]: https://flat.badgen.net/npm/v/node_modules?icon=npm
[node-version-badge]: https://flat.badgen.net/npm/node/node_modules
[mit-license-badge]: https://flat.badgen.net/npm/license/node_modules

[downloads-badge]: https://flat.badgen.net/npm/dm/node_modules
[total-downloads-badge]: https://flat.badgen.net/npm/dt/node_modules?label=total%20downloads
[packagephobia-badge]: https://flat.badgen.net/packagephobia/install/node_modules
[bundlephobia-badge]: https://flat.badgen.net/bundlephobia/minzip/node_modules

[circleci-badge]: https://flat.badgen.net/circleci/github/motss/node_modules?icon=circleci
[daviddm-badge]: https://flat.badgen.net/david/dep/motss/node_modules
[codecov-badge]: https://flat.badgen.net/codecov/c/github/motss/node_modules?label=codecov&icon=codecov
[coveralls-badge]: https://flat.badgen.net/coveralls/c/github/motss/node_modules?label=coveralls

[codebeat-badge]: https://codebeat.co/badges/123
[codacy-badge]: https://api.codacy.com/project/badge/Grade/123
[coc-badge]: https://flat.badgen.net/badge/code%20of/conduct/pink

<!-- Links -->
[follow-me-url]: https://twitter.com/motss?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=motss/node_modules

[version-url]: https://www.npmjs.com/package/node_modules
[node-version-url]: https://nodejs.org/en/download
[mit-license-url]: https://github.com/motss/node_modules/blob/master/LICENSE

[downloads-url]: https://www.npmtrends.com/node_modules
[packagephobia-url]: https://packagephobia.now.sh/result?p=node_modules
[bundlephobia-url]: https://bundlephobia.com/result?p=node_modules

[circleci-url]: https://circleci.com/gh/motss/node_modules/tree/master
[daviddm-url]: https://david-dm.org/motss/node_modules
[codecov-url]: https://codecov.io/gh/motss/node_modules
[coveralls-url]: https://coveralls.io/github/motss/node_modules?branch=master

[codebeat-url]: https://codebeat.co/projects/github-com-motss-node_modules-master
[codacy-url]: https://www.codacy.com/app/motss/node_modules?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=motss/node_modules&amp;utm_campaign=Badge_Grade
[coc-url]: https://github.com/motss/node_modules/blob/master/CODE_OF_CONDUCT.md
