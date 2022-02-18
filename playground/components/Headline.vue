<script setup>
import { defineProps } from "vue";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <h2 class="storyblok-headline">
    {{ props.blok.text }}
  </h2>
</template>
