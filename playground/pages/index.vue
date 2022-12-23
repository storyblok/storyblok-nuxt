<script setup>
const testStory = await useAsyncStoryblok("vue/test", {
  version: "draft",
  language: "en"
});
const story = await useAsyncStoryblok("vue", {
  version: "draft",
  language: "en",
  resolve_relations: ["popular-articles.articles"]
});

const richText = computed(() => renderRichText(story.value.content.richText));
</script>

<template>
  <div>
    <div v-html="richText"></div>
    <StoryblokComponent v-if="story" :blok="story.content" />
    <StoryblokComponent v-if="testStory" :blok="testStory.content" />
  </div>
</template>
