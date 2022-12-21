import {
  defineNuxtModule,
  addPlugin,
  addComponentsDir,
  addImports,
  addImportsDir,
  createResolver
} from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@storyblok/nuxt",
    configKey: "storyblok"
  },
  defaults: {
    usePlugin: true
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const axiosIndex = nuxt.options.build.transpile.indexOf("axios");
    if (axiosIndex !== -1) {
      nuxt.options.build.transpile.splice(axiosIndex, 1);
    }
    nuxt.options.vite.optimizeDeps.include =
      nuxt.options.vite.optimizeDeps.include || [];
    nuxt.options.vite.optimizeDeps.include.push("axios");
    nuxt.options.vite.optimizeDeps.include.push("@storyblok/nuxt");
    nuxt.options.vite.optimizeDeps.include.push("@storyblok/vue");

    // Enable dirs
    // nuxt.options.components.dirs = ["~/components/storyblok"];
    addComponentsDir({ path: "~/storyblok", global: true, pathPrefix: false });

    nuxt.options.build.transpile.push(resolver.resolve("./runtime"));
    nuxt.options.build.transpile.push("@storyblok/nuxt");
    nuxt.options.build.transpile.push("@storyblok/vue");

    // Add plugin
    nuxt.options.runtimeConfig.public.storyblok = options;
    if (options.usePlugin !== false) {
      addPlugin(resolver.resolve("./runtime/plugin"));
    }

    // Add auto imports
    const names = [
      "useStoryblok",
      "useStoryblokApi",
      "useStoryblokBridge",
      "renderRichText",
      "RichTextSchema"
    ];
    for (const name of names) {
      addImports({ name, as: name, from: "@storyblok/vue" });
    }
    addImportsDir(resolver.resolve("./runtime/composables"));
  }
});
