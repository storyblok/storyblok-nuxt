<div align="center">
	<a  href="https://www.storyblok.com?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt"  align="center">
		<img  src="https://a.storyblok.com/f/88751/1776x360/b8979e5c96/sb-nuxt.png"  alt="Storyblok Logo">
	</a>
	<h1 align="center">@storyblok/nuxt</h1>
	<p align="center">Nuxt 3 module for the <a href="http://www.storyblok.com?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt" target="_blank">Storyblok</a>, Headless CMS.</p> <br />
</div>

<p align="center">
  <a href="https://npmjs.com/package/@storyblok/nuxt">
    <img src="https://img.shields.io/npm/v/@storyblok/nuxt/latest.svg?style=flat-square" alt="Storyblok JS Client" />
  </a>
  <a href="https://npmjs.com/package/@storyblok/nuxt" rel="nofollow">
    <img src="https://img.shields.io/npm/dt/@storyblok/nuxt.svg?style=flat-square" alt="npm">
  </a>
  </p>

<p align="center">
  <a href="https://discord.gg/jKrbAMz">
   <img src="https://img.shields.io/discord/700316478792138842?label=Join%20Our%20Discord%20Community&style=appveyor&logo=discord&color=09b3af">
   </a>
  <a href="https://twitter.com/intent/follow?screen_name=storyblok">
    <img src="https://img.shields.io/badge/Follow-%40storyblok-09b3af?style=appveyor&logo=twitter" alt="Follow @Storyblok" />
  </a><br />
  <a href="https://app.storyblok.com/#!/signup?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt">
    <img src="https://img.shields.io/badge/Try%20Storyblok-Free-09b3af?style=appveyor&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHqADAAQAAAABAAAAHgAAAADpiRU/AAACRElEQVRIDWNgGGmAEd3D3Js3LPrP8D8WXZwSPiMjw6qvPoHhyGYwIXNAbGpbCjbzP0MYuj0YFqMroBV/wCxmIeSju64eDNzMBJUxvP/9i2Hnq5cM1devMnz984eQsQwETeRhYWHgIcJiXqC6VHlFBjUeXgav40cIWkz1oLYXFmGwFBImaDFBHyObcOzdW4aSq5eRhRiE2dgYlpuYoYSKJi8vw3GgWnyAJIs/AuPu4scPGObd/fqVQZ+PHy7+6udPOBsXgySLDfn5GRYYmaKYJcXBgWLpsx8/GPa8foWiBhuHJIsl2DkYQqWksZkDFgP5PObcKYYff//iVAOTIDlx/QPqRMb/YSYBaWlOToZIaVkGZmAZSQiQ5OPtwHwacuo4iplMQEu6tXUZMhSUGDiYmBjylFQYvv/7x9B04xqKOnQOyT5GN+Df//8M59ASXKyMHLoyDD5JPtbj42OYrm+EYgg70JfuYuIoYmLs7AwMjIzA+uY/zjAnyWJpDk6GOFnCvrn86SOwmsNtKciVFAc1ileBHFDC67lzG10Yg0+SjzF0ownsf/OaofvOLYaDQJoQIGix94ljv1gIZI8Pv38zPvj2lQWYf3HGKbpDCFp85v07NnRN1OBTPY6JdRSGxcCw2k6sZuLVMZ5AV4s1TozPnGGFKbz+/PE7IJsHmC//MDMyhXBw8e6FyRFLv3Z0/IKuFqvFyIqAzd1PwBzJw8jAGPfVx38JshwlbIygxmYY43/GQmpais0ODDHuzevLMARHBcgIAQAbOJHZW0/EyQAAAABJRU5ErkJggg==" alt="Follow @Storyblok" />
  </a>
</p>

### Live Demo

If you are in a hurry, check out our official **[live demo](https://stackblitz.com/edit/nuxt-3-sdk-demo?file=pages/index.vue)** on Stackblitz.

## 🚀 Usage

> **Note**
> This module is for Nuxt 3. [Check out `@storyblok/nuxt-2` for Nuxt 2](https://github.com/storyblok/storyblok-nuxt-2).

> **Important**
> If you are first-time user of the Storyblok, read the [Getting Started](https://www.storyblok.com/docs/guide/getting-started?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt) guide to get a project ready in less than 5 minutes.

### Installation

Install `@storyblok/nuxt`:

```bash
npx nuxi@latest module add storyblok
```

Add following code to modules section of `nuxt.config.js` and replace the accessToken with API token from Storyblok space.

```js
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  modules: [
    ["@storyblok/nuxt", { accessToken: "<your-access-token>" }]
    // ...
  ]
});
```

You can also use the `storyblok` config if you prefer:

```js
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  modules: ["@storyblok/nuxt"],
  storyblok: {
    accessToken: "<your-access-token>"
  }
});
```

> **Warning**
> This SDK uses the Fetch API under the hood. If your environment doesn't support it, you need to install a polyfill like [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch). More info on [storyblok-js-client docs](https://github.com/storyblok/storyblok-js-client#fetch-use-polyfill-if-needed---version-5).

#### Options

When you initialize the module, you can pass all [_@storyblok/vue_ options](https://github.com/storyblok/storyblok-vue#storyblok-api) plus a `bridge` option explained in our [JS SDK Storyblok bridge section](https://github.com/storyblok/storyblok-js#storyblok-bridge) and a `enableSudoMode` option to define your own plugin (see below).

> **Note**
> If you want to use Storyblok inside `nuxt-devtools` you can use the option `devtools`, if enabled, make sure to have installed the @nuxt/devtools module and enable it on your nuxt config.

```js
// Defaults
["@storyblok/nuxt", {
  {
    accessToken: "<your-access-token>",
    bridge: true,
    devtools: true,
    apiOptions: {}, // storyblok-js-client options
  }
}]
```

#### Define your own plugin

While the recommended approach covers most cases, there are specific instances where you may need to use the `enableSudoMode` option and disable our plugin, allowing you to incorporate your own.

```js
// nuxt.config.ts
modules: [
  [
    "@storyblok/nuxt",
    {
      accessToken: "<your-access-token>",
      enableSudoMode: true
    }
  ]
];
```

To include additional functionalities in the SDK's `apiOptions`, such as custom cache methods, you can implement the following solution inside the plugins folder (autoimported):

```js
// plugins/storyblok.js
import { StoryblokVue, apiPlugin } from "@storyblok/vue";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(StoryblokVue, {
    accessToken: "<your-access-token>",
    apiOptions: {
      cache: {
        type: "custom",
        custom: {
          flush() {
            console.log("all right");
          }
        }
      }
    },
    use: [apiPlugin]
  });
});
```

#### Region parameter

Possible values:

- `eu` (default): For spaces created in the EU
- `us`: For spaces created in the US
- `ap`: For spaces created in Australia
- `ca`: For spaces created in Canada
- `cn`: For spaces created in China

Full example for a space created in the US:

```js
["@storyblok/nuxt", {
  {
    accessToken: "<your-access-token>",
    apiOptions: {
      region: "us"
    }
  }
}]
```

> **Important**
> For spaces created in the United States or China, the `region` parameter **must** be specified.

### Getting started

### 1. Creating and linking your components to Storyblok Visual Editor

To link your Vue components to the equivalent one in your Storyblok space:

- First, you need to load them globally adding them to the `~/storyblok` directory. It's important to name them with Pascal case in your code `ExampleComponent.vue` and with a hyphen inside your Storyblok space `example-component`, so they will be imported automatically.

  If you want to define your own directory for the Storyblok related components, you can use the option `componentsDir` in the `nuxt.config.js`:

  ```js
  // nuxt.config.ts
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: "<your-access-token>",
        componentsDir: '~/components',
      }
    ]
  ],
  components: {
    dirs: [
      {
        path: '~/components/storyblok',
        global: true,
      }
    ]
  },
  ```

  Otherwise, you can set another directory and load them manually (for example, by [using a Nuxt plugin](https://stackoverflow.com/questions/43040692/global-components-in-vue-nuxt)).

  > **Warning**
  > Take into account that if you name a component inside the `storyblok` folder the same as another in the `components` folder, it won't work properly. Tip: Keep the components in your Nuxt project with different names.

- For each component, use the `v-editable` directive on its root element, passing the `blok` property that they receive:

```html
<div v-editable="blok"></div>
```

- Finally, use `<StoryblokComponent>` which is available globally in the Nuxt app:

```html
<StoryblokComponent :blok="blok" />
```

> The `blok` is the actual blok data coming from [Storblok's Content Delivery API](https://www.storyblok.com/docs/api/content-delivery/v2?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt).

### 2. Getting Storyblok Stories and listen to Visual Editor events

#### Composition API

The simplest way is by using the `useAsyncStoryblok` one-liner composable (it's autoimported). Where you need to pass as first parameter the `slug`, while the second and third parameters, `apiOptions` and `bridgeOptions` respectively, are optional.

Check the available [apiOptions](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/retrieve-one-story?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt) in our API docs and [bridgeOptions](https://www.storyblok.com/docs/Guides/storyblok-latest-js?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt) passed to the Storyblok Bridge.

> **Note**
> If you want to know more about versioning `{ version: "draft" /* or "publish" */ }` then go to the section [Working with preview and/or production environments](#3-working-with-preview-andor-production-environments)

```html
<script setup>
  const story = await useAsyncStoryblok(
    "vue",
    { version: "draft", resolve_relations: "Article.author" }, // API Options
    { resolveRelations: ["Article.author"], resolveLinks: "url" } // Bridge Options
  );

  if (story.value.status) {
    throw createError({
      statusCode: story.value.status,
      statusMessage: story.value.response
    });
  }
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
```

Which is the short-hand equivalent to using `useStoryblokApi` inside `useState` and `useStoryblokBridge` functions separately:

```html
<script setup>
  const story = useState();
  const storyblokApi = useStoryblokApi();

  const { data } = await storyblokApiInstance.get(
    `cdn/stories/vue`,
    {
      version: "draft"
    }
  );
  story.value = data.story;

  onMounted(() => {
    useStoryblokBridge(
      story.value.id,
      (evStory) => (story.value = evStory),
      { resolveRelations: ["Article.author"], resolveLinks: "url" } // Bridge Options
    );
  });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
```

> The `useState` is an SSR-friendly `ref` replacement. Its value will be preserved after server-side rendering (during client-side hydration).

You can also use the `useAsyncStoryblok` composable in a type-safe way:

```html
<script setup lang="ts">
  import type { SbBlokData } from "@storyblok/js";

  type MyArticleSbBlock = SbBlokData & {
    title: string;
    body: string;
  };

  const story = await useAsyncStoryblok<MyArticleSbBlock>(
    "vue",
    { version: "draft", resolve_relations: "Article.author" }, // API Options
    { resolveRelations: ["Article.author"], resolveLinks: "url" } // Bridge Options
  );

  if (story.value.status) {
    throw createError({
      statusCode: story.value.status,
      statusMessage: story.value.response
    });
  }
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
```

#### Rendering Rich Text

You can easily render rich text by using the `renderRichText` function that comes with `@storyblok/nuxt` and a Vue computed property:

```html
<template>
  <div v-html="articleContent"></div>
</template>

<script setup>
  const props = defineProps({ blok: Object });
  const articleContent = computed(() =>
    renderRichText(props.blok.articleContent)
  );
</script>
```

You can also set a **custom Schema and component resolver** by passing the options as the second parameter of the `renderRichText` function:

```html
<script setup>
  import cloneDeep from "clone-deep";

  const mySchema = cloneDeep(RichTextSchema); // you can make a copy of the default RichTextSchema
  // ... and edit the nodes and marks, or add your own.
  // Check the base RichTextSchema source here https://github.com/storyblok/storyblok-js-client/blob/v4/source/schema.js

  const props = defineProps({ blok: Object });

  const articleContent = computed(() =>
    renderRichText(props.blok.articleContent, {
      schema: mySchema,
      resolver: (component, blok) => {
        switch (component) {
          case "my-custom-component":
            return `<div class="my-component-class">${blok.text}</div>`;
          default:
            return "Resolver not defined";
        }
      }
    })
  );
</script>
```

### 3. Working with preview and/or production environments

Remember that the bridge only works using `version: 'draft'` and the _Preview Access Token_.

For the production site, NOT used as a preview for content editors, `version: 'published'` and _Public Access Token_ should be used.

> **Note**
> If you're using production as a preview for marketeers and your public site, you will need a plugin to handle different .env variables, or versions using the _Preview Access Token_, checking if you are inside Storyblok or not. For example, something like `if (window.location.search.includes(_storyblok_tk[token]=<YOUR_TOKEN>)`.

Check the official docs on how to [access different content versions](https://www.storyblok.com/docs/guide/essentials/accessing-data#content-versions).

The recommended way to handle different content versions with Nuxt is by using environment variables in combination with [Nuxt runtime config](https://nuxt.com/docs/guide/going-further/runtime-config) to expose configuration and secrets within your application

In your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      storyblokVersion: process.env.STORYBLOK_VERSION || "published"
    }
  }
});
```

Then you can access the runtime config in your components:

```ts
const config = useRuntimeConfig();

const story = await useAsyncStoryblok(
  "blog",
  {
    version: config.public.storyblokVersion,
    resolve_relations: "overview.featured_story"
  },
  { resolveRelations: "overview.featured_story" }
);

//or

const { data: articles } = await storyblokApi.get("cdn/stories", {
  version: config.public.storyblokVersion,
  starts_with: "blog",
  is_startpage: false
});
```

### API

#### useAsyncStoryblok(slug, apiOptions, bridgeOptions)

(Recommended Option) Uses [`useState`](https://v3.nuxtjs.org/api/composables/use-state) under the hood to help with SSR compatibility.

Check the available [apiOptions](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/retrieve-one-story?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt) (passed to `storyblok-js-client`) and [bridgeOptions](https://www.storyblok.com/docs/Guides/storyblok-latest-js?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt) (passed to the Storyblok Bridge).

#### useStoryblok(slug, apiOptions, bridgeOptions)

It could be helpful to use `useStoryblok` instead of `useAsyncStoryblok` when we need to make full client-side requests, for example, getting personalized data for a logged user.

Check the available [apiOptions](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/retrieve-one-story?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt) (passed to `storyblok-js-client`) and [bridgeOptions](https://www.storyblok.com/docs/Guides/storyblok-latest-js?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt) (passed to the Storyblok Bridge).

#### useStoryblokApi()

Returns the instance of the `storyblok-js-client`.

#### useStoryblokBridge(storyId, callback, bridgeOptions)

Use this one-line function to cover the most common use case: updating the story when any kind of change happens on Storyblok Visual Editor.

## The Storyblok JavaScript SDK Ecosystem

![A visual representation of the Storyblok JavaScript SDK Ecosystem](https://a.storyblok.com/f/88751/2400x1350/be4a4a4180/sdk-ecosystem.png/m/1200x0)

## 🔗 Related Links

- **[Live Demo on Stackblitz](https://stackblitz.com/edit/nuxt-3-sdk-demo?file=pages%2Findex.vue&terminal=dev)**
- **[Nuxt.js Hub](https://www.storyblok.com/tc/nuxtjs?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt)**: Learn how to develop your own Nuxt.js applications that use Storyblok APIs to retrieve and manage content;
- **[Storyblok & Nuxt.js on GitHub](https://github.com/search?q=org%3Astoryblok+topic%3Anuxt)**: Check all of our Nuxt.js open source repos;
- **[Storyblok CLI](https://github.com/storyblok/storyblok)**: A simple CLI for scaffolding Storyblok projects and fieldtypes.

## ℹ️ More Resources

### Support

- Bugs or Feature Requests? [Submit an issue](/../../issues/new);

- Do you have questions about Storyblok or you need help? [Join our Discord Community](https://discord.gg/jKrbAMz).

### Contributing

Please see our [contributing guidelines](https://github.com/storyblok/.github/blob/master/contributing.md) and our [code of conduct](https://www.storyblok.com/trust-center#code-of-conduct?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt).
This project use [semantic-release](https://semantic-release.gitbook.io/semantic-release/) for generate new versions by using commit messages and we use the Angular Convention to naming the commits. Check [this question](https://semantic-release.gitbook.io/semantic-release/support/faq#how-can-i-change-the-type-of-commits-that-trigger-a-release) about it in semantic-release FAQ.
