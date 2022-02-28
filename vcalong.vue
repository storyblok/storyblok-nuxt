<script setup>
import { onMounted, ref } from "@vue/composition-api";
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/vue-2";

const story = ref(null);

onMounted(async () => {
  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/vue", {
    version: "draft",
  });
  story.value = data.story;

  useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory));
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
