import path from "path";
import { defineNuxtModule, addPluginTemplate } from "@nuxt/kit";

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
});
