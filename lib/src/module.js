import {
  createResolver,
  defineNuxtModule,
  addPlugin,
  addComponentsDir,
  addImports,
  addImportsDir
} from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@storyblok/nuxt",
    configKey: "storyblok"
  },
  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const axiosIndex = nuxt.options.build.transpile.indexOf("axios");
    if (axiosIndex !== -1) {
      nuxt.options.build.transpile.splice(axiosIndex, 1);
    }
    nuxt.options.vite.optimizeDeps.include =
      nuxt.options.vite.optimizeDeps.include || [];
    nuxt.options.vite.optimizeDeps.include.push("axios");
    nuxt.options.vite.optimizeDeps.include.push("@storyblok/vue");
    nuxt.options.vite.optimizeDeps.include.push("@storyblok/nuxt");

    // Enable dirs
    // nuxt.options.components.dirs = ["~/components/storyblok"];
    addComponentsDir({ path: "~/storyblok", global: true, pathPrefix: false });

    nuxt.options.build.transpile.push("./runtime");
    nuxt.options.build.transpile.push("@storyblok/nuxt");
    nuxt.options.build.transpile.push("@storyblok/vue");

    // Add plugin
    nuxt.options.runtimeConfig.public.storyblok = options;
    if (options.usePlugin !== false) addPlugin(resolve("./runtime/plugin"));

    // Autoimports
    const names = [
      "useStoryblok",
      "useStoryblokApi",
      "useStoryblokBridge",
      "renderRichText",
      "RichTextSchema"
    ];
    names.forEach((name) =>
      addImports({ name, as: name, from: "@storyblok/vue" })
    );
    addImportsDir(resolve("./runtime/composables"));
  }
});
