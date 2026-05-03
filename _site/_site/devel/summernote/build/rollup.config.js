'use strict'

const path    = require('path')
const babel   = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const banner  = require('./banner.js')

let fileDest  = 'summernote.js'
const external = ['jquery']
const plugins = [
  babel({
    exclude: 'node_modules/**', // Only transpile our source code
    externalHelpersWhitelist: [ // Include only required helpers
      'defineProperties',
      'createClass',
      'inheritsLoose',
      'defineProperty',
      'objectSpread'
    ]
  })
]
const globals = {
  jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
  moment: 'moment',
  'popper.js': 'Popper'
}

module.exports = {
  input: path.resolve(__dirname, '../src/js/bs4/settings.js'),
  output: {
    banner,
    file: path.resolve(__dirname, `../dist/js/${fileDest}`),
    format: 'umd',
    globals,
    name: 'summernote'
  },
  external,
  plugins
}
