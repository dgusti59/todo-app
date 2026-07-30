const STORAGE_KEY = "todo-app.todos";
const THEME_KEY = "todo-app.theme";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const countEl = document.getElementById("todo-count");
const errorEl = document.getElementById("todo-error");
const emptyStateEl = document.getElementById("empty-state");
const searchInput = document.getElementById("search-input");
const filtersEl = document.getElementById("filters");
const themeToggle = document.getElementById("theme-toggle");
const exportBtn = document.getElementById("export-btn");
const importInput = document.getElementById("import-input");
const dataMessageEl = document.getElementById("data-message");

let todos = loadTodos();
let editingId = null;
let filter = "all";
let search = "";

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

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
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

function editTodo(id, text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.text = trimmed;
  saveTodos();
  render();
}

function exportTodos() {
  const blob = new Blob([JSON.stringify(todos, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const date = new Date().toISOString().slice(0, 10);
  const link = document.createElement("a");
  link.href = url;
  link.download = `todos-export-${date}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function isValidTodoArray(data) {
  return (
    Array.isArray(data) &&
    data.every(
      (t) =>
        t &&
        typeof t.id === "string" &&
        typeof t.text === "string" &&
        typeof t.completed === "boolean"
    )
  );
}

function importTodos(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!isValidTodoArray(data)) throw new Error("invalid shape");
      todos = data;
      saveTodos();
      render();
      dataMessageEl.textContent = `Imported ${data.length} task${data.length === 1 ? "" : "s"}.`;
    } catch {
      dataMessageEl.textContent = "That file isn't a valid todo export.";
    }
  };
  reader.readAsText(file);
}

function visibleTodos() {
  return todos
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));
}

function render() {
  list.innerHTML = "";
  const visible = visibleTodos();

  if (todos.length === 0) {
    emptyStateEl.textContent = "No tasks yet — add your first one above!";
    emptyStateEl.hidden = false;
  } else if (visible.length === 0) {
    emptyStateEl.textContent = "No tasks match your filters.";
    emptyStateEl.hidden = false;
  } else {
    emptyStateEl.hidden = true;
  }

  for (const todo of visible) {
    const li = document.createElement("li");
    li.className = `todo-item${todo.completed ? " completed" : ""}`;
    li.dataset.id = todo.id;
    li.tabIndex = 0;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    let labelEl;
    if (editingId === todo.id) {
      labelEl = document.createElement("input");
      labelEl.type = "text";
      labelEl.className = "edit-input";
      labelEl.value = todo.text;
      labelEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          editTodo(todo.id, labelEl.value);
          editingId = null;
        } else if (event.key === "Escape") {
          editingId = null;
          render();
        }
      });
      labelEl.addEventListener("blur", () => {
        if (editingId !== todo.id) return;
        editTodo(todo.id, labelEl.value);
        editingId = null;
      });
    } else {
      labelEl = document.createElement("span");
      labelEl.className = "label";
      labelEl.textContent = todo.text;
      labelEl.title = "Double-click to edit";
      labelEl.addEventListener("dblclick", () => {
        editingId = todo.id;
        render();
      });
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.append(checkbox, labelEl, deleteBtn);
    list.appendChild(li);

    if (editingId === todo.id) {
      labelEl.focus();
      labelEl.select();
    }
  }

  const remaining = todos.filter((t) => !t.completed).length;
  countEl.textContent = `${remaining} task${remaining === 1 ? "" : "s"} left`;
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

searchInput.addEventListener("input", () => {
  search = searchInput.value;
  render();
});

filtersEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  filter = button.dataset.filter;
  for (const btn of filtersEl.querySelectorAll("button")) {
    btn.classList.toggle("active", btn === button);
  }
  render();
});

themeToggle.addEventListener("click", () => {
  applyTheme(currentTheme() === "dark" ? "light" : "dark");
});

exportBtn.addEventListener("click", exportTodos);

importInput.addEventListener("change", () => {
  const file = importInput.files[0];
  if (file) importTodos(file);
  importInput.value = "";
});

list.addEventListener("keydown", (event) => {
  const li = event.target;
  if (!li.classList || !li.classList.contains("todo-item")) return;

  if (event.key === "Delete") {
    event.preventDefault();
    deleteTodo(li.dataset.id);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    const next = li.nextElementSibling;
    if (next) next.focus();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    const prev = li.previousElementSibling;
    if (prev) prev.focus();
  }
});

applyTheme(currentTheme());
render();
