export default defineNuxtConfig({
  modules: [
    [
      '@storyblok/nuxt',
      {
        accessToken: 'OurklwV5XsDJTIE1NJaD2wtt',
        apiOptions: {
          region: '',
        },
        devtools: true,
        // enableSudoMode: true /* (or legacy) usePlugin: false */
      },
    ],
    '@nuxt/devtools',
  ],
  app: {
    head: {
      script: [{ src: 'https://cdn.tailwindcss.com' }],
    },
  },
  vite: {
    optimizeDeps: { exclude: ['fsevents'] },
  },
});
