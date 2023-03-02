import { StoryblokVue, apiPlugin } from "@storyblok/vue";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin(({ vueApp }) => {
  let { storyblok } = useRuntimeConfig();
  storyblok = JSON.parse(JSON.stringify(storyblok));
  vueApp.use(StoryblokVue, { ...storyblok, use: [apiPlugin] });
});
