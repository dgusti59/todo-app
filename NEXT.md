# NEXT — todo-app status

**Updated:** 2026-09-21 · **Plan of record:** `—` (none exists) · **Live:** https://dgusti59.github.io/todo-app/

## Current position
Finished, deployed vanilla-JS MVP — not a scaffold and not abandoned mid-build. All 14 commits landed 2026-07-28/30; the feature set in `script.js` (302 lines) is complete and live.
Stale: last commit 2026-07-30, 53 days ago as of 2026-09-21 — nearly two months untouched. Last local file edit was 2026-08-17 (mtime) and was never committed.
One loose end blocks a clean tree: uncommitted `package.json` scripts + untracked `package-lock.json` that contradict a hard rule in `CLAUDE.md`.
No roadmap, plan, or open issue defines what comes next.

## Last session — 2026-08-17
No commits were made. Working-tree evidence (file mtimes 2026-08-17 15:19 and 20:59) shows `package.json` was edited to add `dev` and `start` scripts (both `python3 -m http.server 3004`) and an empty `package-lock.json` was generated — meaning `npm install` was run in a project whose `CLAUDE.md` explicitly forbids it. Neither file was committed or reverted, so the tree has sat dirty since. The last committed work was 2026-07-30: PR #1 (`feature/todo-app-mvp`) merged to `main` as `7941280`, ending with two review-driven fixes to the inline-edit blur path. Next is a decision on that uncommitted change — see Blockers.

## Workstreams

### MVP feature set — complete
- [x] Add / toggle / delete tasks — `addTodo`/`toggleTodo`/`deleteTodo` in `script.js`
- [x] Blank-submit rejection + empty-state message — `script.js:147-155`, `232-238`
- [x] Inline edit via dblclick, Enter saves / Esc cancels — `script.js:170-210`
- [x] Active/completed filters, text search, remaining-task counter — `visibleTodos()`, `script.js:121-129`
- [x] Light/dark theme toggle, persisted, no flash-of-wrong-theme — inline `<script>` in `index.html:8-15`; `:root` + `[data-theme="dark"]` at `style.css:1,14`
- [x] JSON import/export with shape validation — `exportTodos`/`isValidTodoArray`/`importTodos`, `script.js:77-119`
- [x] Keyboard nav (↑/↓/Delete) via one delegated listener — `script.js:281-299`
- [x] Responsive layout, mobile breakpoint — `@media (max-width: 420px)`, `style.css:281`
- [x] Inline-edit save race fixed after independent review — commits `d5e3ea5`, `2cc4a90`

### Deploy — complete
- [x] GitHub Pages enabled, `build_type: legacy`, source `main` `/` — `gh api repos/dgusti59/todo-app/pages`
- [x] Live URL returns **200** — https://dgusti59.github.io/todo-app/
- [x] Deployed commit `7941280` equals local `HEAD`; built 2026-07-30T13:39:28Z, status `built`
- [x] `main` in sync with `origin/main` (0 ahead, 0 behind)

### Repo hygiene — in progress
- [x] `.gitignore` covers OS junk, editors, `.env*`, `node_modules/`, logs
- [x] PR #1 merged; no open issues on the repo
- [ ] Resolve the uncommitted `package.json` / `package-lock.json` change — **blocked**, see below
- [ ] `README.md` is an 11-byte stub (`# todo-app` only) — all real documentation lives in `CLAUDE.md`; the public repo landing page says nothing

## Blockers / awaiting you
1. **Uncommitted `package.json` scripts contradict a `CLAUDE.md` hard rule** `domain: architecture` `awaiting: user`
   `CLAUDE.md` states `package.json` "declares no dependencies and has no scripts. Do not add tooling that requires `npm install`." The working tree adds `dev`/`start` scripts and an untracked `package-lock.json`. The tree cannot be cleaned without choosing which is authoritative. The user decides one of:
   (a) **Keep** — commit both files, amend that `CLAUDE.md` rule to permit script-only `package.json` entries, and decide whether `package-lock.json` is committed or added to `.gitignore`; or
   (b) **Revert** — `git checkout package.json && rm package-lock.json`, restoring the documented state.
   Whether this edit was deliberate is `unknown — not verified`; only the user knows. Claude performs the chosen action once they answer.
2. **No defined next unit of work** `domain: —` `awaiting: user`
   The MVP is shipped and there is no roadmap file, plan of record, or open issue naming a next feature. Direction is `unknown — not verified`. The user names the next unit, or the project is declared done and left as-is.

## Notes carried forward
- **Hard constraints are deliberate** (`CLAUDE.md`): no framework, no build step, no npm dependencies, no backend. Three files must run by opening `index.html` directly. Don't "modernize" this.
- **The blur-commit path in `script.js:185-207` is subtle and already cost one review cycle.** A full `render()` on blur replaces every row's DOM node mid-click, which silently drops a click that started as mousedown on another row's control. It patches the single row instead, and only falls back to full `render()` when the edit pushes the row outside the active filter/search. Preserve this if touching edit logic.
- **Pages is `build_type: legacy`** — served straight from `main` with no GitHub Actions workflow. Pushing to `main` deploys. There is no `.github/` directory and no `CNAME`.
- **No test suite, linter, or build command exists** — by design. Verification is manual in a browser: add/toggle/edit/delete, reload to confirm persistence, resize ~375px–1280px. Whether that pass was done for the 2026-08-17 change is `unknown — not verified`.
- **localStorage keys**: `todo-app.todos` (array of `{id, text, completed}`) and `todo-app.theme` (`"light"`/`"dark"`).
- **Git workflow**: feature branches merged via reviewed PR; never commit feature work directly to `main`. Reviewer must be a fresh session with no context on the diff.

## Verify with
Not executed in this session — recorded for the next one.
- `git -C /Users/Christina/Documents/Claude-Projects/Apps/todo-app status --short` — currently reports ` M package.json` and `?? package-lock.json`; should be empty once Blocker 1 is resolved
- `git -C /Users/Christina/Documents/Claude-Projects/Apps/todo-app log -1 --date=short --pretty='%h %ad %s'` — expect `7941280 2026-07-30 Merge pull request #1 …` until new work lands
- `python3 -m http.server 3004` from the project root, then open http://localhost:3004 (equivalently `npm run dev`, but only if Blocker 1 resolves toward keeping the scripts)
- `curl -s -o /dev/null -w "%{http_code}" https://dgusti59.github.io/todo-app/` — must return `200`
- `gh api repos/dgusti59/todo-app/pages/builds/latest --jq .commit` — must equal `git rev-parse HEAD` for the live site to match local
- https://dgusti59.github.io/todo-app/ must return 200

## Roadmap
| Unit | Scope | State |
|---|---|---|
| 1 | MVP: add/toggle/delete, edit, filter/search, theme, import/export, keyboard nav | complete |
| 2 | GitHub Pages deploy from `main` | complete |
| 3 | Resolve uncommitted `package.json` / `package-lock.json` vs `CLAUDE.md` rule | blocked — `awaiting: user` |
| 4 | Replace the stub `README.md` with real usage/deploy notes | not started |
| 5 | Anything beyond unit 4 | `unknown — not verified`; no roadmap defined |

## History
Older sessions → `HISTORY.md` (not auto-read).
