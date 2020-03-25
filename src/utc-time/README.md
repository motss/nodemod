<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">utc-time</h1>

  <p>Generate UTC time with various offsets</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> Returns a [JavaScript date object][date-mdn-url] using the UTC timezone with optional offsets to adjust the `hour`, `minute`, `second` or `millisecond`.

## Table of contents <!-- omit in toc -->

- [Usage](#usage)
- [API Reference](#api-reference)
  - [UTCTimeOpts](#utctimeopts)
  - [utcTime(&lsqb;UTCTimeOpts&rsqb;)](#utctimeutctimeopts)
  - [utcTimeSync(&lsqb;UTCTimeOpts&rsqb;)](#utctimesyncutctimeopts)
- [License](#license)

## Usage

```ts
import { utcTime } from 'nodemod/dist/utc-time/index.js';

(async () => {
  /** NOTE: Assuming today's date is '2020-02-02' */
  const defaultUTCDatetime = await utcTime();
  const defaultUTCDatetimeWithOffsets = await utcTime({
    offset: {
      hour: 3,
      minute: 2,
      second: 1,
      millisecond: 0,
    },
  });
  const specifiedUTCDatetime = await utcTime({
    startDatetime: '2033-03-03T03:33:33.333Z',
  });
  
  defaultUTCDatetime === new Date('2020-02-02T00:00:00.000Z'); /** true */
  defaultUTCDatetimeWithOffsets === new Date('2020-02-02T03:02:01.000Z'); /** true */
  specifiedUTCDatetime === new Date('2033-03-03T03:33:33.333Z'); /** true */
})();
```

## API Reference

### UTCTimeOpts

- `offsets` <?[Object][object-mdn-url]> Optional offset values when returning a [JavaScript Date object][date-mdn-url] using [UTC] timezone.
  - `hour` <?[number][number-mdn-url]> Optional offset to adjust the `hour`.
  - `minute` <?[number][number-mdn-url]> Optional offset to adjust the `minute`.
  - `second` <?[number][number-mdn-url]> Optional offset to adjust the `second`.
  - `millisecond` <?[number][number-mdn-url]> Optional offset to adjust the `millisecond`.
- `startDatetime` <?[string][string-mdn-url]|?[number][number-mdn-url]|?[Date][date-mdn-url]> Optional starting datetime. _Defaults to today's datetime if it is not provided._

___

### utcTime(&lsqb;UTCTimeOpts&rsqb;)

  - `UTCTimeOpts` <?[UTCTimeOpts]> Optional configuration when returning a [JavaScript Date object][date-mdn-url] using [UTC] timezone.
  - returns: <[Promise][promise-mdn-url]&lt;[string][string-mdn-url]&gt;> Promise which resolves with a [JavaScript Date object][date-mdn-url] using [UTC] timezone.

### utcTimeSync(&lsqb;UTCTimeOpts&rsqb;)

This methods works the same as `utcTime([UTCTimeOpts])` except that this is the synchronous version.

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[UTC]: https://en.wikipedia.org/wiki/Coordinated_Universal_Time

[UTCTimeOpts]: #utctimeopts

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
