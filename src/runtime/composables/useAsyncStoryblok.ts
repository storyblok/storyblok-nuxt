import { useStoryblokApi, useStoryblokBridge } from '@storyblok/vue';
import type { ISbStoriesParams, ISbStoryData, StoryblokBridgeConfigV2 } from '@storyblok/vue';
import { onMounted, useAsyncData, useState } from '#imports';

export const useAsyncStoryblok = async (
  url: string,
  apiOptions: ISbStoriesParams = {},
  bridgeOptions: StoryblokBridgeConfigV2 = {},
) => {
  const storyblokApiInstance = useStoryblokApi();
  const uniqueKey = `${JSON.stringify(apiOptions)}${url}`;
  const story = useState<ISbStoryData>(`${uniqueKey}-state`);

  onMounted(() => {
    if (story.value && story.value.id) {
      useStoryblokBridge(
        story.value.id,
        evStory => (story.value = evStory),
        bridgeOptions,
      );
    }
  });

  if (!story.value) {
    const { data } = await useAsyncData(uniqueKey, () => {
      return storyblokApiInstance.get(
        `cdn/stories/${url}`,
        apiOptions,
      );
    });
    if (data) {
      story.value = data.value?.data.story;
    }
  }
  return story;
};
