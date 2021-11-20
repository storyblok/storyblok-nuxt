import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  buildModules: [
    ["@storyblok/nuxt", { accessToken: "wANpEQEsMYGOwLxwXQ76Ggtt" }],
  ],
  // vite: false
});
