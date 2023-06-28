// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['../src/module'],
  storyblok: {
    accessToken: "OurklwV5XsDJTIE1NJaD2wtt",
    apiOptions: {
      region: ""
    },
    devtools: true,
    // enableSudoMode: true /* (or legacy) usePlugin: false */
  },
  app: {
    head: {
      script: [{ src: "https://cdn.tailwindcss.com" }]
    }
  },
  devtools: { enabled: true },
  vite: {
    optimizeDeps: { exclude: ["fsevents"] },
  },
})
