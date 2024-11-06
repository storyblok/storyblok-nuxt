<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    v-editable="blok"
    :cat="$attrs.cat"
    class="py-8 mb-6 text-5xl font-bold text-center"
    data-test="teaser"
  >
    {{ blok.headline }}
  </div>
</template>
