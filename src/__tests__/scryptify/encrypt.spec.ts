import { encrypt } from '../../scryptify/index.js';
import { rawData, secret } from './CONSTANTS.js';

test('encryption works', async () => {
  const encrypted = await encrypt(rawData, secret);

  expect(encrypted).toMatch(/^([a-z\d]+):(?:[a-z\d]+)$/i);
});

test('encryption always produces unique output', async () => {
  const encryptedSet = new Set();
  const len = 1e4;
  const tasks = Array.from(Array(len), async () => {
    const encrypted = await encrypt(rawData, secret);
    encryptedSet.add(encrypted);
  });

  await Promise.all(tasks);

  expect(encryptedSet.size).toStrictEqual(len);
});
