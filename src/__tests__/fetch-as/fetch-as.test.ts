import { rest } from 'msw';
import { setupServer } from 'msw/node';
import fetch from 'node-fetch';
import { Buffer } from 'safe-buffer';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { fetchAsArrayBuffer, fetchAsBlob, fetchAsJson, fetchAsText } from '../../fetch-as/index';
import { errorData, successData, url } from './CONSTANTS';

const server = setupServer(
  rest.get(`${url}/ok`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...successData,
      })
    );
  }),
  rest.get(`${url}/error`, (_, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({ ...errorData })
    );
  }),
  rest.get(`${url}/timeout`, (_, res, ctx) => {
    return res(
      ctx.delay(5e3),
      ctx.status(500),
      ctx.json({})
    );
  })
);

test.before(() => {
  Object.assign(globalThis, { fetch });
  server.listen();
});

test.after.each(() => {
  server.resetHandlers()
});

test.after(() => {
  Object.assign(globalThis, { fetch: undefined });
  server.close();
});

test('throws when invalid URL', async () => {
  const { status, error } = await fetchAsJson('/invalid-url');

  assert.is(status, -1);
  assert.equal(error, new TypeError('Only absolute URLs are supported'));
});

test(`returns response with 'fetchAsArrayBuffer'`, async () => {
  const {
    status,
    data,
  } = await fetchAsArrayBuffer<ArrayBuffer>(`${url}/ok`);

  assert.is(status, 200);
  assert.equal(
    data && Buffer.from(data),
    Buffer.from(JSON.stringify({ ...successData }))
  );
});

test(`returns response with 'fetchAsBlob'`, async () => {
  const {
    status,
    data,
  } = await fetchAsBlob(`${url}/ok`);

  assert.is(status, 200);
  assert.is(data?.size, 16);
  assert.is(data?.type, 'application/json');
});

test(`returns response with 'fetchAsJson'`, async () => {
  const { status, data } = await fetchAsJson(`${url}/ok`);

  assert.is(status, 200);
  assert.equal(data, successData);
});

test(`returns response with 'fetchAsText'`, async () => {
  const { status, data } = await fetchAsText(`${url}/ok`);

  assert.is(status, 200);
  assert.equal(data, JSON.stringify({ ...successData }));
});

test(`returns failed response with 'fetchAsArrayBuffer'`, async () => {
  const { status, error } = await fetchAsArrayBuffer(`${url}/error`);

  assert.ok(status > 399);
  assert.equal(
    error && Buffer.from(error),
    Buffer.from(JSON.stringify({ ...errorData }))
  );
});

test(`returns failed response with 'fetchAsBlob'`, async () => {
  const { status, error } = await fetchAsBlob(`${url}/error`);

  assert.ok(status > 399);
  assert.is(error?.size, 42);
  assert.is(error?.type, 'application/json');
});

test(`returns failed response with 'fetchAsJson'`, async () => {
  const { status, error } = await fetchAsJson(`${url}/error`);

  assert.ok(status > 399);
  assert.equal(error, errorData);
});

test(`returns failed response with 'fetchAsText'`, async () => {
  const { status, error } = await fetchAsText(`${url}/error`);

  assert.ok(status > 399);
  assert.is(error, JSON.stringify({ ...errorData }));
});

test.run()

// it(`returns response with 'fetchAsBuffer'`, async () => {
  //   try {
    //     const d = await fetchAsBuffer(`${url}/ok`);

    //     expect(d.status).toStrictEqual(200);
    //     expect(d.data).toStrictEqual(Buffer.from(JSON.stringify({ ...successData })));
    //   } catch (e) {
//     throw e;
//   }
// });

// it(`returns response with 'fetchAsTextConverted'`, async () => {
//   try {
  //     const d = await fetchAsTextConverted(`${url}/ok`);

  //     expect(d.data).toStrictEqual(JSON.stringify({ ...successData }));
  //   } catch (e) {
    //     throw e;
    //   }
    // });

// it(`returns response with defined 'info'`, async () => {
  //   try {
    //     const d = await fetchAsJson<TestSuccessData>(`${url}/ok`, { timeout: 3e3 });

    //     expect(d).toStrictEqual({
//       status: 200,
//       info: {
//         headers: { 'content-type': 'application/json' },
//         size: 0,
//         timeout: 3e3,
//         type: undefined!,
//       },

//       data: { ...successData },
//     } as FetchAsReturnType<TestSuccessData>);
//   } catch (e) {
//      throw e;
//   }
// });

// test(`returns failed response with 'fetchAsBuffer'`, async () => {
//   try {
//     const {  } = await fetchAsBuffer(`${url}/error`);

//     expect(d.status).toBeGreaterThan(399);
//     expect(d.error).toStrictEqual(Buffer.from(JSON.stringify({ ...errorData })));
//   } catch (e) {
//     throw e;
//   }
// });


// it(`returns failed response with 'fetchAsTextConverted`, async () => {
//   try {
//     const d = await fetchAsTextConverted(`${url}/error`);

//     expect(d.status).toBeGreaterThan(399);
//     expect(d.error).toStrictEqual(JSON.stringify({ ...errorData }));
//   } catch (e) {
//     throw e;
//   }
// });
