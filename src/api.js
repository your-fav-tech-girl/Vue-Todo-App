const TODOS_KEY = "todos";

// Load todos from localStorage
export function loadTodos() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(TODOS_KEY);
  return data ? JSON.parse(data) : [];
}

// Save todos to localStorage
export function saveTodos(todos) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export async function fetchTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  return res.json();
}
