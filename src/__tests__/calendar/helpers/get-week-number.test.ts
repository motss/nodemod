import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { getWeekNumber } from '../../../calendar/index';
import type { WeekNumberType } from '../../../calendar/typings';

type TestError = [undefined | null, undefined | null];


([
  [void 0, void 0],
  [void 0, null],
  [null, void 0],
  [null, null],
] as TestError[]).forEach(([testWeekNumberType, testDate]) => {
  test(`week number (weekNumberType=${testWeekNumberType}; date=${testDate})`, () => {
    try {
      getWeekNumber(testWeekNumberType as never, testDate as never);
    } catch (e: unknown) {
      const error = e as TypeError;

      assert.is(error.name, TypeError.name);
      assert.match(error.message, /^cannot read (properties|property) of (null|undefined)/i);
    }
  });
});

type TestSuccess = [string, [number, number, number, number]];
([
  ['2010-01-01', [52, 1, 52, 1]],
  ['2011-01-01', [52, 1, 52, 1]],
  ['2012-01-01', [1,  1,  1, 1]],
  ['2013-01-01', [53, 1,  1, 1]],
  ['2014-01-01', [52, 1,  1, 1]],
  ['2015-01-01', [52, 1, 53, 1]],
  ['2016-01-01', [52, 1, 52, 1]],
  ['2017-01-01', [1,  1,  1, 1]],
  ['2018-01-01', [53, 1,  1, 1]],
  ['2019-01-01', [52, 1,  1, 1]],
  ['2020-01-01', [52, 1,  1, 1]],

  ['2010-12-31', [52,  1, 52, 53]],
  ['2011-12-31', [52, 53, 52, 53]],
  ['2012-12-31', [53,  1,  1, 53]],
  ['2013-12-31', [52,  1,  1, 53]],
  ['2014-12-31', [52,  1, 53, 53]],
  ['2015-12-31', [52,  1, 52, 53]],
  ['2016-12-31', [52, 53, 52, 53]],
  ['2017-12-31', [53,  1,  1, 53]],
  ['2018-12-31', [52,  1,  1, 53]],
  ['2019-12-31', [52,  1,  1, 53]],
  ['2020-12-31', [52,  1, 53, 53]],
] as TestSuccess[]).forEach(([testDate, expected]) => {
  test(`week number (date=${testDate})`, () => {
    const result = (
      [
        'first-full-week',
        'first-day-of-year',
        'first-4-day-week',
        null,
      ] as WeekNumberType[]
    ).map(n => getWeekNumber(n, new Date(testDate)));

    assert.equal(result, expected);
  });
});

test.run();
