import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  modules: [["@storyblok/nuxt", { accessToken: "OurklwV5XsDJTIE1NJaD2wtt" }]],
  app: {
    head: {
      script: [{ src: "https://cdn.tailwindcss.com" }]
    }
  }
});
