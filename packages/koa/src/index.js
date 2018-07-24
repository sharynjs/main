// @flow

/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require, global-require */

import colors from 'colors/safe'
import exitHook from 'exit-hook'

// flow-disable-next-line
import { appRoot, hasPackage } from '@sharyn/check-setup'
// flow-disable-next-line
const Koa = hasPackage('koa', true) && require(`${appRoot}/node_modules/koa`)
// flow-disable-next-line
const Router = hasPackage('koa-router', true) && require(`${appRoot}/node_modules/koa-router`)

const router = new Router()

const PREFIX = colors.cyan('[sharyn/koa]')
const { NODE_ENV } = process.env
const PORT = process.env.PORT || 8000

let server

const stopServer_ = (options?: Object) => {
  if (server) {
    if (!options?.silent) {
      // eslint-disable-next-line no-console
      console.log() // cross-os newline
      // eslint-disable-next-line no-console
      console.log(`${PREFIX} Server stopped`)
    }
    if (hasPackage('@sharyn/db')) {
      // flow-disable-next-line
      require('@sharyn/db').knex.destroy()
    }
    if (hasPackage('@sharyn/redis')) {
      // flow-disable-next-line
      require('@sharyn/redis').end()
    }
    return server.close()
  }
  throw Error('Tried to stop the server but no server was running')
}

const startServer_ = (routing: Function, options?: Object) => {
  if (!routing) {
    throw Error('You must pass a routing function to startServer')
  }

  if (!options?.silent) {
    // eslint-disable-next-line no-console
    console.log(`${PREFIX} Server running on port ${PORT} ${NODE_ENV ? `(${NODE_ENV})` : ''}`)
    exitHook(() => stopServer_())
  }

  const app = new Koa()

  if (hasPackage('koa-compress')) {
    // flow-disable-next-line
    app.use(require('koa-compress')())
  }

  if (hasPackage('koa-mount') && hasPackage('koa-static')) {
    // flow-disable-next-line
    const mount = require('koa-mount')
    // flow-disable-next-line
    const serveStatic = require('koa-static')
    app.use(mount('/static', serveStatic('dist'))).use(mount('/static', serveStatic('public')))
  }

  if (hasPackage('koa-favicon')) {
    // flow-disable-next-line
    app.use(require('koa-favicon')(`./public/img/favicon.ico`))
  }

  routing(router)
  app.use(router.routes()).use(router.allowedMethods())

  server = app.listen(options?.port || PORT)
}

export const startServer = startServer_
export const stopServer = stopServer_