import { utcDate } from '..';

it(`throws when first argument is 'null'`, async () => {
  try {
    await utcDate(null!);
  } catch (e) {
    expect(e).toStrictEqual(
      new TypeError(`Cannot destructure property \`startDate\` of 'undefined' or 'null'.`));
  }
});

it(`throws when invalid 'year'`, async () => {
  try {
    await utcDate({ offset: { year: NaN } });
  } catch (e) {
    expect(e).toStrictEqual(
      new TypeError(`Expected 'year' to be a valid number, but received '${NaN}'`));
  }
});

it(`throws when invalid 'month'`, async () => {
  try {
    await utcDate({ offset: { month: NaN } });
  } catch (e) {
    expect(e).toStrictEqual(
      new TypeError(`Expected 'month' to be a valid number, but received '${NaN}'`));
  }
});

it(`throws when invalid 'day'`, async () => {
  try {
    await utcDate({ offset: { day: NaN } });
  } catch (e) {
    expect(e).toStrictEqual(
      new TypeError(`Expected 'day' to be a valid number, but received '${NaN}'`));
  }
});
