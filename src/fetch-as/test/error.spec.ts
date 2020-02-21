import { fetchAsJson } from '../index.js';
// import { url } from './CONSTANTS.js';

it('throws when invalid URL', async () => {
  const { status, error } = await fetchAsJson('/invalid-url');

  expect(status).toStrictEqual(-1);
  expect(error).toStrictEqual(new TypeError('Only absolute URLs are supported'));
});

// it('throws when socket timed out', async () => {
//   try {
//     await fetchAsJson(`${url}/timeout`, { timeout: 3e3 });
//   } catch (e) {
//     expect(e.type).toStrictEqual('request-timeout');
//     expect(e.message).toStrictEqual(`network timeout at: ${url}/timeout`);
//     expect(e.name).toStrictEqual('FetchError');
//   }
// }, 10e3);
