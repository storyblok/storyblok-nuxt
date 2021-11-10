<template>
  <div>
    <h1>Example stories</h1>
    <div v-editable="blok" data-test="stories">
      <p v-for="story in stories" :key="story.id">{{ story.name }}</p>
    </div>
  </div>
</template>

<script setup>
const app = useNuxtApp();

const { data } = await app.$storyapi.get("cdn/stories");
const stories = data.stories;

const blok = {
  _editable: `<!--#storyblok#{ "id": 12345, "uid": "fc34-uad1"}-->`,
};
</script>
