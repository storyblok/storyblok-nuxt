import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue";
import type { ISbStoriesParams, StoryblokBridgeConfigV2, ISbStoryData, ISbError, ISbResult } from '@storyblok/vue';
import { useAsyncData, useState, onMounted, createError } from "#imports";

export const useAsyncStoryblok = async (
  url: string,
  apiOptions: ISbStoriesParams = { version: 'draft' },
  bridgeOptions: StoryblokBridgeConfigV2 = {}
) => {
  const uniqueKey = `${JSON.stringify(apiOptions)}${url}`;
  const story = useState<ISbStoryData>(`${uniqueKey}-state`, () => ({} as ISbStoryData));
  const storyblokApiInstance = useStoryblokApi();

  onMounted(() => {
    if (story.value && story.value.id) {
      useStoryblokBridge(
        story.value.id,
        evStory => (story.value = evStory),
        bridgeOptions,
      );
    }
  });

  const { data, error } = await useAsyncData<ISbResult, ISbError>(
    `${uniqueKey}-asyncdata`,
    () => storyblokApiInstance.get(`cdn/stories/${url}`, apiOptions),
  );

  if (error.value?.response.status >= 400 && error.value?.response.status < 600) {
    throw createError({ statusCode: error.value?.response.status, statusMessage: error.value?.message.message });
  }

  story.value = data.value?.data.story;

  return story;
};
