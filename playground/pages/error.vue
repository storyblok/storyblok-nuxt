<script setup lang="ts">
/* import type { ISbStoryData } from "@storyblok/vue";
let story = useState<ISbStoryData>();

try {
  story = await useAsyncStoryblok("vue-test", { version: "draft" });
} catch (error) {
  console.error(error);
} */
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
