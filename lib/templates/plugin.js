import Vue from 'vue'
import StoryblokClient from 'storyblok-js-client'
import StoryblokVue from 'storyblok-vue'

const Client = {
  install () {
    if (!Vue.prototype.$storyapi) {
      Vue.prototype.$storyapi = new StoryblokClient({
        accessToken: '<%= options.accessToken %>',
        cache: {
          clear: 'auto',
          type: '<%= options.cacheProvider || 'memory' %>'
        },
        timeout: <%= options.timeout || 0 %><% if (options.region) { %>,
        region: '<%= options.region %>'<% } %><% if (typeof options.https !== 'undefined') { %>,
        https: <%= options.https %><% } %>
      })
    }
  }
}

Vue.use(Client)
Vue.use(StoryblokVue)

export default (ctx) => {
  const { app, store } = ctx

  app.$storyapi = Vue.prototype.$storyapi
  ctx.$storyapi = Vue.prototype.$storyapi

  if (store) {
    store.$storyapi = Vue.prototype.$storyapi
  }
}
