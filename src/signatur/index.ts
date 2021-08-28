import { createHmac } from 'crypto';

import type {
  DecodedData,
  SignaturOptions,
  SignaturReturnError,
  UnknownRecord,
} from './custom_typings';

export class SignaturError extends Error {
  public type: string;

  constructor(type: string, message: string) {
    super();

    this.name = 'SignaturError';
    this.message = message;
    this.type = type;
  }

  public toJSON(): SignaturReturnError {
    return {
      error: {
        type: this.type,
        message: this.message,
      },
    };
  }
}

function urlSafeBase64(s: string) {
  return s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function signSync<T = UnknownRecord>(
  data: T,
  secret: string,
  options?: SignaturOptions
): string {
  const { separator = '.' }: SignaturOptions = options || {};

  if (null == data) {
    throw new TypeError(
      `Expected 'data' to be defined, but received '${JSON.stringify(data)}'`);
  }

  if ('string' !== typeof(secret) || !secret.length) {
    throw new TypeError(`Expected 'secret' to be defined, but received '${secret}'`);
  }

  const stringData = JSON.stringify({ data });
  const encoded = Buffer.from(stringData, 'utf8').toString('base64');
  const signature = createHmac('sha256', secret).update(stringData).digest('base64');

  return urlSafeBase64(`${encoded}${separator}${signature}`);
}

export function unsignSync<T = UnknownRecord>(
  signature: string,
  secret: string,
  options?: SignaturOptions
): T {
  const { separator = '.' } = options || {} as SignaturOptions;

  if ('string' !== typeof(signature) || !signature.length) {
    throw new TypeError(`Expected 'signature' to be defined, but received '${signature}'`);
  }

  if ('string' !== typeof(secret) || !secret.length) {
    throw new TypeError(`Expected 'secret' to be defined, but received '${secret}'`);
  }

  const [hash, enc] = signature.split(separator, 2);
  const decoded = Buffer.from(
    (hash + '==='.slice((hash.length + 3) % 4))
      .replace(/-/g, '+')
      .replace(/_/g, '/'), 'base64')
    .toString('utf8');
  const signedDecoded = urlSafeBase64(
    createHmac('sha256', secret).update(decoded).digest('base64'));

  if (enc !== signedDecoded) {
    throw new SignaturError('invalid_signature', 'Signature not match');
  }

  return (JSON.parse(decoded) as DecodedData<T>).data;
}

export async function sign<T = UnknownRecord>(
  data: T,
  secret: string,
  options?: SignaturOptions
): Promise<string> {
  return signSync<T>(data, secret, options);
}

export async function unsign<T = UnknownRecord>(
  signature: string,
  secret: string,
  options?: SignaturOptions
): Promise<T> {
  return unsignSync<T>(signature, secret, options);
}
