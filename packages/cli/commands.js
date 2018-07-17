// @flow

const fs = require('fs')

const { knexConfigPath } = require('./shared')

const pathToSharynWebpackConfig = 'node_modules/@sharyn/webpack-config'
const hasSharynWebpackConfig = fs.existsSync(`${pathToSharynWebpackConfig}/index.js`)

const dockerWaitPg = containerName =>
  `until docker run --rm --link ${containerName}:pg --net sharyn-net postgres:latest pg_isready -U postgres -h pg; do sleep 1; done`

const binDir = null

const prefix = command => `${binDir || './node_modules/.bin/'}${command}`

const nodemon = prefix('nodemon -w src -i dist -x "babel-node src/_server/server.js"')

const dbMigr = prefix(`knex --knexfile ${knexConfigPath || ''} --cwd . migrate:latest`)
const dbSeed = prefix(`knex --knexfile ${knexConfigPath || ''} --cwd . seed:run`)

module.exports = {
  NODE_LIB_SERVER: 'node lib/_server/server.js',
  DOCKER_UP: 'docker-compose up -d',
  DOCKER_UP_TEST: 'docker-compose up -d db-test',
  DOCKER_WAIT_PG: dockerWaitPg('db'),
  DOCKER_WAIT_PG_TEST: dockerWaitPg('db-test'),
  babel: prefix('babel src -d lib'),
  dbMigr,
  dbSeed,
  dbMigrTest: `${prefix('cross-env NODE_ENV=test')} ${dbMigr}`,
  dbSeedTest: `${prefix('cross-env NODE_ENV=test')} ${dbSeed}`,
  herokuLocal: prefix('cross-env NODE_ENV=production heroku local'),
  lint: prefix('eslint src'),
  typecheck: prefix('flow'),
  test: prefix('jest --coverage --coveragePathIgnorePatterns src/_db'),
  rmDist: prefix('rimraf dist'), // Add .cache when switching back to Parcel
  rmLibDist: prefix('rimraf lib dist'), // Add .cache when switching back to Parcel
  clientWatch: prefix(
    `webpack-dev-server --mode=development --progress --hot ${
      hasSharynWebpackConfig ? `--config ${pathToSharynWebpackConfig}` : ''
    }`,
  ),
  clientBuild: prefix(
    `webpack --mode=production --progress ${
      hasSharynWebpackConfig ? `--config ${pathToSharynWebpackConfig}` : ''
    }`,
  ),
  serverWatch: nodemon,
  serverWatchSsrOnly: `${prefix('cross-env SSR_ONLY=true')} ${nodemon}`,
  serverWatchNoSsr: `${prefix('cross-env NO_SSR=true')} ${nodemon}`,
}
