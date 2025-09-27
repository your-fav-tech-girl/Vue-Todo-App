<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
  >
    <div class="bg-white rounded-lg shadow p-6 max-w-sm w-full">
      <h2 class="font-bold text-lg mb-4">{{ title }}</h2>
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-end gap-2">
        <Button variant="ghost" @click="$emit('cancel')">Cancel</Button>
        <Button variant="danger" @click="$emit('confirm')">Confirm</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
const props = defineProps({ show: Boolean, title: String, message: String });
</script>
