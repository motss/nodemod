import { getFormatter } from '../../../calendar/index.js';

type TestError = [string, undefined | null];
test.each<TestError>([
  [`void`, void 0],
  [`null`, null],
])(`formatter (%s)`, (_, a) => {
  expect(getFormatter(a as never)).toThrowError(TypeError);
});

type TestSuccess = [string, Intl.DateTimeFormat, Date, string];
test.each<TestSuccess>([
  [`Intl.DateTimeFormat`, Intl.DateTimeFormat('ja-JP', { day: 'numeric' }), new Date('2020-02-02'), '2日'],
])(`formatter (%s)`, (_, a, b, expected) => {
  const d = getFormatter(a)(b);

  expect(d).toStrictEqual(expected);
});
