<script setup lang="ts">
import type { SbBlokData } from "@storyblok/js";
// const storyblokApi = useStoryblokApi();
// // Checking custom Flush method
// storyblokApi.flushCache();

const story = await useAsyncStoryblok<SbBlokData>("vue", {
  version: "draft",
  language: "en",
  resolve_relations: "popular-articles.articles"
});

/* const richText = computed(() => renderRichText(story.value.content.richText)); */
</script>

<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
