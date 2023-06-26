<script setup>
const { slug } = useRoute().params;
const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join("/") : "home",
  {
    version: "draft",
    language: "en",
    resolve_relations: ["popular-articles.articles"]
  }
);

if (story.value.status) {
  throw createError({
    statusCode: story.value.status,
    statusMessage: story.value.response
  });
}
</script>

<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
