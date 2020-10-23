import Storyblok from 'storyblok-js-client'
import Vue from 'vue'
import './vuex'

declare module '@nuxt/vue-app' {
  interface Context {
    $storybridge: StoryblokBridge
    $storyapi: Storyblok
  }
  interface NuxtAppOptions {
    $storybridge: StoryblokBridge
    $storyapi: Storyblok
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $storybridge: StoryblokBridge
    $storyapi: Storyblok
  }

  interface NuxtAppOptions {
    $storybridge: StoryblokBridge
    $storyapi: Storyblok
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $storybridge: StoryblokBridge
    $storyapi: Storyblok
  }
}
