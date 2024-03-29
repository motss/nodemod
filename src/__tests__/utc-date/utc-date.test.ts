import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { utcDate } from '../../utc-date/index';

test('returns UTC date with any arguments', async () => {
  const d = await utcDate();

  assert.equal(d, new Date(new Date().toJSON().replace(/^(.+)T.+/i, '$1')));
});

test(`returns UTC date with defined 'startDate'`, async () => {
  const d = await utcDate({ startDate: '2018-03-03' });

  assert.equal(d, new Date(new Date('2018-03-03').toJSON()));
});

test(`returns UTC date with defined 'offset'`, async () => {
  const dated = new Date();
  const exp = new Date(Date.UTC(
    dated.getUTCFullYear() + 1, dated.getUTCMonth() + 2, dated.getUTCDate()));
  const d = await utcDate({ offset: { year: 1, month: 2 } });

  assert.equal(d, exp);
});

test(`returns UTC date with defined 'startDate' and 'offset'`, async () => {
  const d = await utcDate({ startDate: '2018-03-03', offset: { year: 1, month: 2 } });

  assert.equal(d, new Date(new Date('2019-05-03').toJSON()));
});

test.run();
