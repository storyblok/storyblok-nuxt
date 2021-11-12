import path from "path";
import { defineNuxtModule, addPluginTemplate } from "@nuxt/kit";

export const noopTransform = () => {
  return {
    props: [],
    needRuntime: true,
  };
};

export default defineNuxtModule({
  name: "@storyblok/nuxt",
  configKey: "storyblok",
  defaults: {},
  setup(options) {
    addPluginTemplate({
      src: path.resolve(__dirname, "templates/plugin.js"),
      options,
    });
  },
  // We need to add the v-editable SSR impl or it will crash
  // info here: https://github.com/vuejs/vue-next/issues/3298
  hooks: {
    "build:before": ({ nuxt }, config) => {
      // If it's using Webpack
      if (nuxt.options.vite === false) {
        config.transpile = [
          ...(config.transpile || []),
          "@storyblok/vue",
          "storyblok-js-client",
        ];
      }

      const opts = config.loaders.vue.compilerOptions;
      const transforms = opts.directiveTransforms || {};
      opts.directiveTransforms = { ...transforms, editable: noopTransform };
    },
  },
});
