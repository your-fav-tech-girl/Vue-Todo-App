<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div role="main" class="p-4">
    <!-- Header -->
    <header
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
    >
      <h1 class="text-2xl sm:text-4xl font-bold text-green-600">Todo App</h1>

      <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <!-- Trigger Error -->
        <RouterLink to="/test-error">
          <button
            class="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600"
          >
            Trigger Error
          </button>
        </RouterLink>

        <!-- Home -->
        <RouterLink to="/">
          <button
            class="border bg-gray-500 text-white text-sm px-4 py-2 rounded hover:bg-gray-200"
          >
            Home
          </button>
        </RouterLink>
      </div>
    </header>

    <!-- Nested Routes -->
    <RouterView />
  </div>
</template>
