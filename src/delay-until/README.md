<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">delay-until</h1>

  <p>A typical delay function but Promise based</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> Unlike thread sleep, this is achieved by wrapping a [setTimeout] inside [Promise][promise-mdn-url]. It's best to use with [async...await] syntax.

## Table of contents <!-- omit in toc -->

- [Usage](#Usage)
- [API Reference](#API-Reference)
  - [delayUntil([delay])](#delayUntildelay)
- [License](#License)

## Usage

```ts
import { delayUntil } from '@reallyland/node_mod/dist/delay-until';

(async () => {
  await delayUntil(3e3);

  console.log('This message prints out after 3 seconds');
})();
```

## API Reference

### delayUntil([delay])

- `delay` <?[number][number-mdn-url]> The delay, in milliseconds, the function should wait for before any code after where the delay function is called can be executed. This does not affect code execution in other thread, module, or even file.
- returns: <[Promise][promise-mdn-url]<`undefined`>> Promise which resolves with no return value.

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[setTimeout]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
[async...await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

<!-- MDN -->

[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

<!-- Badges -->

[mit-license-badge]: https://flat.badgen.net/badge/license/MIT/blue

<!-- Links -->

[mit-license-url]: https://github.com/motss/deno_mod/blob/master/LICENSE
