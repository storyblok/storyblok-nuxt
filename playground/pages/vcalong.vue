<script setup>
import { onMounted, ref, useFetch } from "@nuxtjs/composition-api";
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt";

const story = ref(null);

const { fetch } = useFetch(async () => {
  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/vue/test`, {
    version: "draft",
  });
  story.value = data.story;
});
fetch();

onMounted(async () => {
  if (story.value && story.value.id)
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory));
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
