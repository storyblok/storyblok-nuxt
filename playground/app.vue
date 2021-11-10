<template>
  <div>
    <h1>Example stories</h1>
    <div data-test="stories">
      <p v-for="story in stories" :key="story.id">{{ story.name }}</p>
    </div>
  </div>
</template>

<script setup>
const app = useNuxtApp();

const { data } = await app.$storyapi.get("cdn/stories");
const stories = data.stories;
</script>
