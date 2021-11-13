<template>
  <div>
    <h1>Example stories</h1>
    <div v-editable="blok" data-test="stories">
      <p v-for="story in stories" :key="story.id">{{ story.name }}</p>
    </div>
  </div>
</template>

<script setup>
const storyapi = useStoryApi();
const { data } = await storyapi.get("cdn/stories");
const stories = data.stories;

// onMounted(() => {
//   useStoryBridge(id, (story) => (data.story = story));
// });
</script>
