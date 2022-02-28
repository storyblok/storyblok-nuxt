export default {
  target: "server",
  components: true,
  head: {
    title: "playground",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://cdn.tailwindcss.com" }],
  },

  buildModules: [
    [
      "@storyblok/nuxt/module",
      {
        accessToken: "OurklwV5XsDJTIE1NJaD2wtt",
        bridge: process.env.NODE_ENV !== "production",
      },
    ],
    // "@nuxtjs/composition-api/module"
  ],
};
