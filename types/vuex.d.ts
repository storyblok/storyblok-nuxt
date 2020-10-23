import Storyblok from 'storyblok-js-client';

declare module 'vuex/types/index' {
  interface Store<S> {
    $storybridge: StoryblokBridge
    $storyapi: Storyblok
  }
}
