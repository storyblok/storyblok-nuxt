export default {
  target: "server",

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
  },

  buildModules: [
    // accessToken from official example https://www.storyblok.com/docs/api/content-delivery/v2
    ["@storyblok/nuxt", { accessToken: "wANpEQEsMYGOwLxwXQ76Ggtt" }],
  ],
};
