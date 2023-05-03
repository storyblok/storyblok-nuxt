<script setup>
const route = useRoute();

const story = ref();
try {
  story.value = await useAsyncStoryblok(route.path, {
    version: "draft",
    language: "en",
    resolve_relations: ["popular-articles.articles"]
  });
} catch (error) {
  story.value = error;
}
</script>

<template>
  <div>
    {{ story }}
  </div>
</template>
