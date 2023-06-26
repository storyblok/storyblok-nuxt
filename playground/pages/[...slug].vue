<script setup>
const { slug } = useRoute().params;
const story = ref();

try {
  story.value = await useAsyncStoryblok(
    slug && slug.length > 0 ? slug.join("/") : "home",
    {
      version: "draft",
      language: "en",
      resolve_relations: ["popular-articles.articles"]
    }
  );
} catch (error) {
  throw createError(error);
}
</script>

<template>
  <div>
    {{ story }}
  </div>
</template>
