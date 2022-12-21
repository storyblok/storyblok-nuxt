export default defineNuxtConfig({
  modules: [
    [
      // "@storyblok/nuxt",
      "../lib/src/module.js",
      {
        accessToken: "OurklwV5XsDJTIE1NJaD2wtt",
        apiOptions: {
          region: ""
        }
        // usePlugin: false
      }
    ]
  ],
  app: {
    head: {
      script: [{ src: "https://cdn.tailwindcss.com" }]
    }
  }
});
