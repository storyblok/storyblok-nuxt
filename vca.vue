<script setup>
import { useStoryblok } from "@storyblok/vue-2";
const story = useStoryblok("vue", { version: "draft" });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
