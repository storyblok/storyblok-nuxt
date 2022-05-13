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

<script setup>
defineProps({ blok: Object });
</script>
