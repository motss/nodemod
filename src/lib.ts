// @ts-ignore
import aes from 'browserify-aes/browser.js';
// @ts-ignore
import { sync as randomBytes } from 'random-bytes';
// import randomBytes from 'randombytes/browser.js';

// @ts-check
import hash from 'hash.js';
import cloneDeep from 'lodash-es/cloneDeep.js';

const { hmac, sha256 } = hash;
const { createCipheriv, createDecipheriv } = aes;

export { parse, parseFragment, serialize } from 'parse5';
export { Buffer } from 'safe-buffer';
export { cloneDeep, hmac, sha256, randomBytes, createCipheriv, createDecipheriv };
