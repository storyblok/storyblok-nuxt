import Vue from 'vue'
import StoryblokClient from 'storyblok-js-client'
import StoryblokVue from 'storyblok-vue'

const loadScript = (src, cb) => {
  const id = 'storyblok-javascript-bridge'

  if (document.getElementById(id)) {
    return cb()
  }

  const script = document.createElement('script')
  script.async = true
  script.src = src
  script.id = id

  script.onerror = () => {
    cb(new Error(`Failed to load ${src}`))
  }

  script.onload = () => {
    cb()
  }

  document.getElementsByTagName('head')[0].appendChild(script)
}

const Client = {
  install() {
    const scriptSrc = 'https://app.storyblok.com/f/storyblok-latest.js'

    if (!Vue.prototype.$storyapi) {
      Vue.prototype.$storyapi = new StoryblokClient({
        accessToken: '<%= options.accessToken %>',
        cache: {
          clear: 'auto',
          type: '<%= options.cacheProvider %>'
        },
        timeout: <%= options.timeout || 0 %><% if(options.region) { %>,
        region: '<%= options.region %>' <% } %><% if (typeof options.https !== 'undefined') { %>,
        https: <%= options.https %><% } %>
      }<% if (typeof options.endpoint !== 'undefined') { %>, '<%= options.endpoint %>' <% } %>)

      Vue.prototype.$storybridge = {
        doLoadScript: true,
        proxy: null,
        on: function (events, cb, options) {
          var options = options || {}
          options.accessToken = '<%= options.accessToken %>'

          this.load(() => {
            window.storyblok.init(options)
            window.storyblok.on(events, (event) => {
              if (event.action == 'input') {
                event.story.content = this.proxy.addComments(event.story.content, event.story.id)
              }
              cb(event)
            })
          })
        },
        load: (cb, errorCb) => {
          if (typeof errorCb !== 'function') {
            errorCb = () => {}
          }

          if (window.location == window.parent.location) {
            errorCb('You are not in the edit mode.')
            return
          }

          if (!this.doLoadScript) {
            if (!window.storyblok) {
              errorCb('The Storyblok bridge script is already loading.')
              return
            }
            cb()
            return
          }

          this.doLoadScript = false
          loadScript(scriptSrc, () => {
            Vue.prototype.$storybridge.proxy = window.storyblok
            cb()
          })
        }
      }
    }
  }
}

Vue.use(Client)
Vue.use(StoryblokVue)

export default function (context) {
  const { app, store } = context
  const { $storyapi, $storybridge } = Vue.prototype

  app.$storyapi = $storyapi
  context.$storyapi = $storyapi
  app.$storybridge = $storybridge
  context.$storybridge = $storybridge

  if (store) {
    store.$storyapi = $storyapi
  }
}
