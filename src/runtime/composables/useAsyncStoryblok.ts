import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue";
import type { ISbStoriesParams, StoryblokBridgeConfigV2, ISbStoryData } from '@storyblok/vue';
import type { ISbComponentType } from 'storyblok-js-client';
import { useState, onMounted, useAsyncData } from "#imports";

export const useAsyncStoryblok = async <
  SbComponent extends ISbComponentType<string>,
>(
  url: string,
  apiOptions: ISbStoriesParams = {},
  bridgeOptions: StoryblokBridgeConfigV2 = {},
): Promise<Ref<ISbStoryData<SbComponent> | undefined>> => {
  const storyblokApiInstance = useStoryblokApi();
  const uniqueKey = `${JSON.stringify(apiOptions)}${url}`;
  const story = useState<ISbStoryData<SbComponent>>(`${uniqueKey}-state`);

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
        apiOptions
      );
    })
    if (data) {
      story.value = data.value?.data.story
    }
  }
  return story
};
