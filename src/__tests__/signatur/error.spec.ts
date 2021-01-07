import { sign, unsign } from '../../signatur/index.js';
import { data, secret } from './CONSTANTS.js';

it(`throws when undefined 'data'`, async () => {
  try {
    await sign(null as never, null as never);
  } catch (e) {
    expect(e).toStrictEqual(
      new TypeError(`Expected 'data' to be defined, but received 'null'`));
  }
});

it(`throws when undefined 'secret'`, async () => {
  try {
    await sign(data, null as never);
  } catch (e) {
    expect(e).toStrictEqual(
      new TypeError(`Expected 'secret' to be defined, but received 'null'`));
  }
});

// tslint:disable-next-line: max-line-length
const signature = 'eyJkYXRhIjp7InNlY3JldEluc2lkZSI6IjEyMyIsInNlY3JldEtleSI6NDU2fX0.WlF_-gDYzfBBPksdvhVvaP_MQ9PWoRiwADbI3MapRg4';

it(`throws when undefined 'signature'`, async () => {
  try {
    await unsign(null as never, null as never);
  } catch (e) {
    expect(e).toStrictEqual(
      new TypeError(`Expected 'signature' to be defined, but received 'null'`));
  }
});

it(`throws when undefined 'secret'`, async () => {
  try {
    await unsign(signature, null as never);
  } catch (e) {
    expect(e).toStrictEqual(
      new TypeError(`Expected 'secret' to be defined, but received 'null'`));
  }
});

it('throws when signature not match', async () => {
  try {
    await unsign('123.456', secret);
  } catch (e) {
    expect(e.toJSON()).toStrictEqual({
      error: {
        type: 'invalid_signature',
        message: 'Signature not match',
      },
    });
  }
});
