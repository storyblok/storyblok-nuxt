<template>
  <div>
    <h1>Example stories</h1>
    <div data-test="stories">
      <p v-for="story in stories" :key="story.id">{{ story.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    stories: [],
  }),
  async mounted() {
    const { data } = await this.$storyapi.get("cdn/stories");
    this.stories = data.stories;
  },
};
</script>
