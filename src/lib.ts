import hash from 'hash.js';
import cloneDeep from 'lodash-es/cloneDeep.js';

const { hmac, sha256 } = hash;

export { parse, parseFragment, serialize } from 'parse5';
export { Buffer } from 'safe-buffer';
export { cloneDeep, hmac, sha256 };
