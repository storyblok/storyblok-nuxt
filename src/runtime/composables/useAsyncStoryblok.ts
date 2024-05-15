import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue";
import type { ISbStoriesParams, StoryblokBridgeConfigV2, ISbStoryData } from '@storyblok/vue';
import { useState, onMounted, useAsyncData, useRuntimeConfig } from "#imports";
import { type AsyncDataOptions } from "#imports";
import deprecate from "util-deprecate";

export const useAsyncStoryblok = async (
  url: string,
  apiOptions: ISbStoriesParams = {},
  bridgeOptions: StoryblokBridgeConfigV2 = {},
  asyncOptions: AsyncDataOptions = undefined
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

  const options = useRuntimeConfig().public.storyblok;
  if (!options.asyncDataOutput && asyncOptions === undefined) {
    if (!story.value) {
      deprecate(() => {}, "`useAsyncStoryblok` will return an `AsyncData` object ({ data, pending, ... }) in the future. You can change this behavior now by passing an AsyncDataOptions object as the last argument or setting `asyncDataOutput: true` in module options in `nuxt.config`.", "STORYBLOK-DEPR-ASYNC")();
      const { data } = await useAsyncData(uniqueKey, () => {
        return storyblokApiInstance.get(
          `cdn/stories/${url}`,
          apiOptions
        );
      })
      if(data) {
        story.value = data.value?.data.story
      }
    }

    return story
  }

  return await useAsyncData(
    uniqueKey,
    () => {
      return storyblokApiInstance
        .get(`cdn/stories/${url}`, apiOptions)
        .then((r) => r.data.story)
    },
    asyncOptions
  )
};
