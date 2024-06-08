<script setup lang="ts">
import type { ISbComponentType } from "storyblok-js-client";

const path = useRoute();

type SbArticle = ISbComponentType<"article"> & {
  title: string;
};

const story = await useAsyncStoryblok<SbArticle>(
  `vue/articles/${path.params.slug}`,
  {
    version: "draft",
    language: "en"
  }
);
</script>

<template>
  <main v-editable class="container mx-auto pt-24">
    <h2>{{ story?.content.title }}</h2>
  </main>
</template>
