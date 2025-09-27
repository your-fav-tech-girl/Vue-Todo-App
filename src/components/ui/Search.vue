<template>
  <div class="relative w-full">
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  placeholder: { type: String, default: "Search..." },
});
</script>
