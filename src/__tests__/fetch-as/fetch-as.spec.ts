import nock from 'nock';
import fetch from 'node-fetch';
import { Buffer } from 'safe-buffer';

import { fetchAsArrayBuffer, fetchAsBlob, fetchAsJson, fetchAsText } from '../../fetch-as/index.js';
import { errorData, successData, url } from './CONSTANTS.js';
import type { TestErrorData, TestSuccessData } from './test_typings.js';

function errorNock(uri: string, data: TestErrorData) {
  return nock(uri)
    .persist(true)
    .get(n => /^\/error/i.test(n))
    .reply(404, () => {
      return { ...data };
    });
}

function successNock(uri: string, data: TestSuccessData) {
  return nock(uri)
    .persist(true)
    .get(n => /^\/ok/i.test(n))
    .reply(200, () => {
      return { ...data };
    });
}

// function timeoutNock(url: string) {
//   return nock(url)
//     .persist(true)
//     // .log(console.log)
//     .get(uri => /^\/timeout/i.test(uri))
//     .delay(5e3)
//     .reply(500, () => {
//       return {};
//     });
// }

let nocks: (nock.Scope)[];

beforeAll(() => {
  Object.assign(global, { fetch });
  nocks = [
    errorNock(url, errorData),
    // timeoutNock(url),

    successNock(url, successData),
  ];
});

describe('fetch-as::success', () => {
  it(`returns response with 'fetchAsArrayBuffer'`, async () => {
    const d = await fetchAsArrayBuffer<ArrayBuffer>(`${url}/ok`);

    expect(d.status).toStrictEqual(200);
    expect(d.data && Buffer.from(d.data)).toStrictEqual(Buffer.from(JSON.stringify({ ...successData })));
  });

  it(`returns response with 'fetchAsBlob'`, async () => {
    const d = await fetchAsBlob(`${url}/ok`);

    expect(d.status).toStrictEqual(200);
    expect(d.data?.size).toStrictEqual(16);
    expect(d.data?.type).toStrictEqual('application/json');
  });

  // it(`returns response with 'fetchAsBuffer'`, async () => {
  //   try {
  //     const d = await fetchAsBuffer(`${url}/ok`);

  //     expect(d.status).toStrictEqual(200);
  //     expect(d.data).toStrictEqual(Buffer.from(JSON.stringify({ ...successData })));
  //   } catch (e) {
  //     throw e;
  //   }
  // });

  it(`returns response with 'fetchAsJson'`, async () => {
    const d = await fetchAsJson(`${url}/ok`);

    expect(d.status).toStrictEqual(200);
    expect(d.data).toStrictEqual({ ...successData });
  });

  it(`returns response with 'fetchAsText'`, async () => {
    const d = await fetchAsText(`${url}/ok`);

    expect(d.status).toStrictEqual(200);
    expect(d.data).toStrictEqual(JSON.stringify({ ...successData }));
  });

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
  //     throw e;
  //   }
  // });
});

describe('fetch-as::failure', () => {
  it(`returns failed response with 'fetchAsArrayBuffer'`, async () => {
    const d = await fetchAsArrayBuffer(`${url}/error`);

    expect(d.status).toBeGreaterThan(399);
    expect(d.error && Buffer.from(d.error)).toStrictEqual(Buffer.from(JSON.stringify({ ...errorData })));
  });

  it(`returns failed response with 'fetchAsBlob'`, async () => {
    const d = await fetchAsBlob(`${url}/error`);

    expect(d.status).toBeGreaterThan(399);
    expect(d.error?.size).toStrictEqual(42);
    expect(d.error?.type).toStrictEqual('application/json');
  });

  // it(`returns failed response with 'fetchAsBuffer'`, async () => {
  //   try {
  //     const d = await fetchAsBuffer(`${url}/error`);

  //     expect(d.status).toBeGreaterThan(399);
  //     expect(d.error).toStrictEqual(Buffer.from(JSON.stringify({ ...errorData })));
  //   } catch (e) {
  //     throw e;
  //   }
  // });

  it(`returns failed response with 'fetchAsJson'`, async () => {
    const d = await fetchAsJson(`${url}/error`);

    expect(d.status).toBeGreaterThan(399);
    expect(d.error).toStrictEqual({ ...errorData });
  });

  it(`returns failed response with 'fetchAsText'`, async () => {
    const d = await fetchAsText(`${url}/error`);

    expect(d.status).toBeGreaterThan(399);
    expect(d.error).toStrictEqual(JSON.stringify({ ...errorData }));
  });

  // it(`returns failed response with 'fetchAsTextConverted`, async () => {
  //   try {
  //     const d = await fetchAsTextConverted(`${url}/error`);

  //     expect(d.status).toBeGreaterThan(399);
  //     expect(d.error).toStrictEqual(JSON.stringify({ ...errorData }));
  //   } catch (e) {
  //     throw e;
  //   }
  // });

  afterAll(() => {
    nocks.forEach(n => n.persist(false));
    nock.cleanAll();
  });

});
