import { Buffer, hmac as hmac2, sha256 } from '../lib.js';

export function hmac(secret: string, data: string): string {
  const buf = hmac2(sha256 as unknown as BlockHash<any>, secret).update(data).digest();

  return Buffer.from(buf).toString('base64');
}
