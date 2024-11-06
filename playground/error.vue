<script setup>
/* defineProps <
  {
    error: { statusCode: number; statusMessage: string };
  }
>;
{}; */

defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="grid place-items-center h-screen text-center">
    <div class="flex flex-col gap-y-4">
      <h1 class="font-bold text-4xl">Error {{ error.statusCode }}</h1>
      <p>{{ error.statusMessage }}</p>
      <button
        class="px-4 py-2 bg-green-600 text-white rounded-lg"
        @click="handleError"
      >
        Clear errors
      </button>
    </div>
  </div>
</template>
