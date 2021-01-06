import { encrypt } from '../../scryptify/index.js';
import { rawData } from './CONSTANTS.js';

test(`'text' not string`, async () => {
  try {
    await encrypt(null!, null!);
  } catch (e) {
    expect(e).toStrictEqual(new TypeError(`Expected 'text' to be a string, but received 'null'`));
  }
});

test(`'secret' not string`, async () => {
  try {
    await encrypt(rawData, null!);
  } catch (e) {
    expect(e).toStrictEqual(new TypeError(`Expected 'secret' to be a string, but received 'null'`));
  }
});

test(`invalid 'text'`, async () => {
  try {
    await encrypt('', 'haha');
  } catch (e) {
    expect(e).toStrictEqual(new Error(`'text' must not be an empty string`));
  }
});

test('a 256 bytes salt is required', async () => {
  try {
    await encrypt(rawData, 'haha');
  } catch (e) {
    // tslint:disable-next-line: max-line-length
    expect(e).toStrictEqual(new RangeError(`Invalid length of 'secret'. Must be 256 bytes or 32 characters long`));
  }
});
