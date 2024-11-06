import { apiPlugin, StoryblokVue } from '@storyblok/vue';
import { defineNuxtPlugin, useRuntimeConfig } from '#app';

// TODO: This comment is used to generate a new version with semantic release, remove it on next version

export default defineNuxtPlugin(({ vueApp }) => {
  let { storyblok } = useRuntimeConfig().public;
  storyblok = JSON.parse(JSON.stringify(storyblok));
  vueApp.use(StoryblokVue, { ...storyblok, use: [apiPlugin] });
});
