import { toUTCDate } from '../../../calendar/helpers/to-utc-date.js';

type TestInput = undefined | null | string | number;
type TestSuccess = [string, [TestInput, TestInput, TestInput], Date];
test.each<TestSuccess>([
  [`void, void, void`, [void 0, void 0, void 0], new Date(undefined as never)],

  [`null, null, null`, [null, null, null], new Date('1899-12-31')],
  [`2020, 1, 2`, [2020, 1, 2], new Date('2020-02-02')],
  [`'2020', '1', '2'`, ['2020', '1', '2'], new Date('2020-02-02')],
])(`utc date (%s)`, (_, a, expected) => {
  const d = toUTCDate(...(a as [never, never, never]));

  if (Number.isNaN(+expected)) {
    expect(d instanceof Date && Number.isNaN(+d)).toStrictEqual(true);
  } else {
    expect(d).toStrictEqual(expected);
  }
});
