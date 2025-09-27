import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/Layout.vue";
import TodoList from "../components/TodoList.vue";
import TodoDetail from "../components/TodoDetail.vue";
import NotFound from "../components/NotFound.vue";

// Vue doesn’t have ErrorBoundary built-in like React.
// Instead, you can use errorCaptured in components or
// define a global error handler.

const TestError = {
  template: `<div><h2>Error Test</h2><p>This route throws an error.</p></div>`,
  created() {
    throw new Error("Test error");
  },
};

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "", component: TodoList },
      { path: "todos/:id", component: TodoDetail },
      { path: "test-error", component: TestError },
      { path: ":pathMatch(.*)*", component: NotFound },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
