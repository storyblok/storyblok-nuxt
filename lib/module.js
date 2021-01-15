const path = require('path')

const mergeDefaultOptions = function (moduleOptions, options) {
  const defaultOptions = {
    cacheProvider: 'memory',
    timeout: 0
  }

  const mergedOptions = {
    ...defaultOptions,
    ...(options.storyblok || {}),
    ...(options.publicRuntimeConfig && options.publicRuntimeConfig.storyblok || {}),
    ...(moduleOptions || {})
  }

  const finalOptions = {
    accessToken: mergedOptions.accessToken,
    cache: {
      clear: 'auto',
      type: mergedOptions.cacheProvider
    },
    timeout: mergedOptions.timeout
  }

  if (mergedOptions.region) finalOptions.region = mergedOptions.region
  if (mergedOptions.https) finalOptions.https = mergedOptions.https
  if (mergedOptions.endpoint) finalOptions.endpoint = mergedOptions.endpoint
  if (mergedOptions.customParent) finalOptions.customParent = mergedOptions.customParent

  return finalOptions
}

const configValidation = function (options) {
  if (!options.accessToken) {
    throw new Error('[STORYBLOK] You need to provider an accessToken in your config')
  }
}

module.exports = function nuxtStoryblok (moduleOptions) {
  const options = mergeDefaultOptions(moduleOptions, this.options)

  configValidation(options)

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    options: JSON.stringify(options)
  })
}

module.exports.meta = require('../package.json')
