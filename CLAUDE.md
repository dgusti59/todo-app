# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack constraints (hard rules)

This is a plain HTML/CSS/JavaScript todo app. These constraints are intentional and must not be relaxed without the user explicitly asking:

- **No framework** (no React, no Vue, no jQuery, etc.) — vanilla DOM APIs only.
- **No build step** — no bundler, no transpiler, no npm dependencies. The three files (`index.html`, `style.css`, `script.js`) must run by opening `index.html` directly or serving the folder as-is.
- **No backend, no database** — all state lives in the browser.
- **All data in `localStorage`**, unencrypted. There is no server, so there is nothing to secure server-side; don't add auth, API calls, or remote storage.
- **Deployed to GitHub Pages** as a static site, served directly from `main` (no GitHub Actions build).

`package.json` exists only to hold a semver `version` field for tracking releases — it declares no dependencies and has no scripts. Do not add tooling that requires `npm install`.

## Running locally

There is no dev server or build command. Either:
- Open `index.html` directly in a browser, or
- Serve the folder with any static file server (e.g. `python3 -m http.server`) if you need `fetch`/module semantics that behave better over `http://` than `file://`.

There is no test suite, linter, or build command — verify changes by exercising the app in a browser (add/toggle/edit/delete, reload to confirm persistence, resize between ~375px and ~1280px).

## Architecture

Three files, no modules:

- **`index.html`** — structure only: the add-task form, search/filter controls, the `<ul id="todo-list">` mount point, empty-state message, counter, and import/export controls. A small inline `<script>` in `<head>` reads the saved theme from `localStorage` and sets `data-theme` on `<html>` before first paint, to avoid a flash of the wrong theme.
- **`style.css`** — all colors are CSS custom properties defined on `:root` (light) and overridden under `[data-theme="dark"]`. Add new colors as variables in both blocks rather than hardcoding hex values in component rules.
- **`script.js`** — a single file, top to bottom: DOM element lookups, in-memory state (`todos`, `editingId`, `filter`, `search`), pure-ish helper functions (`loadTodos`/`saveTodos`, `addTodo`/`toggleTodo`/`deleteTodo`/`editTodo`, `exportTodos`/`importTodos`), a `render()` that fully re-renders `#todo-list` from `visibleTodos()` on every state change, and event listener wiring at the bottom. There's no framework reactivity — every mutation function ends by calling `saveTodos()` then `render()`.

State model: `todos` is an array of `{ id, text, completed }` persisted as JSON under the `todo-app.todos` localStorage key. Theme preference is a separate `todo-app.theme` key (`"light"` or `"dark"`). Import replaces the in-memory list wholesale after validating the shape of every item; export downloads the current list as a dated `.json` file via a `Blob` + object URL.

Rendering is delegated/event-driven rather than using individual per-item listeners stored elsewhere: `render()` rebuilds `#todo-list`'s children from scratch each time, attaching fresh listeners per item (checkbox toggle, dblclick-to-edit, delete). Keyboard navigation (arrow keys, Delete) is handled by a single delegated `keydown` listener on the list container that checks `event.target` rather than listening per-item.

## Git workflow

- `main` holds the deployable state (what GitHub Pages serves). Feature work happens on branches (e.g. `feature/todo-app-mvp`), merged via reviewed pull requests — don't commit feature work directly to `main`.
- Commit messages must be specific about what changed and why, never generic ("update", "fix stuff").
- Before merging, get an independent review from a reviewer with no prior context on the change (a fresh session/agent, not the one that wrote the diff).
