import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue-2";
import { useFetch, onMounted, ref } from "@nuxtjs/composition-api";

export {
  useStoryblokApi,
  useStoryblokBridge,
  apiPlugin,
  StoryblokVue,
} from "@storyblok/vue-2";

export const useStoryblok = (slug, apiOptions = {}, bridgeOptions = {}) => {
  const storyblokApi = useStoryblokApi(apiOptions);
  if (!storyblokApi)
    return console.error(
      "useStoryblok cannot be used if you disabled useApiClient when adding @storyblok/nuxt-beta to your nuxt.config.js"
    );

  const story = ref(null);

  onMounted(() => {
    if (story.value && story.value.id) {
      useStoryblokBridge(
        story.value.id,
        (evStory) => (story.value = evStory),
        bridgeOptions
      );
    }
  });

  const { fetch, fetchState } = useFetch(async () => {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, apiOptions);
    story.value = data.story;
  }, slug);
  fetch();

  return { story, fetchState };
};
