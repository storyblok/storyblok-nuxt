<template>
  <div v-editable="blok" class="px-6" data-test="page">
    <StoryblokComponent
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>
