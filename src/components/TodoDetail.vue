<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { loadTodos, saveTodos } from "../api";
import Card from "./ui/Card.vue";
import CardHeader from "./ui/CardHeader.vue";
import CardContent from "./ui/CardContent.vue";
import CardFooter from "./ui/CardFooter.vue";
import Button from "./ui/Button.vue";
import Badge from "./ui/Badge.vue";
import { CheckCircle2, Circle, Undo2, ArrowLeft } from "lucide-vue-next";

// Get route params
const route = useRoute();
const router = useRouter();
const id = route.params.id;

// Todos state
const todos = ref(loadTodos());
const todo = todos.value.find((t) => String(t.id) === id);

if (!todo) {
  console.warn("Todo not found");
}

// Toggle completed status
function toggleStatus() {
  const updated = todos.value.map((t) =>
    t.id === todo.id ? { ...t, completed: !t.completed } : t
  );
  todos.value = updated;
  saveTodos(updated);
}

const isDone = ref(todo?.completed ?? false);
</script>

<template>
  <div v-if="todo">
    <Card>
      <CardHeader>
        <h2 class="font-bold text-lg">{{ todo.title }}</h2>
        <Badge :variant="isDone ? 'success' : 'gray'">
          <component :is="isDone ? CheckCircle2 : Circle" class="w-4 h-4" />
          {{ isDone ? "Completed" : "Incomplete" }}
        </Badge>
      </CardHeader>

      <CardContent>
        <p class="text-sm text-gray-600">ID #{{ todo.id }}</p>
      </CardContent>

      <CardFooter>
        <Button class="flex items-center gap-1" @click="toggleStatus">
          <Undo2 class="w-4 h-4" />
          Toggle Status
        </Button>
        <Button class="flex items-center gap-1" @click="router.back()">
          <ArrowLeft class="w-4 h-4" />
          Back
        </Button>
      </CardFooter>
    </Card>
  </div>

  <div v-else class="p-4 text-center">Todo not found.</div>
</template>
