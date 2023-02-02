import { useAsyncData, useState, onMounted, createError } from "#imports";
import { useStoryblokApi, useStoryblokBridge } from '@storyblok/vue';
import type { ISbStoryData, ISbResult, ISbError } from '@storyblok/vue';

const useAsyncStoryblok = async (url, apiOptions = {}, bridgeOptions = {}) => {
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

  await useAsyncData<ISbResult, ISbError>(
    `${uniqueKey}-asyncdata`,
    async () => await storyblokApiInstance.get(`cdn/stories/${url}`, apiOptions),
  ).then((response) => {
    const { data, error } = response;
    const storyblokData = data.value as ISbResult;
    const storyblokError = error.value as ISbError;
    if (storyblokError) {
      if (storyblokError.response.status >= 400 && storyblokError.response.status < 600) {
        throw createError({ statusCode: storyblokError.response.status, statusMessage: storyblokError.message.message })
      }
    }
    story.value = storyblokData.data.story;
  });
  return story;
};

export default useAsyncStoryblok;
