import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue";
import { useAsyncData, useState, onMounted, createError } from "#imports";

export const useAsyncStoryblok = async (
  url,
  apiOptions = {},
  bridgeOptions = {}
) => {
  const uniqueKey = `${JSON.stringify(apiOptions)}${url}`;
  const story = useState(`${uniqueKey}-state`, () => null);
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
  
  if (error.value?.response.status === 404) {
    throw createError({
      statusCode: 404,
      fatal: true,
      statusMessage: 'Story not found'
    });
  }
  
  story.value = data.value.data.story;

  return story;
};
