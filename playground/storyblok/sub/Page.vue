<script setup>
defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div v-editable="blok" class="px-6" data-test="page">
    <component
      :is="subBlok.component"
      v-for="subBlok in blok.body"
      :key="subBlok._uid"
      :blok="subBlok"
    />
  </div>
</template>
