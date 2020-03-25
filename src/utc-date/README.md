<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">utc-date</h1>

  <p>Generate UTC date with various offsets</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> Returns a [JavaScript date object][date-mdn-url] using the [UTC] timezone with optional offsets to adjust the `year`, `month`, or `date`.

## Table of contents <!-- omit in toc -->

- [Usage](#usage)
- [API Reference](#api-reference)
  - [UTCDateParams](#utcdateparams)
  - [utcDate(&lsqb;UTCDateParams&rsqb;)](#utcdateutcdateparams)
  - [utcDateSync(&lsqb;UTCDateParams&rsqb;)](#utcdatesyncutcdateparams)
- [License](#license)

## Usage

```ts
import { utcDate } from 'nodemod/dist/utc-date/index.js';

(async () => {
  /** Assuming today's date is '2020-02-02' */
  const defaultUTCDate = await utcDate();
  const defaultUTCDateWithOffsets = await utcDate({
    offset: {
      year: 2,
      month: 1,
      day: 0,
    },
  });
  const specifiedUTCDate = await utcDate({
    startDate: '2030-03-02',
  });
  
  defaultUTCDate === new Date('2020-02-02T00:00:00.000Z'); /** true */
  defaultUTCDateWithOffsets === new Date('2022-03-02T00:00:00.000Z'); /** true */
  specifiedUTCDate === new Date('2030-03-02T00:00:00.000Z'); /** true */
})();
```

## API Reference

### UTCDateParams

- `offsets` <?[Object][object-mdn-url]> Optional offset values when returning a [JavaScript Date object][date-mdn-url] using the [UTC] timezone.
  - `year` <?[number][number-mdn-url]> Optional offset to adjust the `year`.
  - `month` <?[number][number-mdn-url]> Optional offset to adjust the `month`.
  - `day` <?[number][number-mdn-url]> Optional offset to adjust the `day`.
- `startDate` <?[string][string-mdn-url]|?[number][number-mdn-url]|?[Date][date-mdn-url]> Optional starting date. _Defaults to today's date if it is not given._

### utcDate(&lsqb;UTCDateParams&rsqb;)

- `UTCDateParams` <?[UTCDateParams]> Optional configuration when returning a [JavaScript Date object][date-mdn-url] using the [UTC] timezone.
- returns: <[Promise][promise-mdn-url]&lt;[Date][date-mdn-url]&gt;> Promise which resolves with a [JavaScript Date object][date-mdn-url] using the [UTC] timezone.

### utcDateSync(&lsqb;UTCDateParams&rsqb;)

This methods works the same as `utcDate([UTCDateParams])` except that this is the synchronous version.

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[UTC]: https://en.wikipedia.org/wiki/Coordinated_Universal_Time

[UTCDateParams]: #utcdateparams

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
