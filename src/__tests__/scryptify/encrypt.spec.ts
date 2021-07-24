import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { encrypt } from '../../scryptify/index';
import { rawData, secret } from './CONSTANTS';

test('encryption works', async () => {
  const encrypted = await encrypt(rawData, secret);

  assert.match(encrypted, /^([a-z\d]+):(?:[a-z\d]+)$/i);
});

test('encryption always produces unique output', async () => {
  const encryptedSet = new Set();
  const len = 1e4;
  const tasks = Array.from(Array(len), async () => {
    const encrypted = await encrypt(rawData, secret);
    encryptedSet.add(encrypted);
  });

  await Promise.all(tasks);

  assert.is(encryptedSet.size, len);
});

test.run();
