import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue";
import { useAsyncData, useState, onMounted } from "#imports";

export const useAsyncStoryblok = async (
  url,
  apiOptions = {},
  bridgeOptions = {}
) => {
  const uniqueKey = `${JSON.stringify(apiOptions)}${url}`;
  console.log("--- Key ---");
  console.log(uniqueKey);
  const story = useState(`${uniqueKey}-state`, () => null);
  const storyblokApiInstance = useStoryblokApi();

  onMounted(() => {
    console.log("--- Story ---");
    console.log(story.value, story.value.id);
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
