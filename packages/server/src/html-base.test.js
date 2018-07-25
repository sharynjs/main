// @flow

import htmlBase from './html-base'

const exampleWindowVarPairs = [
  ['__A__', { a: "<script>alert('xss')</script>" }],
  ['__B__', 'plop'],
  ['__C__', true],
  ['__D__', 666],
]

const expected = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="app"></div>
    <script>window.__A__ = {"a":"\\u003Cscript\\u003Ealert('xss')\\u003C\\u002Fscript\\u003E"}</script>
<script>window.__B__ = "plop"</script>
<script>window.__C__ = true</script>
<script>window.__D__ = 666</script>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>`

test('htmlBase', () => {
  expect(htmlBase(exampleWindowVarPairs)).toBe(expected)
})