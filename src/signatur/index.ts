export interface SignaturOptions {
  separator?: string;
}

interface DecodedData<T> {
  data: T;
}
interface SignaturReturnError {
  error: {
    type: string;
    message: string;
  };
}

type UnknownRecord = Record<string, unknown>;

import { Buffer } from 'safe-buffer';
import { hmac } from './hmac';

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
  return s.replace(/\+/gi, '-').replace(/\//gi, '_').replace(/=/gi, '');
}

export function signSync<T = UnknownRecord>(
  data: T,
  secret: string,
  options?: SignaturOptions
) {
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
  const signature = hmac(secret, stringData);

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
      .replace(/\-/gi, '+')
      .replace(/_/gi, '/'), 'base64')
    .toString('utf8');
  const signedDecoded = urlSafeBase64(hmac(secret, decoded));

  if (enc !== signedDecoded) {
    throw new SignaturError('invalid_signature', 'Signature not match');
  }

  return (JSON.parse(decoded) as DecodedData<T>).data;
}

export async function sign<T = UnknownRecord>(
  data: T,
  secret: string,
  options?: SignaturOptions
) {
  return signSync<T>(data, secret, options);
}

export async function unsign<T = UnknownRecord>(
  signature: string,
  secret: string,
  options?: SignaturOptions
): Promise<T> {
  return unsignSync<T>(signature, secret, options);
}

export default {
  signSync,
  unsignSync,

  sign,
  unsign,
};
