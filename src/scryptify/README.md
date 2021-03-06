<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">scryptify</h1>

  <p>A stronger encryption and decryption in Node.js</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> A stronger encryption and description in Node.js based on implementation that can be found here [Stronger Encryption and Decryption in Node.js | Vance Lucas].
>
> In short, a strong encryption will always produce a unique output and it will always return the raw data after the decryption. A 256 bytes (or 32 characters) salt is needed to do the encryption and decryption process. This salt can be generated by making use of one of the great NPM modules that is available out there - [randomstring].

## Table of contents <!-- omit in toc -->

- [Usage](#usage)
- [API Reference](#api-reference)
  - [encrypt(text, secret)](#encrypttext-secret)
  - [encryptSync(text, secret)](#encryptsynctext-secret)
  - [decrypt(text, secret)](#decrypttext-secret)
  - [decryptSync(text, secret)](#decryptsynctext-secret)
- [License](#license)

## Usage

```ts
import randomstring from 'randomstring';

import { encrypt, decrypt } from 'nodemod/dist/scryptify/index.js';

(async () => {
  /** 256 bytes or 32 characters salt */
  const secret = randomstring.generate(32);

  const rawData = '5ome_rand0m_m3ss4g3';
  const encrypted = await encrypt(rawData, secret);
  const decrypted = await decrypt(encrypted, secret);

  decrypted === rawData; /** true */
})();
```

## API Reference

### encrypt(text, secret)

  - text <[string][string-mdn-url]> Input string to be encrypted.
  - secret <[string][string-mdn-url]> A 256 bytes (or 32 characters) salt for the encryption.
  - returns: <[Promise][promise-mdn-url]<[string][string-mdn-url]>> Promise which resolves with an encrypted output.

### encryptSync(text, secret)

This methods works the same as `encrypt(text, secret)` except that this is the synchronous version.

### decrypt(text, secret)

  - text <[string][string-mdn-url]> Encrypted input string.
  - secret <[string][string-mdn-url]> A 256 bytes (or 32 characters) salt for the decryption. _This must be the exact same salt that is used in encrypting the input string._
  - returns: <[Promise][promise-mdn-url]<[string][string-mdn-url]>> Promise which resolves with the raw content of the encrypted data.

### decryptSync(text, secret)

This methods works the same as `decrypt(text, secret)` except that this is the synchronous version.


## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[Stronger Encryption and Decryption in Node.js | Vance Lucas]: http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js
[randomstring]: https://www.npmjs.com/package/randomstring

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
