const { resolve } = require('path')
module.exports = async function (_moduleOptions) {
  const { nuxt } = this
  // Combine options
  const moduleOptions = {
    ...nuxt.options.axios,
    ..._moduleOptions,
    ...(nuxt.options.runtimeConfig && nuxt.options.runtimeConfig.axios)
  }
  const options ={"a":"b"};
  this.addPlugin({
    src: resolve(__dirname, 'events.js'),
    fileName: 'events.js',
  })
  this.addPlugin({
    src: resolve(__dirname, 'storeino.js'),
    fileName: 'storeino.js',
  })
  this.addPlugin({
    src: resolve(__dirname, 'init.js'),
    fileName: 'init.js',
  })
  this.addPlugin({
    src: resolve(__dirname, 'http.js'),
    fileName: 'http.js',
  })
  this.addPlugin({
    src: resolve(__dirname, 'tools.js'),
    fileName: 'tools.js',
    options
  })
}

module.exports.meta = require('../package.json')
