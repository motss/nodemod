import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { decrypt, encrypt } from '../../scryptify/index';
import { rawData, secret } from './CONSTANTS';

test('decryption works', async () => {
  const encrypted = await encrypt(rawData, secret);
  const decrypted = await decrypt(encrypted, secret);

  assert.equal(decrypted, rawData);
});

test('decryption always works on unique encrypted sets from the same raw data', async () => {
  const encryptedSet = new Set<string>();
  const len = 1e4;
  const encryptTasks = Array.from(Array(len), async () => {
    encryptedSet.add(await encrypt(rawData, secret));
  });

  await Promise.all(encryptTasks);

  for (const n of encryptedSet) {
    const decrypted = await decrypt(n, secret);

    assert.equal(decrypted, rawData);
  }
});

test.run();
