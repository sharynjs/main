import { default as browser, clearCaches, getFormFields } from '@sharyn/browser'
import commands from '@sharyn/commands'
import env from '@sharyn/env'
import envCheck from '@sharyn/env/check'
import { default as reactHooks, useStateObject } from '@sharyn/react-hooks'
import reactRouter from '@sharyn/react-router'
import scripts from '@sharyn/scripts'
import util from '@sharyn/util'

export {
  browser,
  clearCaches,
  getFormFields,
  commands,
  env,
  envCheck,
  reactHooks,
  useStateObject,
  reactRouter,
  scripts,
  util,
}

declare const _default: {
  browser: typeof browser
  clearCaches: typeof clearCaches
  getFormFields: typeof getFormFields

  commands: typeof commands

  env: typeof env
  envCheck: typeof envCheck

  reactHooks: typeof reactHooks
  useStateObject: typeof useStateObject

  reactRouter: typeof reactRouter
  scripts: typeof scripts
  util: typeof util
}

export default _default
