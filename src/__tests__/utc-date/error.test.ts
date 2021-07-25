import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { utcDate } from '../../utc-date/index';

test(`throws when first argument is 'null'`, async () => {
  try {
    await utcDate(null as never);
  } catch (e) {
    assert.is(e.name, 'TypeError');
    assert.ok([
      `Cannot destructure property \`startDate\` of 'undefined' or 'null'.`,
      `Cannot destructure property 'startDate' of '(intermediate value)(intermediate value)(intermediate value)' as it is null.`,
    ].some(n => e.message === n));
  }
});

test(`throws when invalid 'year'`, async () => {
  try {
    await utcDate({ offset: { year: NaN } });
  } catch (e) {
    assert.equal(
      e,
      new TypeError(`Expected 'year' to be a valid number, but received '${NaN}'`)
    );
  }
});

test(`throws when invalid 'month'`, async () => {
  try {
    await utcDate({ offset: { month: NaN } });
  } catch (e) {
    assert.equal(
      e,
      new TypeError(`Expected 'month' to be a valid number, but received '${NaN}'`)
    );
  }
});

test(`throws when invalid 'day'`, async () => {
  try {
    await utcDate({ offset: { day: NaN } });
  } catch (e) {
    assert.equal(
      e,
      new TypeError(`Expected 'day' to be a valid number, but received '${NaN}'`)
    );
  }
});

test.run()
