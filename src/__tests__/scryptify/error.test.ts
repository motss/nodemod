import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { encrypt } from '../../scryptify/index';
import { rawData } from './CONSTANTS';

test(`'text' not string`, async () => {
  try {
    await encrypt(null as never, null as never);
  } catch (e) {
    assert.equal(e, new TypeError(`Expected 'text' to be a string, but received 'null'`));
  }
});

test(`'secret' not string`, async () => {
  try {
    await encrypt(rawData, null as never);
  } catch (e) {
    assert.equal(e, new TypeError(`Expected 'secret' to be a string, but received 'null'`));
  }
});

test(`invalid 'text'`, async () => {
  try {
    await encrypt('', 'haha');
  } catch (e) {
    assert.equal(e, new Error(`'text' must not be an empty string`));
  }
});

test('a 256 bytes salt is required', async () => {
  try {
    await encrypt(rawData, 'haha');
  } catch (e) {
    assert.equal(e, new RangeError(`Invalid length of 'secret'. Must be 256 bytes or 32 characters long`));
  }
});

test.run();
