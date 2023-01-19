import { useAsyncData, useState, onMounted } from "#imports";
import { useStoryblokApi, useStoryblokBridge } from '@storyblok/vue';
import type { ISbStoryData } from '@storyblok/vue';

export const useAsyncStoryblok = async (
  url,
  apiOptions = {},
  bridgeOptions = {}
) => {
  const uniqueKey = `${JSON.stringify(apiOptions)}${url}`;
  const story = useState<ISbStoryData>(`${uniqueKey}-state`, () => ({}));
  const storyblokApiInstance = useStoryblokApi();

  onMounted(() => {
    if (story.value && story.value.id) {
      useStoryblokBridge(
        story.value.id,
        (evStory) => (story.value = evStory),
        bridgeOptions
      );
    }
  });

  const { data } = await useAsyncData(
    `${uniqueKey}-asyncdata`,
    async () => await storyblokApiInstance.get(`cdn/stories/${url}`, apiOptions)
  );
  story.value = data.value.data.story;

  return story;
};
