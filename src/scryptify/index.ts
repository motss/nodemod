import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const IV_LENGTH = 16; /** For AES, this is always 16 */

function validateInputs(text: string, secret: string) {
  if ('string' !== typeof(text)) {
    throw new TypeError(`Expected 'text' to be a string, but received '${text}'`);
  } else if ('string' !== typeof(secret)) {
    throw new TypeError(`Expected 'secret' to be a string, but received '${secret}'`);
  } else if (text.length < 1) {
    throw new Error(`'text' must not be an empty string`);
  } else if (secret.length !== 32) {
    throw new RangeError(`Invalid length of 'secret'. Must be 256 bytes or 32 characters long`);
  }
}

export function encryptSync(text: string, secret: string) {
  validateInputs(text, secret);

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(secret), iv);
  const cipherInitial = cipher.update(Buffer.from(text));
  const encrypted = Buffer.concat([cipherInitial, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptSync(text: string, secret: string) {
  validateInputs(text, secret);

  const [iv, encrypted] = text.split(':');
  const decipher = createDecipheriv(
    'aes-256-cbc',
    Buffer.from(secret),
    Buffer.from(iv, 'hex')
  );
  const decipherInitial = decipher.update(Buffer.from(encrypted, 'hex'));
  const decrypted = Buffer.concat([decipherInitial, decipher.final()]);

  return decrypted.toString();
}

export async function encrypt(text: string, secret: string) {
  return encryptSync(text, secret);
}

export async function decrypt(text: string, secret: string) {
  return decryptSync(text, secret);
}
