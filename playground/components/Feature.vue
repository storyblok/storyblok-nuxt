<template>
  <div v-editable="blok" class="py-2" data-test="feature">
    <h1 class="text-lg">{{ blok.name }}</h1>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>
