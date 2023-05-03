<script setup lang="ts">
const story = await useAsyncStoryblok("vue", {
  version: "draft",
  language: "en",
  resolve_relations: "popular-articles.articles"
});
const richText = computed(() => renderRichText(story.value.content.richText));
</script>

<template>
  <div>
    <NuxtLink to="vue">Vue</NuxtLink>
    <div v-html="richText"></div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
