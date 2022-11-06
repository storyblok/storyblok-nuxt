import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue";
import { useAsyncData, useState, onMounted, useRoute } from "#imports";

export const useAsyncStoryblok = async (
  url,
  apiOptions = {},
  bridgeOptions = {}
) => {
  const story = useState(url, () => null);
  const storyblokApiInstance = useStoryblokApi();
  const route = useRoute();
  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');

  onMounted(() => {
    if (isPreview && story.value && story.value.id) {
      useStoryblokBridge(
        story.value.id,
        (evStory) => (story.value = evStory),
        bridgeOptions
      );
    }
  });

  const { data } = await useAsyncData(
    url,
    async () => await storyblokApiInstance.get(`cdn/stories/${url}`, apiOptions)
  );
  story.value = data.value.data.story;

  return story;
};
