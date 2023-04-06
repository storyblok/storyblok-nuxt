import {
  defineNuxtModule,
  addPlugin,
  addComponentsDir,
  addImports,
  addImportsDir,
  createResolver
} from "@nuxt/kit";

export interface ModuleOptions {
  accessToken: string,
  usePlugin: boolean,
  bridge: boolean, // storyblok bridge on/off
  devtools: boolean, // enable nuxt/devtools integration
  apiOptions: any, // storyblok-js-client options
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@storyblok/nuxt",
    configKey: "storyblok"
  },
  defaults: {
    accessToken: '',
    usePlugin: true,
    bridge: true,
    devtools: false,
    apiOptions: {},
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.vite.optimizeDeps.include =
      nuxt.options.vite.optimizeDeps.include || [];
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

    if (options.devtools) {
      // @ts-expect-error - private API
      nuxt.hook('devtools:customTabs', (iframeTabs) => {
        iframeTabs.push({
          name: 'storyblok',
          title: 'Storyblok',
          icon: 'i-logos-storyblok-icon',
          view: {
            type: 'iframe',
            src: 'https://app.storyblok.com/#!/me/spaces/'
          }
        })
      })
    }
  }
});
