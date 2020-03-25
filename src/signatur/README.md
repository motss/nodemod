<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">signatur</h1>

  <p>Sign and unsign HTTP request with ease</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> It is always a recommended best practice to sign every HTTP request that contains any payload to ensure that the payload that sends along has not been tampered with. This module provides some handy methods to sign and unsign the data payload.

## Table of contents <!-- omit in toc -->

- [Usage](#usage)
- [API Reference](#api-reference)
  - [SignaturError](#signaturerror)
  - [SignaturOptions](#signaturoptions)
  - [sign(data, secret[, options])](#signdata-secret-options)
  - [unsign(signature, secret[, options])](#unsignsignature-secret-options)
  - [signSync(data, secret[, options])](#signsyncdata-secret-options)
  - [unsignSync(data, secret[, options])](#unsignsyncdata-secret-options)
- [License](#license)

## Usage

```ts
import { sign, unsign } from 'nodemod/dist/signatur/index.js';

(async () => {
  const payload = {
    id: 'b4cd8c1',
    t: '1580581220222',
  };
  const signedRequest = await sign(payload, {
    secret: 'fixed-secret',
    separator: ':',
  });

  signedRequest === 'eyJpZCI6ImI0Y2Q4YzEiLCJ0IjoiMTU4MDU4MTIyMDIyMiJ9:vXRKs8XZlLq1iJrPaYDsBsrLegjedzUCd3pnQqMB2Qg'; /** true */

  /** This shows how to handle error when a signature is invalid */
  try {
    await unsign(
      'eyJpZCI6ImI0Y2Q4YzEiLCJ0IjoiMTU4MDU4MTIyMDIyMiJ9:vXRKs8XZlLq1iJrPaYDsBsrLegjedzUCd3pnQqMB2Qg',
      { secret: 'fixed-secret', /** separator: ':', error: new Error('Bad signature detected'), */ }
    );
  } catch (e) {
    /** Handle error here */
    e;
    /**
     * {
     *   error: {
     *     type: 'invalid-signature',
     *     message: 'Signature not match',
     *   }
     * }
     */
  }
})();
```

## API Reference

### SignaturError

- `error` <[Object][object-mdn-url]> Error object for bad signature.
  - `type` <[string][string-mdn-url]> Error type. Defaults to `invalid-signature`.
  - `message` <[string][string-mdn-url]> Error message. Defauls to `Signature not match`.

### SignaturOptions

- `separator` <[?string][string-mdn-url]> Optional separator. Defaults to period (`.`).

___


### sign(data, secret[, options])

- `data` <`T`> Raw data payload in the type of `T`.
- `secret` <[string][string-mdn-url]> Secret used to encrypt the data payload.
- `options` <?[SignaturOptions]> Options for signing the payload.
- returns: <[Promise][promise-mdn-url]&lt;[string][string-mdn-url]&gt;> Promise which resolves with a URL-safe base64 encoded `HMAC-SHA256` signature that encrypts the raw data payload with a required secret key.

### unsign(signature, secret[, options])

- `signature` <[string][string-mdn-url]> URL-safe signature.
- `secret` <[string][string-mdn-url]> Secret used to encrypt the data payload.
- `options` <?[SignaturOptions]> Options for signing the payload.
- returns: <[Promise][promise-mdn-url]&lt;`T`&gt;> Promise which resolves with decoded data payload in the type of `T`.

Throws a error object for bad signature in the type of [SignaturError].

### signSync(data, secret[, options])

This methods works the same as `sign(data, secret[, options])` except that this is the synchronous version.

### unsignSync(data, secret[, options])

This methods works the same as `unsign(signature, secret[, options])` except that this is the synchronous version.

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[SignaturError]: #signaturerror
[SignaturOptions]: #signaturoptions

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

<!-- Badges -->

[mit-license-badge]: https://flat.badgen.net/badge/license/MIT/blue

<!-- Links -->

[mit-license-url]: https://github.com/motss/deno_mod/blob/master/LICENSE
