import fetch from 'node-fetch';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { fetchAsJson } from '../../fetch-as/index';

test.before(() => {
  Object.assign(global, { fetch });
});

test('throws when invalid URL', async () => {
  const { status, error } = await fetchAsJson('/invalid-url');

  assert.is(status, -1);
  assert.equal(error, new TypeError('Only absolute URLs are supported'));
});

test.run();

// it('throws when socket timed out', async () => {
//   try {
//     await fetchAsJson(`${url}/timeout`, { timeout: 3e3 });
//   } catch (e) {
//     expect(e.type).toStrictEqual('request-timeout');
//     expect(e.message).toStrictEqual(`network timeout at: ${url}/timeout`);
//     expect(e.name).toStrictEqual('FetchError');
//   }
// }, 10e3);
