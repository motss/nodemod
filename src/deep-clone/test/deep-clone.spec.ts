import { deepClone } from '../index.js';
import { awno, owno, towno } from './CONSTANTS.js';

test('deeply clone an nested Object', async () => {
  try {
    const dc = await deepClone(owno);

    expect(dc).toStrictEqual(owno);
  } catch (e) {
    throw e;
  }
});

test('truly deep clone an nested Object', async () => {
  try {
    const dc = await deepClone<any>(owno);

    dc.a.b.c = {};
    dc.e = {};

    expect(dc).not.toStrictEqual(owno);
  } catch (e) {
    throw e;
  }
});

test('deeply clone an nested Array', async () => {
  try {
    const dc = await deepClone(awno);

    expect(dc).toStrictEqual(awno);
  } catch (e) {
    throw e;
  }
});

test('deeply clone a non-nested Object', async () => {
  try {
    const shallowObj = {
      a: 'shallow-string',
      b: [1, 2, 3],
      c: 999,
      d: null,
    };
    const dc = await deepClone(shallowObj);

    expect(dc).toStrictEqual(shallowObj);
  } catch (e) {
    throw e;
  }
});

test('truly deep clone a non-nested Object', async () => {
  try {
    const shallowObj = {
      a: 'shallow-string',
      b: [1, 2, 3],
      c: 999,
      d: null,
    };
    const dc = await deepClone(shallowObj);

    delete dc.a;
    delete dc.b;
    delete dc.c;
    delete dc.d;

    expect(dc).not.toStrictEqual(shallowObj);
  } catch (e) {
    throw e;
  }
});

test('deeply clone a non-nested Array', async () => {
  try {
    const shallowArr = [
      null, 1, 2, { a: 1 }, 'shallow-string',
    ];
    const dc = await deepClone(shallowArr);

    expect(dc).toStrictEqual(shallowArr);
  } catch (e) {
    throw e;
  }
});

test('deeply clone a non-nested Array', async () => {
  try {
    const shallowArr = [
      null, 1, 2, { a: 1 }, 'shallow-string',
    ];
    const dc = await deepClone(shallowArr);

    expect(dc).toStrictEqual(shallowArr);
  } catch (e) {
    throw e;
  }
});

test('truly deep clone a non-nested Array', async () => {
  try {
    const shallowArr = [
      null, 1, 2, { a: 1 }, 'shallow-string',
    ];
    const dc = await deepClone<any>(shallowArr);

    dc[3] = {};

    expect(dc).not.toStrictEqual(shallowArr);
  } catch (e) {
    throw e;
  }
});

test('deeply clone a String', async () => {
  try {
    const str = 'just a string';
    const dc = await deepClone(str);

    expect(str).toStrictEqual(dc);
  } catch (e) {
    throw e;
  }
});

test('deeply clone a Number', async () => {
  try {
    const num = 999;
    const dc = await deepClone(num);

    expect(num).toStrictEqual(dc);
  } catch (e) {
    throw e;
  }
});

test('deeply clone a Boolean', async () => {
  try {
    const bo = !0;
    const dc = await deepClone(bo);

    expect(bo).toStrictEqual(dc);
  } catch (e) {
    throw e;
  }
});

test(`deep cloning with 'absolute: true'`, async () => {
  try {
    const dc = await deepClone(towno, { absolute: true });

    expect(dc).toStrictEqual(towno);
  } catch (e) {
    throw e;
  }
});

test(`deep cloning with 'absolute: true' before mutating cloned object`, async () => {
  try {
    const dc = await deepClone<any>(towno, { absolute: true });

    dc.a.b = {};

    expect(dc).not.toStrictEqual(towno);
  } catch (e) {
    throw e;
  }
});
