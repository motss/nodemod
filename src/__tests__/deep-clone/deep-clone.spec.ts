import { deepClone } from '../../deep-clone/index.js';
import { awno, owno, towno } from './CONSTANTS.js';

test('deeply clone an nested Object', async () => {
  const dc = await deepClone(owno);

  expect(dc).toStrictEqual(owno);
});

test('truly deep clone an nested Object', async () => {
  const dc = await deepClone<typeof owno>(owno);

  dc.a.b.c = {} as never;
  Object.assign(dc, { e: {} });

  expect(dc).not.toStrictEqual(owno);
});

test('deeply clone an nested Array', async () => {
  const dc = await deepClone(awno);

  expect(dc).toStrictEqual(awno);
});

test('deeply clone a non-nested Object', async () => {
  const shallowObj = {
    a: 'shallow-string',
    b: [1, 2, 3],
    c: 999,
    d: null,
  };
  const dc = await deepClone(shallowObj);

  expect(dc).toStrictEqual(shallowObj);
});

test('truly deep clone a non-nested Object', async () => {
  const shallowObj = {
    a: 'shallow-string',
    b: [1, 2, 3],
    c: 999,
    d: null,
  };
  const dc = await deepClone(shallowObj);

  /** Delete properties */
  Object.assign(dc, {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
  });

  expect(dc).not.toStrictEqual(shallowObj);
});

test('deeply clone a non-nested Array', async () => {
  const shallowArr = [
    null, 1, 2, { a: 1 }, 'shallow-string',
  ];
  const dc = await deepClone(shallowArr);

  expect(dc).toStrictEqual(shallowArr);
});

test('deeply clone a non-nested Array', async () => {
  const shallowArr = [
    null, 1, 2, { a: 1 }, 'shallow-string',
  ];
  const dc = await deepClone(shallowArr);

  expect(dc).toStrictEqual(shallowArr);
});

test('truly deep clone a non-nested Array', async () => {
  const shallowArr: unknown[] = [
    null, 1, 2, { a: 1 }, 'shallow-string',
  ];
  const dc = await deepClone(shallowArr);

  dc[3] = {};

  expect(dc).not.toStrictEqual(shallowArr);
});

test('deeply clone a String', async () => {
  const str = 'just a string';
  const dc = await deepClone(str);

  expect(str).toStrictEqual(dc);
});

test('deeply clone a Number', async () => {
  const num = 999;
  const dc = await deepClone(num);

  expect(num).toStrictEqual(dc);
});

test('deeply clone a Boolean', async () => {
  const bo = !0;
  const dc = await deepClone(bo);

  expect(bo).toStrictEqual(dc);
});

test(`deep cloning with 'absolute: true'`, async () => {
  const dc = await deepClone(towno, { absolute: true });

  expect(dc).toStrictEqual(towno);
});

test(`deep cloning with 'absolute: true' before mutating cloned object`, async () => {
  const dc = await deepClone<typeof towno>(towno, { absolute: true });

  dc.a.b = {} as never;

  expect(dc).not.toStrictEqual(towno);
});
