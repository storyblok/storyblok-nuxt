<template>
  <div v-editable="blok" class="py-2" data-test="feature">
    <h1 class="text-lg">{{ blok.name }}</h1>
  </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>
