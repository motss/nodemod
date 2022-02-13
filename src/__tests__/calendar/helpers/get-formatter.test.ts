import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { getFormatter } from '../../../calendar/index';

([
  undefined,
  null,
] as (undefined | null)[]).forEach((testInit) => {
  test(`formatter (${testInit})`, () => {
    assert.throws(
      getFormatter(testInit as never),
      (error: unknown) => error instanceof TypeError
    );
  });
});

type TestSuccess = [string, Intl.DateTimeFormat, Date, string];
([
  [`Intl.DateTimeFormat`, Intl.DateTimeFormat('ja-JP', { day: 'numeric' }), new Date('2020-02-02'), '2日'],
] as TestSuccess[]).forEach(([
  testName,
  testFormatter,
  testDate,
  expected,
]) => {
  test(`formatter (${testName})`, () => {
    const result = getFormatter(testFormatter)(testDate);

    assert.is(result, expected);
  });
});

test.run();
