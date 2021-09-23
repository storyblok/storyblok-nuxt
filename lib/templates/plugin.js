import Vue from 'vue'
import StoryblokClient from 'storyblok-js-client'
import StoryblokVue from 'storyblok-vue'
<% if (typeof options.proxy !== 'undefined' &&  && options.https && options.useHttpsAgent) { %>
import HttpsProxyAgent from 'https-proxy-agent'
<% } %>

const loadScript = function(src, cb) {
  if (document.getElementById('storyblok-javascript-bridge')) {
    return cb()
  }

  var script = document.createElement('script')
  script.async = true
  script.src = src
  script.id = 'storyblok-javascript-bridge'

  script.onerror = function() {
    cb(new Error('Failed to load' + src))
  }

  script.onload = function() {
    cb()
  }

  document.getElementsByTagName('head')[0].appendChild(script)
}

let doLoadScript = true

const Client = {
  install () {
    if (!Vue.prototype.$storyapi) {
      <% if (typeof options.proxy !== 'undefined' && options.https && options.useHttpsAgent) { %>
      const httpsAgent = new HttpsProxyAgent({
        protocol: '<= options.proxy.protocol || http %>',
        host: '<%= options.proxy.host %>',
        port: <%= options.proxy.port || 8080 %><% if (typeof options.proxy.auth !== 'undefined') { %>,
        auth: '<%= options.proxy.auth.username %>:<%= options.proxy.auth.password %>'
        <% } %>
      })
      <% } %>
      Vue.prototype.$storyapi = new StoryblokClient({
        accessToken: '<%= options.accessToken %>',
        cache: {
          clear: 'auto',
          type: '<%= options.cacheProvider || 'memory' %>'
        },
        timeout: <%= options.timeout || 0 %><% if (options.region) { %>,
        region: '<%= options.region %>'<% } %><% if (typeof options.https !== 'undefined') { %>,
        https: <%= options.https %><% } %>,
        <% if (typeof options.proxy !== 'undefined' && typeof options.proxy === 'boolean') { %>
        proxy: options.proxy,
        <% } else if (typeof options.proxy !== 'undefined') { %>
        proxy: {
          host: '<%= options.proxy.host %>',
          port: <%= options.proxy.port || 8080 %>,
          <% if (typeof options.proxy.auth !== 'undefined') { %>
          auth: {
            username: '<%= options.proxy.auth.username %>',
            password: '<%= options.proxy.auth.password %>'
          }
          <% } %>
        },
        <% } %>
        <% if (typeof options.proxy !== 'undefined' && options.https && options.useHttpsAgent) { %>
        httpsAgent,
        <% } %>
    }<% if (typeof options.endpoint !== 'undefined') { %>, '<%= options.endpoint %>'<% } %>)

      Vue.prototype.$storybridge = function(cb, errorCb) {
        if (typeof errorCb !== 'function') {
          errorCb = function() {}
        }

        if (window.location == window.parent.location) {
          errorCb('You are not in the edit mode.')
          return
        }

        if (!doLoadScript) {
          if (!window.StoryblokBridge) {
            errorCb('The Storyblok bridge script is already loading.')
            return
          }
          cb()
          return
        }

        doLoadScript = false
        loadScript('https://app.storyblok.com/f/storyblok-v2-latest.js', cb)
      }
    }
  }
}

Vue.use(Client)
Vue.use(StoryblokVue)

export default (ctx) => {
  const { app, store } = ctx

  app.$storyapi = Vue.prototype.$storyapi
  ctx.$storyapi = Vue.prototype.$storyapi
  app.$storybridge = Vue.prototype.$storybridge
  ctx.$storybridge = Vue.prototype.$storybridge

  if (store) {
    store.$storyapi = Vue.prototype.$storyapi
  }
}
