# 🌹 @sharyn/util

[![npm](https://img.shields.io/npm/v/@sharyn/util.svg)](https://www.npmjs.com/package/@sharyn/util)

Some general utils, like Lodash.

## 🌹 Install

```bash
yarn add @sharyn/util
```

## 🌹 Import style

You can either import the entire library or just one module:

```js
import { someUtil } from '@sharyn/util' // More compact if multiple imports (ok on the server)

import someUtil from '@sharyn/util/some-util' // Reduces the bundle size (recommended on the client)
```

## 🌹 swit

🌲 [**Not structuring**](https://github.com/sharynjs/sharyn#-structuring-factor)

An inline `switch` statement.

```js
const SWITCH_ME = 'hello'

// With values

swit(
  SWITCH_ME,
  [
    ['hi', 'Oh hi'],
    ['hello', 'Hello fine people'],
    ['goodbye', 'Bye'],
  ],
  'default value',
) // => 'Hello fine people'

// With functions

swit(
  SWITCH_ME,
  [
    ['good', () => good()],
    ['bad', bad()], // Don't do that or it will get executed before swit
    ['hello', () => 'Hello fine people'],
  ],
  () => 'default value',
) // => 'Hello fine people'
```

## 🌹 isEither

🌲 [**Not structuring**](https://github.com/sharynjs/sharyn#-structuring-factor)

A utilily function to replace `if (foo === 'a' || foo === 'b' || foo === 'c')` by `if (isEither(foo, 'a', 'b', 'c'))` or `if (isEither(foo, ['a', 'b', 'c']))`.

```js
import { isEither } from '@sharyn/util'

isEither(NODE_ENV, 'production', 'test') // true or false
isEither(NODE_ENV, ['production', 'test']) // true or false
```

## 🌹 spread

Don't execute a function inside it.

## 🌹 spreadIf

Don't execute a function inside it.

These last two are deprecated in favor of Lodash's pickBy for objects and filter for arrays.

```js
import pickBy from 'lodash/pickBy'
import defined from '@sharyn/util/defined'

const objA = { a: undefined, b: null, c: undefined }

const objB = {
  foo: 'foo',
  bar: 'bar',
  ...pickBy(objA, defined)
}

// { foo: 'foo', bar: 'bar', b: null }
```
