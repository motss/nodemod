<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">fetch-as</h1>

  <p>Simple fetch helper with type resolver</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> Minimal helper to resolve fetch with specified response type. In case of failure, an error will return instead.

## Table of contents <!-- omit in toc -->

- [Fetch API](#fetch-api)
  - [Install `node-fetch`](#install-node-fetch)
  - [Make fetch available globally](#make-fetch-available-globally)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [FetchAsInfo](#fetchasinfo)
  - [FetchAsReturnType](#fetchasreturntype)
  - [fetchAs](#fetchas)
  - [fetchAsArrayBuffer(url[, options])](#fetchasarraybufferurl-options)
  - [fetchAsBlob(url[, options])](#fetchasbloburl-options)
  - [fetchAsJson(url[, options])](#fetchasjsonurl-options)
  - [fetchAsText(url[, options])](#fetchastexturl-options)
- [License](#license)

## Fetch API

Please make sure fetch API is available globally for Node.js. `node-fetch` is a very good alternative.

### Install `node-fetch`

```sh
$ npm i node-fetch
```

### Make fetch available globally

```js
const fetch = require('node-fetch');
global.fetch = fetch;
```

## Usage

```ts
/** Available options: arrayBuffer, blob, json, text */
import { json } from 'nodemod/dist/fetch-as/index.js';

(async () => {
  /** Same function signature as native Fetch API, without the need to await .json() */
  const d = await json('http://www.mocky.io/v2/5a50cfa82f000085158d5315', { method: 'GET' });

  console.log(d); /** { status: 200, message: 'OK', by: 'fetch-as' }; */
})();
```

## API Reference

### FetchAsInfo

```ts
// Interface
interface FetchAsInfo {
  size: number;
  timeout: number;
  type: "basic"|"cors"|"default"|"error"|"opaque"|"opaqueredirect";
  headers: {
    [key: string]: any;
  };
}
```

### FetchAsReturnType

```ts
// Interface
interface FetchAsReturnType<T = any, U = any> {
  status: number;
  info: FetchAsInfo;

  data?: T;
  error?: U;
}
```

- `status` <[string][string-mdn-url]> HTTP response status code. Any response that has a HTTP status greater than `399` can be regarded as an error response.
- `info` <[Object][object-mdn-url]> This contains additional information you might need from a response. See [FetchAsInfo] for the detailed interface.
  - `size` <[number][number-mdn-url]> Response size.
  - `timeout` <[number][number-mdn-url]> Response timeout.
  - `type` <[string][string-mdn-url]> Response type. Possible values are: `basic`, `cors`, `default`, `error`, `opaque`, `opaqueredirect`.
  - `headers` <[Object][object-mdn-url]> Response headers, e.g. `{ 'content-type': 'application/json' }`.

- `data` <?`any`> This contains the successful response data of the user-specified type, for instance, `MyReturnData` in the example shown above. _**Only shows when the HTTP response status code is less than `400`.**_
- `error` <?`any`> This contains the error response data of type `T`. _**Only shows when the HTTP response status code is greater than `399`.**_

Each return type have default Generics type of `any` which means it can be any type in JavaScript and is overridable by user defined type via [TypeScript]'s `Generics`.

```ts
// e.g. Overridable Generics
interface SuccessData {
  message: string;
}

...
const d = await FetchAsJson<SuccessData>(...);

// d will have the type of `FetchAsReturnType<SuccessData, any>>`
assert(d.data.message, '...'); // OK
...
```

___

### fetchAs

This contains a collection of methods that will convert the response into the specified data type:

- `.arrayBuffer(url[, options])` Method which will return a [ArrayBuffer][arraybuffer-mdn-url].
- `.blob(url[,options])` Method which will return a [Blob][blob-mdn-url].
- `.json(url[, options])` Method which will return a JSON data which can consumed by JavaScript as [Object][object-mdn-url].
- `.text(url[, options])` Method which will return a text string.

### fetchAsArrayBuffer(url[, options])

- `url` <[string][string-mdn-url]> A string representing the URL for fetching.
- `options` <[?Object][object-mdn-url]> Options for HTTP(S) request, see [fetch's init parameter].
- returns: <[Promise][promise-mdn-url]<[FetchAsReturnType]&lt;[ArrayBuffer][arraybuffer-mdn-url]&gt;> Promise which resolves with a [FetchAsReturnType] of type [ArrayBuffer][arraybuffer-mdn-url].

### fetchAsBlob(url[, options])

- `url` <[string][string-mdn-url]> A string representing the URL for fetching.
- `options` <[?Object][object-mdn-url]> Options for HTTP(S) request, see [fetch's init parameter].
- returns: <[Promise][promise-mdn-url]<[FetchAsReturnType]&lt;[Blob][blob-mdn-url]&gt;> Promise which resolves with a [FetchAsReturnType] of type [Blob][blob-mdn-url].

### fetchAsJson(url[, options])

- `url` <[string][string-mdn-url]> A string representing the URL for fetching.
- `options` <[?Object][object-mdn-url]> Options for HTTP(S) request, see [fetch's init parameter].
- returns: <[Promise][promise-mdn-url]<[FetchAsReturnType]&lt;[Object][object-mdn-url]&gt;> Promise which resolves with a [FetchAsReturnType] of type JSON which can consumed by JavaScript as [Object][object-mdn-url].

### fetchAsText(url[, options])

- `url` <[string][string-mdn-url]> A string representing the URL for fetching.
- `options` <[?Object][object-mdn-url]> Options for HTTP(S) request, see [fetch's init parameter].
- returns: <[Promise][promise-mdn-url]<[FetchAsReturnType]&lt;[string][string-mdn-url]&gt;> Promise which resolves with a [FetchAsReturnType] of type [string][string-mdn-url].

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[TypeScript]: https://github.com/Microsoft/TypeScript
[fetch's init parameter]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters

[FetchAsInfo]: #fetchasinfo
[FetchAsReturnType]: #fetchasreturntype

<!-- MDN -->

[array-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[date-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[error-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[function-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[regexp-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[set-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[void-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void

[arraybuffer-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
[blob-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/API/Blob

<!-- Badges -->

[mit-license-badge]: https://flat.badgen.net/badge/license/MIT/blue

<!-- Links -->

[mit-license-url]: https://github.com/motss/deno_mod/blob/master/LICENSE
