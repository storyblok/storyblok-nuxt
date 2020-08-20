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
      customParent: 'YOUR_URL_WHERE_RUN_STORYBLOK_APP' // optional https://www.storyblok.com/docs/Guides/storyblok-latest-js#storyblokinitconfig
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
      story: { content: {} }
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

## API

Like described above, this package includes two objects into Nuxt.js context:

### $storyapi

This object is a instance of StoryblokClient. You can check the documentation about StoryblokClient in the repository: https://github.com/storyblok/storyblok-js-client

### $storybridge

You can use this object to connect and interact with our [Storyblok Bridge](https://www.storyblok.com/docs/Guides/storyblok-latest-js). You can use the following methods:

#### $storybridge.on(events, callback, options)

Use this function to interact with the [Storyblok Bridge events](https://www.storyblok.com/docs/Guides/storyblok-latest-js#events)

Parameters:

* **events** `Array<Object>`: an array of allowed events to interact, like `input` and `published`. You can check the [allowed events in the documentation](https://www.storyblok.com/docs/Guides/storyblok-latest-js#events);
* **callback** `Function`: a callback fuction that receives the `event` object;
* **options** `Object`: an **optional** object that will be pass to `init` method.

#### $storybridge.resolveRelations(relationsToResolve, callback)

Use this method to receive the data with the correct relations already resolved. An example:

```js
this.$storybridge.resolveRelations(['relations.categories'], (data) => {
  // data.story.content has now the resolved relations
  this.story.content = data.story.content
})
```

Parameters:

* **relationsToResolve** `Array<String>`: an array of relations to resolve in the specific story;
* **callback** `Function`: a callback fuction that receives the `data` object from `input` event.

#### $storybridge.load(callback, errorCallback)

Use this method to load the Javascript code to Storyblok Bridge. You won't need to do this, because the other functions already use this method internally.

Parameters:

* **cb** `Function`: a callback function that will be executed when the script loads;
* **errorCb** `Function`: a callack to capture the error.

## Contribution

Fork me on [Github](https://github.com/storyblok/storyblok-nuxt).

This project use [semantic-release](https://semantic-release.gitbook.io/semantic-release/) for generate new versions by using commit messages and we use the Angular Convention to naming the commits. Check [this question](https://semantic-release.gitbook.io/semantic-release/support/faq#how-can-i-change-the-type-of-commits-that-trigger-a-release) about it in semantic-release FAQ.

## License

[MIT License](./LICENSE)

Copyright (c) Storyblok <it@storyblok.com>
