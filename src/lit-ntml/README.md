<div align='center' style='text-align: center;'>
  <h1 style='border-bottom: none;'>lit-ntml</h1>

  <p>Expressive HTML Templates</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> Lightweight, expressive, and modern templating for SSR in [Node.js], inspired by [lit-html].

## Table of contents <!-- omit in toc -->

- [Usage](#usage)
  - [html()](#html)
  - [htmlSync()](#htmlsync)
  - [htmlFragment()](#htmlfragment)
  - [htmlFragmentSync()](#htmlfragmentsync)
- [API Reference](#api-reference)
  - [html()](#html-1)
  - [htmlSync()](#htmlsync-1)
  - [htmlFragment()](#htmlfragment-1)
  - [htmlFragmentSync()](#htmlfragmentsync-1)
- [License](#license)

## Usage

### html()

```ts
import { html } from 'nodemod/dist/lit-ntml/index.js';

const peopleList = ['Cash Black', 'Vict Fisherman'];
const syncTask = () => `<h1>Hello, World!</h1>`;
const asyncLiteral = Promise.resolve('<h2>John Doe</h2>');
const asyncListTask = async () =>
  `<ul>${peopleList.map(n => `<li>${n}</li>`)}</ul>`;

/** Assuming top-level await is enabled... */
await html`${syncTask}${asyncLiteral}${asyncListTask}`;
/** <!DOCTYPE html><html><head></head><body><h1>Hello, World!</h1><h2>John Doe</h2><ul><li>Cash Black</li><li>Vict Fisherman</li></ul></body></html> */
```

### htmlSync()

```ts
import { htmlSync as html } from 'nodemod/dist/lit-ntml/index.js';

const peopleList = ['Cash Black', 'Vict Fisherman'];
const syncTask = () => `<h1>Hello, World!</h1>`;

html`${syncTask}${peopleList}`;
/** <!DOCTYPE html><html><head></head><body><h1>Hello, World!</h1>Cash BlackVictFisherman[object Promise]</body></html> */
```

### htmlFragment()

```ts
import { htmlFragment as html } from 'nodemod/dist/lit-ntml/index.js';

const syncTask = () => `<h1>Hello, World!</h1>`;
const externalStyleLiteral = `<style>body { margin: 0; padding: 0; box-sizing: border-box; }</style>`;

/** Assuming top-level await is enabled... */
await html`${externalStyleLiteral}${syncTask}`;
/** <style>body { margin: 0; padding: 0; box-sizing: border-box; }</style><h1>Hello, World!</h1> */
```

### htmlFragmentSync()

```ts
import { htmlFragmentSync as html } from 'nodemod/dist/lit-ntml/index.js';

const peopleList = ['Cash Black', 'Vict Fisherman'];
const syncTask = () => `<h1>Hello, World!</h1>`;
const asyncTask = Promise.resolve(1);

html`${syncTask}${peopleList}${asyncTask}`;
/** <h1>Hello, World!</h1>Cash BlackVictFisherman[object Promise] */
```

## API Reference

### html()

- returns: <[Promise][promise-mdn-url]&lt;[string][string-mdn-url]&gt;> Promise which resolves with rendered HTML document string.

### htmlSync()

This method works the same as html() except that this is the synchronous version.

### htmlFragment()

- returns: <[Promise][promise-mdn-url]&lt;[string][string-mdn-url]&gt;> Promise which resolves with rendered HTML document fragment string.

### htmlFragmentSync()

This method works the same as htmlFragment() except that this is the synchronous version.

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[Node.js]: https://github.com/nodejs/node
[lit-html]: https://github.com/PolymerLabs/lit-html

<!-- MDN -->

[array-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[date-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[error-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[function-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[regexp-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[set-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[void-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void

<!-- Badges -->

[mit-license-badge]: https://flat.badgen.net/badge/license/MIT/blue

<!-- Links -->

[mit-license-url]: https://github.com/motss/deno_mod/blob/master/LICENSE
