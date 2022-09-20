<script setup>
const story = await useAsyncStoryblok("vue", { version: "draft" });
const richText = computed(() => renderRichText(story.value.content.richText));
</script>

<template>
  <div>
    <div v-html="richText"></div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
