<script setup>
const story = ref(null);

onMounted(async () => {
  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/vue/test", {
    version: "draft"
  });
  story.value = data.story;

  useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory));
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
