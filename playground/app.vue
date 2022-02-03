<template>
  <div>
    <h1>Example stories</h1>
    <div v-editable="blok.content" data-test="stories">
      <p v-for="story in state.stories" :key="story.id">{{ story.name }}</p>
    </div>
  </div>
</template>

<script setup>
const storyapi = useStoryblokApi();
const { data } = await storyapi.get("cdn/stories", { version: "draft" });
const state = reactive({ stories: data.stories });

const blok = {
  content: {
    _editable: `<!--#storyblok#{ "id": 12345, "uid": "fc34-uad1"}-->`,
  },
};

// onMounted(() => {
//   useStoryblokBridge(id, (story) => (state.story = story));
// });
</script>

<script>
export default {
  mounted() {
    console.log(this.$storyapi);
  },
};
</script>
