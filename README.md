# storyblok-nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Storyblok](https://www.storyblok.com) module for [Nuxt.js](https://nuxtjs.org)

## Infos
* [📖 Release Notes](https://github.com/storyblok/storyblok-nuxt/blob/master/CHANGELOG.md)

## Setup
1. Add `storyblok-nuxt` dependency to your project
```
yarn add --dev storyblok-nuxt # or npm install --save-dev storyblok-nuxt
```

2. Add `storyblok-nuxt` to the `modules` section of your `nuxt.config.js`.
```js
{
  modules: [
    // Simple usage
    'storyblok-nuxt',

    // With options
    ['storyblok-nuxt', {
      /* module options */
    }]
  ]
}
```

### Using top level options
```js
{
  modules: [
    'storyblok-nuxt'
  ],
  storyblok: {
    /* module options */
  }
}
```

## Options
### `accessToken`
> Your Storyblok [access token](https://www.storyblok.com/docs/api/content-delivery#topics/authentication).
* Type: `String`
* Default: `''`

### `cacheProvider`
> Cache type for `storyblok-js-client`
* Type: `String`
* Default: `'memory'`
* Possible values: `'none' or 'memory'`

## Usage
This module adds two objects to the [Nuxt.js context](https://nuxtjs.org/api/context).
1. `$storyapi`: The Storyblok API client
2. `$storybridge`: The Storyblok JavaScript bridge for clickable editable blocks

Example of fetching data of the homepage and listening to the change events of the JavaScript bridge:
```html
// pages/index.vue
<template>
  <h1>{{ story.name }}</h1>
</template>

<script>
export default {
  data () {
    return {
      story: { content: {} }
    }
  },
  async asyncData (context) {
    const { app } = context

    try {
      // Note: Finds only unpublished story because of 'draft'
      // Use 'published' for published one
      const { data } = await app.$storyapi.get('cdn/stories/page', {
        version: 'draft'
      })

      return {
        story: data.story
      }
    } catch (error) {
      if (!error.response) {
        console.error(error)
        context.error({ statusCode: 404, message: 'Failed to receive content from API' })
      } else {
        console.error(error.response.data)
        context.error({ statusCode: error.response.status, message: error.response.data })
      }
    }
  },
  mounted () {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action === 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else {
        window.location.reload()
      }
    })
  }
}
</script>
```
Checkout the following boilerplate to see an example setup: [https://github.com/storyblok/vue-nuxt-boilerplate](https://github.com/storyblok/vue-nuxt-boilerplate)

## License

[MIT License](./LICENSE)

Copyright (c) Storyblok <it@storyblok.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/storyblok-nuxt/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/storyblok-nuxt

[npm-downloads-src]: https://img.shields.io/npm/dt/storyblok-nuxt.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/storyblok-nuxt

[circle-ci-src]: https://img.shields.io/circleci/project/github/storyblok-nuxt.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/

[codecov-src]: https://img.shields.io/codecov/c/github/storyblok-nuxt.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/

[license-src]: https://img.shields.io/npm/l/storyblok-nuxt.svg?style=flat-square
[license-href]: https://npmjs.com/package/storyblok-nuxt
