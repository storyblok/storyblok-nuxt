import { Module } from '@nuxt/types'
import Storyblok from 'storyblok-js-client'
import initOptions, { Options } from './options'
import setupBuild from './build'

declare module 'vue/types/vue' {
  interface Vue {
    $storyapi: Storyblok
    $storybridge: StoryblokBridge
  }
}

declare module '@nuxt/types' {
  interface Configuration {
    storyblok?: Options
  }

  interface Context {
    $storyapi: Storyblok
    $storybridge: StoryblokBridge
  }

  interface NuxtAppOptions {
    $storyapi: Storyblok
    $storybridge: StoryblokBridge
  }
}

const storyblokNuxt: Module<Options> = function (moduleOptions) {
  this.nuxt.hook('build:before', () => {
    const options = initOptions.call(this, moduleOptions)
    setupBuild.call(this, options)
  })
}

export default storyblokNuxt
export const meta = require('../package.json')
