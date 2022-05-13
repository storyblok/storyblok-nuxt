<script setup>
const story = await useStoryblok("vue", { version: "draft" });
</script>

<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
