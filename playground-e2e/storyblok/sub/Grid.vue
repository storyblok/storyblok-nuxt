<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div v-editable="blok" class="flex py-8 mb-6" data-test="grid">
    <div
      v-for="subBlok in blok.columns"
      :key="subBlok._uid"
      class="flex-auto px-6"
    >
      <StoryblokComponent :blok="subBlok" />
    </div>
  </div>
</template>
