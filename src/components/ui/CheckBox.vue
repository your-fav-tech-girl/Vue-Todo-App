<template>
  <label class="inline-flex items-center gap-2 cursor-pointer">
    <input type="checkbox" v-model="modelValue" class="form-checkbox h-4 w-4" />
    <span><slot /></span>
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

watch(
  () => props.modelValue,
  (val) => emit("update:modelValue", val)
);
</script>
