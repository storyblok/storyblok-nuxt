import path from "path";
import { defineNuxtModule, addPluginTemplate } from "@nuxt/kit";

export const ssrTransformCustomDir = () => {
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
    "build:before": (builder, { loaders }) => {
      const transforms = loaders.vue.compilerOptions.directiveTransforms || {};
      loaders.vue.compilerOptions.directiveTransforms = {
        ...transforms,
        editable: ssrTransformCustomDir,
      };
    },
  },
});
