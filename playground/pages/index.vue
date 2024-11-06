<script setup lang="ts">
/* import type { SbBlokData } from '@storyblok/vue'; */

// const storyblokApi = useStoryblokApi();
// // Checking custom Flush method
// storyblokApi.flushCache();

const story = await useAsyncStoryblok('vue', {
  version: 'draft',
  language: 'en',
  resolve_relations: 'popular-articles.articles',
});

/* const penguin = await useStoryblok('vue', {
  version: 'draft',
  language: 'en',
  resolve_relations: 'popular-articles.articles',
});ß

const awiwi = ref<SbBlokData>({}); */

renderRichText(story.value.content.richText);

/* const richText = computed(() => renderRichText(story.value.content.richText)); */
</script>

<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
