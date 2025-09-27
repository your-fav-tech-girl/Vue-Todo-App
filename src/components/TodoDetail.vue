<script setup>
import { useRoute, useRouter } from "vue-router";
import { useQueryClient } from "@tanstack/vue-query";
import Card from "./ui/Card.vue";
import CardHeader from "./ui/CardHeader.vue";
import CardTitle from "./ui/CardTitle.vue";
import CardContent from "./ui/CardContent.vue";
import CardFooter from "./ui/CardFooter.vue";
import Button from "./ui/Button.vue";
import Badge from "./ui/Badge.vue";
import { CheckCircle2, Circle, Undo2, ArrowLeft } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

// pull todos from Vue Query cache
const todos = queryClient.getQueryData(["todos"]) || [];
const todo = todos.find((t) => String(t.id) === route.params.id);

// computed status
const isDone = todo?.completed ?? false;
const statusIcon = isDone ? CheckCircle2 : Circle;
const statusText = isDone ? "Completed" : "Incomplete";

function toggleStatus() {
  if (!todo) return;
  queryClient.setQueryData(["todos"], (old = []) =>
    old.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
  );
}
</script>

<template>
  <div v-if="todo">
    <Card class="max-w-md mx-auto">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{{ todo.title }}</CardTitle>
        <Badge
          class="inline-flex items-center gap-1"
          :class="isDone ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'"
        >
          <component :is="statusIcon" class="w-4 h-4" />
          {{ statusText }}
        </Badge>
      </CardHeader>

      <CardContent class="text-sm text-muted-foreground">
        <p>ID #{{ todo.id }}</p>
      </CardContent>

      <CardFooter class="flex justify-end gap-2">
        <Button @click="toggleStatus" variant="default" class="gap-1">
          <Undo2 class="w-4 h-4" />
          Toggle Status
        </Button>

        <Button @click="router.back()" variant="default" class="gap-1">
          <ArrowLeft class="w-4 h-4" />
          Back
        </Button>
      </CardFooter>
    </Card>
  </div>

  <div v-else class="p-4 text-center">Todo not found.</div>
</template>
