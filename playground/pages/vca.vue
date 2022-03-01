<script setup>
import { useStoryblok } from "@storyblok/nuxt";
const story = useStoryblok("vue/test", { version: "draft" });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
