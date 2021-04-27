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
- Add `axios` dependency as it's a peer dependecy of the `storyblok-js-client` used by `storyblok-nuxt`
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

1. $storyapi: The [Storyblok API client](https://github.com/storyblok/storyblok-js-client).
2. $storybridge: A loader for the [Storyblok JS bridge](https://www.storyblok.com/docs/Guides/storyblok-latest-js) that is responsible for adding the editing interface to your website.

Example of fetching data of the homepage and listening to the change events of the JS bridge:

```js
export default {
  data () {
    return {
      story: { content: {} }
    }
  },
  mounted () {
    this.$storybridge(() => {
      const storyblokInstance = new StoryblokBridge()

      storyblokInstance.on(['input', 'published', 'change'], (event) => {
        if (event.action == 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content
          }
        } else {
          window.location.reload()
        }
      })
    }, (error) => {
      console.error(error)
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

## API

Like described above, this package includes two objects into Nuxt.js context:

### $storyapi

This object is a instance of StoryblokClient. You can check the documentation about StoryblokClient in the repository: https://github.com/storyblok/storyblok-js-client

### $storybridge(successCallback, errorCallback)

You can use this object to load the [Storyblok JS Bridge](https://www.storyblok.com/docs/Guides/storyblok-latest-js). In the success callback you will it have available in the window variable StoryblokBridge.

## Contribution

Fork me on [Github](https://github.com/storyblok/storyblok-nuxt).

This project use [semantic-release](https://semantic-release.gitbook.io/semantic-release/) for generate new versions by using commit messages and we use the Angular Convention to naming the commits. Check [this question](https://semantic-release.gitbook.io/semantic-release/support/faq#how-can-i-change-the-type-of-commits-that-trigger-a-release) about it in semantic-release FAQ.

## License

[MIT License](./LICENSE)

Copyright (c) Storyblok <it@storyblok.com>
