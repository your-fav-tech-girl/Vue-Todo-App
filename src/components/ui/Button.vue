<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "default", // default variant
  },
  extraClass: {
    type: String,
    default: "",
  },
});

const baseClasses =
  "inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  default: "bg-gray-500 text-white hover:bg-gray-600 px-2 py-2",
  outline:
    "bg-white border border-gray-300 text-gray-700 hover:bg-gray-500 px-4 py-2",
  ghost: "text-gray-700 bg-transparent hover:bg-gray-100 px-4 py-2",
  danger: "bg-red-500 text-white hover:bg-red-600 px-4 py-2",
};

const buttonClasses = computed(
  () =>
    `${baseClasses} ${variants[props.variant] || variants.default} ${
      props.extraClass
    }`
);
</script>

<template>
  <button :class="buttonClasses" v-bind="$attrs">
    <slot />
  </button>
</template>
