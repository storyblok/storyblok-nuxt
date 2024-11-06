<script setup lang="ts">
const path = useRoute();
const story = await useAsyncStoryblok(`vue/articles/${path.params.slug}`, {
  version: 'draft',
  language: 'en',
});
</script>

<template>
  <main v-editable class="container mx-auto pt-24">
    <h2>{{ story.content.title }}</h2>
  </main>
</template>
