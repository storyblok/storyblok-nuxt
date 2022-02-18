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
  <div v-editable="blok">
    <component
      :is="subBlok.component"
      v-for="subBlok in props.blok.body"
      :key="subBlok._uid"
      :blok="subBlok"
    />
  </div>
</template>
