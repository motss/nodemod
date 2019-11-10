import { WeekNumberType } from '../calendar_typing.js';
import { getWeekNumber } from '../get-week-number.js';

type TestError = [string, [undefined | null, undefined | null]];
test.each<TestError>([
  [`void, void`, [void 0, void 0]],
  [`void, null`, [void 0, null]],
  [`null, void`, [null, void 0]],
  [`null, null`, [null, null]],
])(`getWeekNumber(%s)`, (_, a) => {
  try {
    getWeekNumber(...(a as [any, any]));
  } catch (e) {
    expect(e.name).toStrictEqual(TypeError.name);
    expect(e.message).toMatch('getUTCDay');
  }
});

type TestSuccess = [string, [number, number, number, number]];
test.each<TestSuccess>([
  // tslint:disable: array-bracket-spacing
  ['2010-01-01', [52, 1, 52, 1]],
  ['2011-01-01', [52, 1, 52, 1]],
  ['2012-01-01', [ 1, 1,  1, 1]],
  ['2013-01-01', [53, 1,  1, 1]],
  ['2014-01-01', [52, 1,  1, 1]],
  ['2015-01-01', [52, 1, 53, 1]],
  ['2016-01-01', [52, 1, 52, 1]],
  ['2017-01-01', [ 1, 1,  1, 1]],
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
  // tslint:enable: array-bracket-spacing
])(`getWeekNumber(%s, ...)`, (a, expected) => {
  const d = (
    [
      'first-full-week',
      'first-day-of-year',
      'first-4-day-week',
      null,
    ] as WeekNumberType[]
  ).map(n => getWeekNumber(n, new Date(a)));

  expect(d.map(n => n.weekNumber)).toEqual(expected);
});
