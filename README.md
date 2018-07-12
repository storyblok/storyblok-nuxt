# storyblok-nuxt
[![npm (scoped with tag)](https://img.shields.io/npm/v/storyblok-nuxt/latest.svg?style=flat-square)](https://npmjs.com/package/storyblok-nuxt)
[![npm](https://img.shields.io/npm/dt/storyblok-nuxt.svg?style=flat-square)](https://npmjs.com/package/storyblok-nuxt)
[![Codecov](https://img.shields.io/codecov/c/github/storyblok/storyblok-nuxt.svg?style=flat-square)](https://codecov.io/gh/storyblok/storyblok-nuxt)
[![Dependencies](https://david-dm.org/storyblok/storyblok-nuxt/status.svg?style=flat-square)](https://david-dm.org/storyblok/storyblok-nuxt)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Storyblok Nuxt.js module

## Features

The module features

## Setup
- Add `storyblok-nuxt` dependency using yarn or npm to your project
- Add `storyblok-nuxt` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    ['storyblok-nuxt', {
      accessToken: 'YOUR_PREVIEW_TOKEN',
      cacheProvider: 'memory',
      timeout: 5000
    }],
 ]
}
```

## Usage

The module installs two Vue.js plugins.

1. $storyapi: The Storyblok API client 
2. $storyblok: The Storyblok JS bridge for clickable editable blocks

Example of fetching data of the homepage and listening to the change events of the JS bridge:

```js
export default {
  data () {
    return {
      
    }
  },
  mounted () {
    this.$storyblok.init()
    this.$storyblok.on('change', function () {
      window.location.reload()
    })
  },
  asyncData (context) {
    return context.app.$storyapi.get('cdn/stories/home', {
      version: 'draft'
    }).then((res) => {
      return res
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
```

## Asked Question

- [Why is there a `script` tag added to my `head` and can it be loaded `async`?](https://github.com/storyblok/storyblok-nuxt/issues/1)
- Is there a more advanced demo setup using nuxt.js?
  - [NuxtDoc - Documentation Setup using Nuxt, Storyblok and Netlify](https://github.com/storyblok/nuxtdoc)
  - [NuxtWebsite - Basic Website/Blog Setup using Nuxt, Storyblok and Netlify](https://github.com/storyblok/nuxtwebsite)

## License

[MIT License](./LICENSE)

Copyright (c) Storyblok <it@storyblok.com>
