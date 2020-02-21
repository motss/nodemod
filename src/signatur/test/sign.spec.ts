import { sign } from '../index.js';
import { data, secret } from './CONSTANTS.js';

it('returns', async () => {
  const d = await sign(data, secret);

  // tslint:disable-next-line:max-line-length
  expect(d).toStrictEqual('eyJkYXRhIjp7InNlY3JldEluc2lkZSI6IjEyMyIsInNlY3JldEtleSI6NDU2fX0.WlF_-gDYzfBBPksdvhVvaP_MQ9PWoRiwADbI3MapRg4');
});

it(`returns with defined 'options[separator]'`, async () => {
  const d = await sign(data, secret, {
    separator: ':',
  });

  // tslint:disable-next-line:max-line-length
  expect(d).toStrictEqual('eyJkYXRhIjp7InNlY3JldEluc2lkZSI6IjEyMyIsInNlY3JldEtleSI6NDU2fX0:WlF_-gDYzfBBPksdvhVvaP_MQ9PWoRiwADbI3MapRg4');
});
