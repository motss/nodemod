import { normalize } from '../index.js';

it(`throws when invalid input`, async () => {
  try {
    await normalize(null);
  } catch (e) {
    expect(e).toStrictEqual(
      new TypeError(`Expected 'input' to be of type string, but received 'null'`));
  }
});

it(`throws when 'input' is 'undefined'`, async () => {
  try {
    await normalize();
  } catch (e) {
    expect(e).toStrictEqual(
      new TypeError(`Expected 'input' to be of type string, but received 'undefined'`));
  }
});
