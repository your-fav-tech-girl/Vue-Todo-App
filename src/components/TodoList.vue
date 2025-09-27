<script setup>
import { ref, computed } from "vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { fetchTodos, loadTodos } from "../api";
import { RouterLink } from "vue-router";
import { CheckCircle, Circle, Pencil, TrashIcon } from "lucide-vue-next";

import Button from "./ui/Button.vue";
import Input from "./ui/Input.vue";
import Search from "./ui/Search.vue";
import AlertDialog from "./ui/AlertDialog.vue";

const PAGE_SIZE = 10;
const queryClient = useQueryClient();

const page = ref(1);
const search = ref("");
const statusFilter = ref("all");
const newTodo = ref("");
const editingId = ref(null);
const editValue = ref("");
const showDeleteDialog = ref(false);
const deleteTodoId = ref(null);

// Fetch todos
const {
  data: todos = ref([]),
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  initialData: loadTodos,
});

// Filtered & paginated
const filteredTodos = computed(() =>
  todos.value
    .filter((t) => t.title.toLowerCase().includes(search.value.toLowerCase()))
    .filter((t) => {
      if (statusFilter.value === "completed") return t.completed;
      if (statusFilter.value === "incomplete") return !t.completed;
      return true;
    })
);

const totalPages = computed(() =>
  Math.ceil(filteredTodos.value.length / PAGE_SIZE)
);

const currentItems = computed(() =>
  filteredTodos.value.slice(
    (page.value - 1) * PAGE_SIZE,
    page.value * PAGE_SIZE
  )
);

// Handlers
function handleAdd() {
  if (!newTodo.value.trim()) return;
  const newItem = { id: Date.now(), title: newTodo.value, completed: false };
  queryClient.setQueryData(["todos"], (old = []) => [newItem, ...old]);
  newTodo.value = "";
}

function startEditing(todo) {
  editingId.value = todo.id;
  editValue.value = todo.title;
}

function finishEditing(todo) {
  queryClient.setQueryData(["todos"], (old = []) =>
    old.map((t) => (t.id === todo.id ? { ...t, title: editValue.value } : t))
  );
  editingId.value = null;
  editValue.value = "";
}

function toggleCompleted(todo) {
  queryClient.setQueryData(["todos"], (old = []) =>
    old.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
  );
}

function confirmDelete(id) {
  deleteTodoId.value = id;
  showDeleteDialog.value = true;
}

function handleDelete() {
  queryClient.setQueryData(["todos"], (old = []) =>
    old.filter((t) => t.id !== deleteTodoId.value)
  );
  showDeleteDialog.value = false;
}
</script>

<template>
  <div class="space-y-6 max-w-4xl mx-auto p-4">
    <!-- Search & Add -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <Search v-model="search" placeholder="Search todos..." />
      <Input
        v-model="newTodo"
        placeholder="Add new todo..."
        @keydown.enter="handleAdd"
      />
      <Button
        class="bg-green-500 text-white hover:bg-green-600 whitespace-nowrap"
        @click="handleAdd"
      >
        Add
      </Button>
    </div>

    <!-- Filters -->
    <div class="flex gap-2">
      <Button
        :extraClass="statusFilter === 'all' ? 'bg-gray-500' : ''"
        @click="statusFilter = 'all'"
      >
        All
      </Button>
      <Button
        :extraClass="statusFilter === 'completed' ? 'bg-gray-500' : ''"
        @click="statusFilter = 'completed'"
      >
        Completed
      </Button>
      <Button
        :extraClass="statusFilter === 'incomplete' ? 'bg-gray-500' : ''"
        @click="statusFilter = 'incomplete'"
      >
        Incomplete
      </Button>
    </div>

    <!-- Todos List -->
    <ul class="divide-y rounded-lg bg-gray-100 shadow">
      <li
        v-for="todo in currentItems"
        :key="todo.id"
        class="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
      >
        <!-- Left: completed icon + title -->
        <div
          class="flex items-start gap-3 cursor-pointer"
          @click="toggleCompleted(todo)"
        >
          <component
            :is="todo.completed ? CheckCircle : Circle"
            class="w-5 h-5 mt-1 text-gray-500"
          />
          <RouterLink
            :to="`/todos/${todo.id}`"
            :class="[
              'text-base',
              todo.completed ? 'line-through opacity-60' : '',
            ]"
          >
            {{ todo.title }}
          </RouterLink>
        </div>

        <!-- Right: edit / delete -->
        <div class="flex gap-2 items-center">
          <Button
            @click="startEditing(todo)"
            class="bg-transparent border border-gray-300 p-1 hover:bg-green-50 flex items-center justify-center"
          >
            <Pencil class="w-4 h-4 text-green-500" />
          </Button>

          <Input
            v-if="editingId === todo.id"
            v-model="editValue"
            @blur="finishEditing(todo)"
          />

          <Button
            @click="confirmDelete(todo.id)"
            class="bg-transparent border border-gray-300 p-1 hover:bg-red-50 flex items-center justify-center"
          >
            <TrashIcon class="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </li>
    </ul>

    <!-- Pagination -->
    <div class="flex justify-between items-center gap-3 mt-4">
      <Button :disabled="page === 1" @click="page--">Prev</Button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <Button :disabled="page === totalPages" @click="page++">Next</Button>
    </div>

    <!-- Delete Confirmation -->
    <AlertDialog
      :show="showDeleteDialog"
      title="Delete Todo"
      message="Are you sure you want to delete this todo?"
      @confirm="handleDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>
