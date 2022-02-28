<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
  <!-- <div>Hola</div> -->
</template>

<script>
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt";
const storyblokApi = useStoryblokApi();

export default {
  //eslint-disable-next-line
  asyncData: async ({ app }) => {
    const { data } = await storyblokApi.get("cdn/stories/vue", {
      version: "draft",
    });
    // OR: const { data } = await app.$storyapi.get("cdn/stories/vue", { version: "draft" });

    return { story: data.story };
  },
  mounted() {
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  },
};
</script>
