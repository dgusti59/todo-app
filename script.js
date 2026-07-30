const STORAGE_KEY = "todo-app.todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const countEl = document.getElementById("todo-count");
const errorEl = document.getElementById("todo-error");
const emptyStateEl = document.getElementById("empty-state");

let todos = loadTodos();

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function addTodo(text) {
  todos.push({ id: createId(), text, completed: false });
  saveTodos();
  render();
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

function render() {
  list.innerHTML = "";
  emptyStateEl.hidden = todos.length !== 0;

  for (const todo of todos) {
    const li = document.createElement("li");
    li.className = `todo-item${todo.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.append(checkbox, label, deleteBtn);
    list.appendChild(li);
  }

  const remaining = todos.filter((t) => !t.completed).length;
  countEl.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    errorEl.textContent = "Type something before adding a task.";
    input.classList.add("invalid");
    input.focus();
    return;
  }
  errorEl.textContent = "";
  input.classList.remove("invalid");
  addTodo(text);
  input.value = "";
});

input.addEventListener("input", () => {
  if (errorEl.textContent) {
    errorEl.textContent = "";
    input.classList.remove("invalid");
  }
});

render();
