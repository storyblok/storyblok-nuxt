/* import { StoryblokVue, apiPlugin } from "@storyblok/vue";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(StoryblokVue, {
    accessToken: "OurklwV5XsDJTIE1NJaD2wtt",
    apiOptions: {
      cache: {
        type: "custom",
        custom: {
          flush() {
            console.log("all right");
          }
        }
      }
    },
    use: [apiPlugin]
  });
});
 */

export default defineNuxtPlugin(() => {});
