const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const options = {
    ...this.options.storyblok,
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'storyblok-nuxt.js',
    options
  })
}

module.exports.meta = require('../package.json')
