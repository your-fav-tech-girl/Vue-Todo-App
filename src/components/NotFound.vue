<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-6">
    <div
      class="max-w-md w-full bg-white shadow rounded-lg p-6 space-y-6 text-center"
    >
      <h1 class="text-5xl font-extrabold">404</h1>
      <p class="text-gray-600">Not Found.</p>

      <RouterLink
        to="/"
        class="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        ← Back to home
      </RouterLink>
    </div>
  </div>
</template>
