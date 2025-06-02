import {
  addComponentsDir,
  addImports,
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';
import type { NuxtHookName } from '@nuxt/schema';
import type { Nuxt } from 'nuxt/schema';

export interface ModuleOptions {
  accessToken: string;
  enableSudoMode: boolean;
  usePlugin: boolean; // legacy opt. for enableSudoMode
  bridge: boolean; // storyblok bridge on/off
  devtools: boolean; // enable nuxt/devtools integration
  apiOptions: any; // storyblok-js-client options
  componentsDir: string; // enable storyblok global directory for components
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@storyblok/nuxt',
    configKey: 'storyblok',
  },
  defaults: {
    accessToken: '',
    enableSudoMode: false,
    usePlugin: true, // legacy opt. for enableSudoMode
    bridge: true,
    devtools: false,
    componentsDir: '~/storyblok',
    apiOptions: {},
  },
  setup(options: ModuleOptions, nuxt: Nuxt) {
    const resolver = createResolver(import.meta.url);

    if (nuxt.options.vite.optimizeDeps) {
      nuxt.options.vite.optimizeDeps.include
        = nuxt.options.vite.optimizeDeps.include || [];
      nuxt.options.vite.optimizeDeps.include.push('@storyblok/vue');

      nuxt.options.vite.optimizeDeps.exclude
        = nuxt.options.vite.optimizeDeps.exclude || [];
      nuxt.options.vite.optimizeDeps.exclude.push('fsevents');
    }

    // Enable dirs
    if (options.componentsDir) {
      addComponentsDir({ path: options.componentsDir, global: true, pathPrefix: false });
    }
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'));
    nuxt.options.build.transpile.push('@storyblok/nuxt');
    nuxt.options.build.transpile.push('@storyblok/vue');

    // Add plugin
    nuxt.options.runtimeConfig.public.storyblok = options;
    const enablePluginCondition = options.usePlugin === true && options.enableSudoMode === false;
    if (enablePluginCondition) {
      addPlugin(resolver.resolve('./runtime/plugin'));
    }

    // Add auto imports
    const names = [
      'useStoryblok',
      'useStoryblokApi',
      'useStoryblokBridge',
      'renderRichText',
      'StoryblokRichText',
      'useStoryblokRichText',
      'MarkTypes',
      'BlockTypes',
      'LinkTypes',
      'AssetTypes',
      'StoryblokRichTextResolvers',
      'StoryblokRichTextDocumentNode',
      'StoryblokRichTextImageOptimizationOptions',
      'StoryblokRichTextNode',
      'StoryblokRichTextNodeResolver',
      'StoryblokRichTextNodeTypes',
      'StoryblokRichTextOptions',
    ];
    for (const name of names) {
      addImports({ name, as: name, from: '@storyblok/vue' });
    }

    nuxt.options.typescript.hoist.push('@storyblok/vue');
    addImportsDir(resolver.resolve('./runtime/composables'));

    if (options.devtools) {
      nuxt.hook('devtools:customTabs' as NuxtHookName, (iframeTabs: Array<unknown>): void => {
        iframeTabs.push({
          name: 'storyblok',
          title: 'Storyblok',
          icon: 'i-logos-storyblok-icon',
          view: {
            type: 'iframe',
            src: 'https://app.storyblok.com/#!/me/spaces/',
          },
        });
      });
    }
  },
});
