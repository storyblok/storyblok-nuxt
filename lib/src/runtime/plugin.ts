import { StoryblokVue, apiPlugin } from "@storyblok/vue";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin(({ vueApp }) => {
  const { storyblok } = useRuntimeConfig();
  vueApp.use(StoryblokVue, { ...storyblok, use: [apiPlugin] });

  // provide("storyapi", initStoryapi());
  // provide("storybridge", storybridge);
});
