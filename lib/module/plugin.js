/* eslint-disable */

import Vue from 'vue'
import { StoryblokVue, useStoryblokApi, useStoryblokBridge } from "@storyblok/nuxt";
<% if (options.useApiClient !== false) { %>
import { apiPlugin } from "@storyblok/nuxt";
<% } %>

export default (ctx) => {
  const { app, store } = ctx

  Vue.use(StoryblokVue, {
    accessToken: "<%= options.accessToken %>",
    bridge: <%= typeof options.bridge === "undefined" ? true : options.bridge %>,
    apiOptions: <%- JSON.stringify(options.apiOptions || {}) %>,
    <% if (options.useApiClient !== false) { %>
    use: [apiPlugin]
    <% } %>
  });

  const api = useStoryblokApi()

  app.$storyapi = api
  ctx.$storyapi = api
  app.$storybridge = useStoryblokBridge
  ctx.$storybridge = useStoryblokBridge

  if (store) store.$storyapi = api
}
