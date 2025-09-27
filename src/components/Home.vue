<script setup>
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchTodos } from "../api";
import { RouterLink } from "vue-router";
import {
  Plus,
  Eye,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";

const ItemsPerPage = 10;

// State
const search = ref("");
const filter = ref("all");
const page = ref(1);

// Fetch todos with Vue Query
const {
  data: todos = [],
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});

// Computed: filter todos
const filteredTodos = computed(() =>
  todos.value
    .filter((todo) =>
      todo.title.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter((todo) => {
      if (filter.value === "all") return true;
      if (filter.value === "complete") return todo.completed;
      return !todo.completed;
    })
);

// Pagination
const paginatedTodos = computed(() => {
  const start = (page.value - 1) * ItemsPerPage;
  return filteredTodos.value.slice(start, start + ItemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredTodos.value.length / ItemsPerPage)
);
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto purple-500">
    <h1 class="text-4xl font-bold mb-4 text-center text-purple-400">
      Todo List
    </h1>

    <!-- Search + Filter + Add -->
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <!-- Search -->
      <div class="relative">
        <input
          v-model="search"
          type="text"
          placeholder="Search..."
          class="border px-8 py-2 rounded w-full"
          aria-label="Search todos"
        />
        <span class="absolute left-2 top-3 text-gray-400">🔍</span>
      </div>

      <!-- Filter -->
      <div class="relative">
        <select
          v-model="filter"
          class="border px-2 py-2 pl-8 rounded"
          aria-label="Filter todos"
        >
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <span class="absolute left-2 top-3 text-gray-400"></span>
      </div>

      <!-- Add Todo -->
      <RouterLink
        to="/add"
        class="ml-auto bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-800 inline-flex items-center gap-2"
      >
        ➕ Add Todo
      </RouterLink>
    </div>

    <!-- Todos List -->
    <ul class="space-y-2">
      <li
        v-for="todo in paginatedTodos"
        :key="todo.id"
        class="flex justify-between items-center p-3 bg-gray-200 rounded"
      >
        <div>
          <p class="font-medium">{{ todo.title }}</p>
        </div>
        <RouterLink
          :to="`/todos/${todo.id}`"
          class="text-purple-500 hover:underline inline-flex items-center gap-1"
        >
          👁 View
        </RouterLink>
      </li>
    </ul>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-4 mt-6">
      <button
        :disabled="page === 1"
        @click="page--"
        variant="outline"
        class="flex items-center gap-1 px-3 py-2 text-white bg-purple-500 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span> Page {{ page }} of {{ totalPages }} </span>
      <button
        variant="outline"
        :disabled="page === totalPages"
        @click="page++"
        class="flex items-center gap-1 px-3 py-2 text-white bg-purple-500 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>
