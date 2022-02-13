import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { deepClone } from '../../deep-clone/index';
import { object0, object1, object2 } from './CONSTANTS';

[undefined, null].forEach((testInit) => {
  test(`throws when deeply cloning a ${testInit}`, async () => {
    try {
      await deepClone(testInit);
    } catch (e: unknown) {
      assert.equal(e, new TypeError(`'target' is not defined`));
    }
  });
});

test('deeply clone an nested Object', async () => {
  const result = await deepClone(object1);

  assert.equal(result, object1);
});

test('truly deep clone an nested Object', async () => {
  const result = await deepClone<typeof object1>(object1);

  result.a.b.c = {} as never;
  Object.assign(result, { e: {} });

  assert.not.equal(result, object0);
});

test('deeply clone an nested Array', async () => {
  const result = await deepClone(object2);

  assert.equal(result, object2);
});

test('deeply clone a non-nested Object', async () => {
  const shallowObj = {
    a: 'shallow-string',
    b: [1, 2, 3],
    c: 999,
    d: null,
  };
  const result = await deepClone(shallowObj);

  assert.equal(result, shallowObj);
});

test('truly deep clone a non-nested Object', async () => {
  const shallowObj = {
    a: 'shallow-string',
    b: [1, 2, 3],
    c: 999,
    d: null,
  };
  const result = await deepClone(shallowObj);

  /** Delete properties */
  Object.assign(result, {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
  });

  assert.not.equal(result, shallowObj);
});

test('deeply clone a non-nested Array', async () => {
  const shallowArr = [
    null, 1, 2, { a: 1 }, 'shallow-string',
  ];
  const result = await deepClone(shallowArr);

  assert.equal(result, shallowArr);
});

test('truly deep clone a non-nested Array', async () => {
  const shallowArr: unknown[] = [
    null, 1, 2, { a: 1 }, 'shallow-string',
  ];
  const result = await deepClone(shallowArr);

  result[3] = {};

  assert.not.equal(result, shallowArr);
});

test('deeply clone a String', async () => {
  const str = 'just a string';
  const result = await deepClone(str);

  assert.equal(str, result);
});

test('deeply clone a Number', async () => {
  const num = 999;
  const result = await deepClone(num);

  assert.equal(result, num);
});

test('deeply clone a Boolean', async () => {
  const bool = !0;
  const result = await deepClone(bool);

  assert.equal(result, bool);
});

test(`deep cloning with 'absolute: true'`, async () => {
  const result = await deepClone(object0, { absolute: true });

  assert.equal(result, object0);
});

test(`deep cloning with 'absolute: true' before mutating cloned object`, async () => {
  const result = await deepClone<typeof object0>(object0, { absolute: true });

  result.a.b = {} as never;

  assert.not.equal(result, object0);
});

test.run();
