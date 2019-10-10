import Vue from 'vue'
import Storyblok from 'storyblok-js-client'

declare module 'vue/types/vue' {
  interface Vue {
    $storyapi: Storyblok
    $storybridge: StoryblokBridge,
  }
}
