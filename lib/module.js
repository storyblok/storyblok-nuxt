const path = require('path')

module.exports = function nuxtStoryblok (moduleOptions) {
  let options = Object.assign({}, this.options.storyblok, moduleOptions)

  if (!options.excludeHeaderScript) {
    this.options.head.script.push({
      src: '//app.storyblok.com/f/storyblok-latest.js?t=' + options.accessToken
    })
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    options
  })
}
