import Vue from 'vue'
import StoryblokClient from 'storyblok-js-client'
import StoryblokVue from 'storyblok-vue'

const loadScript = function (src, cb) {
  if (document.getElementById('storyblok-javascript-bridge')) {
    return cb()
  }

  const script = document.createElement('script')
  script.src = src
  script.id = 'storyblok-javascript-bridge'

  script.onerror = function () {
    cb(new Error('Failed to load' + src))
  }

  script.onload = function () {
    cb()
  }

  document.body.appendChild(script)
}

const globalOptions = JSON.parse('<%= options %>')
const StoryApi = new StoryblokClient(globalOptions)

const StoryBridge = {
  doLoadScript: true,
  proxy: null,
  on (events, cb) {
    this.load(() => {
      window.storyblok.init(globalOptions)
      window.storyblok.on(events, (event) => {
        if (event.action === 'input') {
          event.story.content = this.proxy.addComments(event.story.content, event.story.id)
        }
        cb(event)
      })
    })
  },
  load (cb) {
    if (window.location === window.parent.location && !window.Cypress) {
      // not sure logging things here is useful
      // console.log('You are not in the edit mode.')
      return
    }

    if (!this.doLoadScript) {
      if (!window.storyblok) {
        // not sure logging things here is useful.
        // console.log('The Storyblok bridge script is already loading.')
        return
      }
      cb()
      return
    }

    loadScript('https://app.storyblok.com/f/storyblok-latest.js', () => {
      this.proxy = window.storyblok
      this.doLoadScript = false
      cb()
    })
  },
  resolveRelations (relationsToResolve, cb) {
    this.load(() => {
      const sb = window.storyblok
      sb.init(globalOptions)
      sb.on('input', (data) => {
        sb.addComments(data.story.content, data.story.id)

        sb.resolveRelations(data.story, relationsToResolve, (event) => {
          cb(data)
        })
      })
    })
  }
}

Vue.use(StoryblokVue)

export default (_, inject) => {
  inject('storyapi', StoryApi)
  inject('storybridge', StoryBridge)
}
