<template>
  <span :class="classes"><slot /></span>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  variant: { type: String, default: "default" },
});

const classes = computed(() => {
  switch (props.variant) {
    case "success":
      return "inline-flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded";
    case "gray":
      return "inline-flex items-center gap-1 bg-gray-300 text-black px-2 py-1 rounded";
    default:
      return "inline-flex items-center gap-1 bg-gray-200 text-black px-2 py-1 rounded";
  }
});
</script>
