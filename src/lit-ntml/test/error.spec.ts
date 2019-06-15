import { html, htmlFragment } from '..';

it(`throws when error happens (html)`, async () => {
  try {
    const errorContent = async () => { throw new Error('error'); };
    await html`${errorContent}`;
  } catch (e) {
    expect(e).toStrictEqual(new Error('error'));
  }
});

it(`throws when error happens (htmlFragment)`, async () => {
  try {
    const errorContent = async () => { throw new Error('error'); };
    await htmlFragment`${errorContent}`;
  } catch (e) {
    expect(e).toStrictEqual(new Error('error'));
  }
});
