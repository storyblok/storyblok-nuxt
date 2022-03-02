import { defineConfig } from "vite";
// import { createVuePlugin } from "vite-plugin-vue2";
import path from "path";

const name = "storyblok-nuxt";

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, "index.js"),
        name: "storyblokNuxt",
        fileName: (format) => (format === "es" ? `${name}.mjs` : `${name}.js`),
      },
      rollupOptions: {
        output: {
          globals: {
            vue: "Vue",
            "@vue/composition-api": "VueCompositionAPI",
            "@nuxtjs/composition-api": "NuxtCompositionAPI",
          },
        },
        external: [
          "axios",
          "vue",
          "@vue/composition-api",
          "@nuxtjs/composition-api",
        ],
        // external: [] // FIX: temporary till we remove axios dependency in storyblok-js-client
      },
    },
    // plugins: [createVuePlugin()]
  };
});
