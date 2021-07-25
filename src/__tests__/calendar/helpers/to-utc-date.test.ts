import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { toUTCDate } from '../../../calendar/index';

type TestInput = undefined | null | string | number;
type TestSuccess = [[TestInput, TestInput, TestInput], Date];


([
  [[void 0, void 0, void 0], new Date(undefined as never)],

  [[null, null, null], new Date('1899-12-31')],
  [[2020, 1, 2], new Date('2020-02-02')],
  [['2020', '1', '2'], new Date('2020-02-02')],
] as TestSuccess[]).forEach(([
  testInit,
  expected,
]) => {
  test(`UTC date ([year, month, date]: ${[...testInit]})`, () => {
    const result = toUTCDate(...(testInit as [never, never, never]));

    if (Number.isNaN(+expected)) {
      assert.ok(result instanceof Date && Number.isNaN(+result));
    } else {
      assert.equal(result, expected);
    }
  });
});

test.run()
