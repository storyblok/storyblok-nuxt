<script setup lang="ts">
// const storyblokApi = useStoryblokApi();
// // Checking custom Flush method
// storyblokApi.flushCache();

const story = await useAsyncStoryblok("vue", {
  version: "draft",
  language: "en",
  resolve_relations: "popular-articles.articles"
});

const richText = computed(() => renderRichText(story.value.content.richText));
</script>

<template>
  <div>
    <NuxtLink to="vue"> Vue </NuxtLink>
    <div v-html="richText" />
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
