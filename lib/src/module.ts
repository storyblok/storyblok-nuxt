import { resolve } from "path";
import { defineNuxtModule, addPlugin } from "@nuxt/kit";
// import { StoryblokConfig } from "storyblok-js-client/types/index";

export interface ModuleOptions {
  accessToken?: String;
  apiOptions?: any;
  bridge?: Boolean;
}

const noopTransform = () => {
  return {
    props: [],
    needRuntime: true,
  };
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@storyblok/nuxt",
    configKey: "storyblok",
  },
  defaults: {},
  setup(options, nuxt) {
    // Transpile runtime files
    const runtimeDir = resolve(__dirname, "./runtime");
    nuxt.options.build.transpile.push(runtimeDir);
    // nuxt.options.build.transpile.push("storyblok-js-client");

    // Add plugin
    addPlugin(resolve(__dirname, "./runtime/plugin"));
    nuxt.options.publicRuntimeConfig.storyblok = options;

    // Autoimports
    nuxt.hook("autoImports:dirs", (dirs) => {
      dirs.push(resolve(__dirname, "./runtime/composables"));
    });

    nuxt.hook("build:before", (_, config) => {
      // Add SSR directive
      const opts = config.loaders.vue.compilerOptions;
      const transforms = opts.directiveTransforms || {};
      opts.directiveTransforms = { ...transforms, editable: noopTransform };
    });
  },
});
