import { deepClone } from '../index.js';

test('throws when deeply clone a Null', async () => {
  try {
    const nu = null;
    await deepClone(nu);
  } catch (e) {
    expect(e).toStrictEqual(new TypeError(`'target' is not defined`));
  }
});

test('throws when deeply clone a Undefined', async () => {
  try {
    const un = undefined;
    await deepClone(un);
  } catch (e) {
    expect(e).toStrictEqual(new TypeError(`'target' is not defined`));
  }
});
