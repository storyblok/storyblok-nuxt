<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    required: true
  }
});
</script>
<template>
  <iframe :src="blok.url.url" class="w-full aspect-video" frameborder="0" />
</template>
