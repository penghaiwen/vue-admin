'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  VERSION: '"v1开发版"',
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"/api"',
})
