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
      cacheProvider: 'memory'
    }],
 ]
}
```

## Usage

This module adds two objects to the the Nuxt.js context.

1. $storyapi: The Storyblok API client 
2. $storybridge: The Storyblok JS bridge for clickable editable blocks

Example of fetching data of the homepage and listening to the change events of the JS bridge:

```js
export default {
  data () {
    return {
      return { story: { content: {} } }
    }
  },
  mounted () {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action == 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else {
        window.location.reload()
      }
    })
  },
  asyncData (context) {
    return context.app.$storyapi.get('cdn/stories/home', {
      version: 'draft'
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
}
```

Checkout the following boilerplate to see an example setup: https://github.com/storyblok/vue-nuxt-boilerplate

## License

[MIT License](./LICENSE)

Copyright (c) Storyblok <it@storyblok.com>
