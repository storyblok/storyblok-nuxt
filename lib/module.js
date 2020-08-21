const path = require('path')

module.exports = function nuxtStoryblok (moduleOptions) {
  let options = Object.assign({}, this.options.storyblok, moduleOptions)

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    options
  })
}

module.exports.meta = require('../package.json')
