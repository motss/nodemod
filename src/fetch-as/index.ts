import type {
  ExtendedFetchResponse,
  FetchAsReturnType,
  FetchType,
  UnknownRecord,
} from './custom_typings.js';

// import {
//   Blob,
//   Body,
//   Headers,
//   RequestInit,
//   Response,
// } from 'node-fetch';

// import fetch from 'node-fetch';

function getResponseHeaders(headers: Headers) {
  const d: UnknownRecord = {};

  for (const [k, v] of headers) {
    d[k] = v;
  }

  return d;
}

function fetchAs<T, U>(fetchType: FetchType): (
  url: string,
  options?: RequestInit
) => Promise<FetchAsReturnType<T, U>> {
  return async (url: string, options?: RequestInit): Promise<FetchAsReturnType<T, U>> => {
    let status = -1;
    let headers: UnknownRecord = {};
    let size = -1;
    let timeout = -1;
    let type: ResponseType = 'basic';

    try {
      const r = await fetch(url, options);
      const d = await r[fetchType]();

      status = r.status;
      headers = getResponseHeaders(r.headers);
      size = (r as ExtendedFetchResponse).size || -1;
      timeout = (r as ExtendedFetchResponse).timeout || -1;
      type = r.type;

      return {
        status,
        info: { headers, size, timeout, type },
        [status > 399 ? 'error' : 'data']: d,
      };
    } catch (e) {
      return {
        status,
        info: { headers, size, timeout, type },
        error: e,
      };
    }
  };
}

export async function fetchAsArrayBuffer<T = ArrayBuffer, U = ArrayBuffer>(
  url: string, options?: RequestInit) {
  return fetchAs<T, U>('arrayBuffer')(url, options);
}

export async function fetchAsBlob<T = Blob, U = Blob>(
  url: string, options?: RequestInit) {
  return fetchAs<T, U>('blob')(url, options);
}

// export async function fetchAsBuffer<T = Buffer, U = Buffer>(
//   url: string, options?: RequestInit) {
//   return fetchAs<T, U>('buffer')(url, options);
// }

export async function fetchAsJson<T = {}, U = {}>(url: string, options?: RequestInit) {
  return fetchAs<T, U>('json')(url, options);
}

export async function fetchAsText<T = string, U = any>(
  url: string, options?: RequestInit) {
  return fetchAs<T, U>('text')(url, options);
}

// export async function fetchAsTextConverted<T = string, U = any>(
//   url: string, options?: RequestInit) {
//   return fetchAs<T, U>('textConverted')(url, options);
// }

export default {
  arrayBuffer: fetchAsArrayBuffer,
  blob: fetchAsBlob,
  // buffer: fetchAsBuffer,
  json: fetchAsJson,
  text: fetchAsText,
  // textConverted: fetchAsTextConverted,
};
