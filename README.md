<div align="center">
	<h1 align="center">Storyblok Nuxt</h1>
	<p align="center">Nuxt module for <a href="http://www.storyblok.com?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt" target="_blank">Storyblok</a>, Headless CMS.</p>
</div>

<p align="center">
  <a href="https://npmjs.com/package/storyblok-nuxt" rel="nofollow">
    <img src="https://img.shields.io/npm/v/storyblok-nuxt/latest.svg?style=appveyor&color=09b3af" alt="npm (scoped with tag)">
  </a>
  <a href="https://npmjs.com/package/storyblok-nuxt" rel="nofollow">
    <img src="https://img.shields.io/npm/dt/storyblok-nuxt.svg?style=appveyor&color=09b3af" alt="npm">
  </a>
  <a href="https://david-dm.org/storyblok/storyblok-nuxt" rel="nofollow">
    <img src="https://img.shields.io/david/storyblok/storyblok-nuxt?style=appveyor&color=09b3af" alt="Dependencies" data-canonical-src="https://david-dm.org/storyblok/storyblok-nuxt/status.svg?style=flat-square&color=09b3af">
  </a>
  <a href="http://standardjs.com" rel="nofollow">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=appveyor&color=09b3af" alt="js-standard-style">
  </a>
  <a href="https://discord.gg/jKrbAMz">
   <img src="https://img.shields.io/discord/700316478792138842?label=Join%20Our%20Discord%20Community&style=appveyor&logo=discord&color=09b3af">
   </a>
  <a href="https://twitter.com/intent/follow?screen_name=storyblok">
    <img src="https://img.shields.io/badge/Follow-%40storyblok-09b3af?style=appveyor&logo=twitter" alt="Follow @Storyblok" />
  </a><br/>
  <a href="https://app.storyblok.com/#!/signup?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt">
    <img src="https://img.shields.io/badge/Try%20Storyblok-Free-09b3af?style=appveyor&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHqADAAQAAAABAAAAHgAAAADpiRU/AAACRElEQVRIDWNgGGmAEd3D3Js3LPrP8D8WXZwSPiMjw6qvPoHhyGYwIXNAbGpbCjbzP0MYuj0YFqMroBV/wCxmIeSju64eDNzMBJUxvP/9i2Hnq5cM1devMnz984eQsQwETeRhYWHgIcJiXqC6VHlFBjUeXgav40cIWkz1oLYXFmGwFBImaDFBHyObcOzdW4aSq5eRhRiE2dgYlpuYoYSKJi8vw3GgWnyAJIs/AuPu4scPGObd/fqVQZ+PHy7+6udPOBsXgySLDfn5GRYYmaKYJcXBgWLpsx8/GPa8foWiBhuHJIsl2DkYQqWksZkDFgP5PObcKYYff//iVAOTIDlx/QPqRMb/YSYBaWlOToZIaVkGZmAZSQiQ5OPtwHwacuo4iplMQEu6tXUZMhSUGDiYmBjylFQYvv/7x9B04xqKOnQOyT5GN+Df//8M59ASXKyMHLoyDD5JPtbj42OYrm+EYgg70JfuYuIoYmLs7AwMjIzA+uY/zjAnyWJpDk6GOFnCvrn86SOwmsNtKciVFAc1ileBHFDC67lzG10Yg0+SjzF0ownsf/OaofvOLYaDQJoQIGix94ljv1gIZI8Pv38zPvj2lQWYf3HGKbpDCFp85v07NnRN1OBTPY6JdRSGxcCw2k6sZuLVMZ5AV4s1TozPnGGFKbz+/PE7IJsHmC//MDMyhXBw8e6FyRFLv3Z0/IKuFqvFyIqAzd1PwBzJw8jAGPfVx38JshwlbIygxmYY43/GQmpais0ODDHuzevLMARHBcgIAQAbOJHZW0/EyQAAAABJRU5ErkJggg==" alt="Follow @Storyblok" />
  </a>
</p>

## 🚀 Usage

If you are first-time user of the Storyblok, read [Nuxt Getting Started](https://www.storyblok.com/docs/guide/getting-started) guide at Storyblok website.

### Setup

- Add `axios` dependency as it's a peer dependecy of the `storyblok-js-client` used by `storyblok-nuxt`
- Add `storyblok-nuxt` dependency using yarn or npm to your project
- Add `storyblok-nuxt` to `modules` section of `nuxt.config.js`

#### Installation

```bash
npm install --save-dev nuxt-storyblok axios
// yarn add nuxt-storyblok axios
```

> *Hint: You don't have to install Axios if you already installed Axios module of Nuxt.*

Add following code to modules section of `config.nuxt.js` and replace the accessToken with API token from Storyblok space.

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

### How to use

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

> *Hint: Find out more how to use Nuxt together with Storyblok in [Nuxt Technology Hub](https://www.storyblok.com/tc/nuxtjs)*

### API

Like described above, this package includes two objects into Nuxt.js context:

#### $storyapi

This object is a instance of StoryblokClient. You can check the documentation about StoryblokClient in the repository: https://github.com/storyblok/storyblok-js-client

#### $storybridge(successCallback, errorCallback)

You can use this object to load the [Storyblok JS Bridge](https://www.storyblok.com/docs/Guides/storyblok-latest-js). In the success callback you will it have available in the window variable StoryblokBridge.

### Migrate from 1.x to 2.x

#### Listening to Visual Editor events in 1.x

Most of our tutorials and recordings still using following deprecated approach for real-time editing and listening to Storyblok's Visual Editor events. **This approach can be used only with 1.x version of the storyblok-nuxt.**

```js
export default {
  mounted () {
    // Use the input event for instant update of content
    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.story.id) {
        this.story.content = event.story.content
      }
    })
    // Use the bridge to listen the events
    this.$storybridge.on(['published', 'change'], (event) => {
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true,
      })
    })
  }
}
```

#### Listening to Visual Editor events in 2.x

The recommended approach for 2.x storyblok-nuxt plugin.

```js
export default {
  mounted () {
    this.$storybridge(() => {
      const storyblokInstance = new StoryblokBridge()

      storyblokInstance.on(['input', 'published', 'change'], (event) => {
        if (event.action == 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content
          }
        } else {
          this.$nuxt.$router.go({
            path: this.$nuxt.$router.currentRoute,
            force: true,
          })
        }
      })
    }, (error) => {
      console.error(error)
    })
  }
}
```

To define how to add some classes to specific html attributes rendered by the rich text renderer, you need your own schema definition. With this new schema, you can pass it as the `richTextSchema` option when instantiate the `StoryblokClient` class. You **must** follow the [default schema](https://github.com/storyblok/storyblok-js-client/blob/master/source/schema.js) to do this.

Below, you can check an example:

~~~javascript
const StoryblokClient = require('storyblok-js-client')

// the default schema copied and updated
const MySchema = require('./my-schema')

let client = new StoryblokClient({
  accessToken: 'WcdDcNgDm59K72EbsQg8Lgtt',
  richTextSchema: MySchema
})

client.richTextResolver.render(data)
~~~

If you just want to change the way a specific tag is rendered you can import the default schema and extend it. Following an example that will render headlines with classes:

Instead of `<p>Normal headline</p><h3><span class="margin-bottom-fdsafdsada">Styled headline</span></h3>` it will render `<p>Normal headline</p><h3 class="margin-bottom-fdsafdsada">Styled headline</h3>`.

~~~javascript

const RichTextResolver = require('storyblok-js-client/dist/richTextResolver')
const MySchema = require('storyblok-js-client/dist/schema')

MySchema.nodes.heading = function(node) {
  let attrs = {}

  if (node.content &&
      node.content.length === 1 &&
      node.content[0].marks &&
      node.content[0].marks.length === 1 &&
      node.content[0].marks[0].type === 'styled') {
    attrs = node.content[0].marks[0].attrs
    delete node.content[0].marks
  }

  return {
    tag: [{
      tag: `h${node.attrs.level}`,
      attrs: attrs
    }]
  }
}

let rteResolver = new RichTextResolver(MySchema)
let rendered = rteResolver.render({
  "content": [
    {
      "content": [
        {
          "text": "Normal headline",
          "type": "text"
        }
      ],
      "type": "paragraph"
    },
    {
      "attrs": {
        "level": 3
      },
      "content": [
        {
          "marks": [
            {
              "attrs": {
                "class": "margin-bottom-fdsafdsada"
              },
              "type": "styled"
            }
          ],
          "text": "Styled headline",
          "type": "text"
        }
      ],
      "type": "heading"
    }
  ],
  "type": "doc"
})

console.log(rendered)
~~~

## 🔗 Related Links

* **[Storyblok & NuxtJS on GitHub](https://github.com/search?q=org%3Astoryblok+topic%3Anuxtjs)**: Check all of our NuxtJS open source repos;
* **[NuxtJS Hub](https://www.storyblok.com/tc/nuxtjs?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt)**: Learn how to develop your own Nuxt.js applications that use Storyblok APIs to retrieve and manage content;
* **[Rich Text Renderer for Vue](https://www.storyblok.com/docs/richtext-field#vue-js)**: Renders Storyblok rich text content with Vue.

## ℹ️ More Resources

### Support

* Bugs or Feature Requests? [Submit an issue](../../../issues/new);

* Do you have questions about Storyblok or you need help? [Join our Discord Community](https://discord.gg/jKrbAMz).

### Contributing

Please see our [contributing guidelines](https://github.com/storyblok/.github/blob/master/contributing.md) and our [code of conduct](https://www.storyblok.com/trust-center#code-of-conduct?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt).
This project use [semantic-release](https://semantic-release.gitbook.io/semantic-release/) for generate new versions by using commit messages and we use the Angular Convention to naming the commits. Check [this question](https://semantic-release.gitbook.io/semantic-release/support/faq#how-can-i-change-the-type-of-commits-that-trigger-a-release) about it in semantic-release FAQ.

### License

[MIT License](./LICENSE)
Copyright (c) Storyblok <it@storyblok.com>
