# todo-app: end-of-project report

First commit 2026-07-28 – last commit 2026-07-30 · 3 calendar days (2 with commits) · generated 2026-10-19

## At a glance

| Measure | Value |
|---|---|
| Commits on `origin/main` | 14 |
| Pull requests merged | 1 (PR #1, merged 2026-07-30) |
| Hours | not recorded (no progress ledger) |
| Cost | not recorded (no progress ledger) |
| Tasks done / open / dropped | not recorded (no progress ledger; the project has no PLAN.md) |
| Progress line | not recorded (NEXT.md has no `Progress:` line) |
| Launch gate | NEXT.md has no launch gate line. It records the site as live at https://dgusti59.github.io/todo-app/ (as recorded in NEXT.md, updated 2026-09-21; not re-checked for this report) |

The project is a three-file vanilla HTML, CSS and JavaScript todo app (`index.html` 73 lines, `style.css` 294, `script.js` 302) that keeps its data in `localStorage` and is served from `main` by GitHub Pages. NEXT.md, updated 2026-09-21, calls it a "Finished, deployed vanilla-JS MVP", with two blockers that only the owner can clear.

## Progress

<!-- chart:progress -->

| Date | Done/total | % | Commits | PRs | Sessions | Hours | Reopened |
|---|---|---|---|---|---|---|---|
| 2026-07-28 | not recorded | not recorded | 1 | 0 | — | — | not recorded |
| 2026-07-30 | not recorded | not recorded | 13 | 1 | — | — | not recorded |

There is no progress ledger, so task counts, sessions, hours and reopen events per day are not recorded. Any 0 or null the generated data shows for reopened means there are no ledger rows, not that zero reopens were seen. The commit and PR figures come from git and `gh`.

## Why it took the time it did

The build itself was short. The record shows a stub first commit on 2026-07-28 (`README.md`, 11 bytes) and the whole app on 2026-07-30: `git log --date=iso` dates the 13 commits that day from 14:50:43 to 15:38:11 (+0200), ending in the merge of PR #1. What remains open is about the time after that, not the build.

- **Scope growth:** not recorded (no progress ledger). There was no plan of record at the start or later. NEXT.md: "Plan of record: `—` (none exists)".
- **Rework:** reopen events, criterion timeouts and refused writes are not recorded (no progress ledger). The git history does show one review cycle. NEXT.md ties two fix commits on 2026-07-30 to the independent review of PR #1 ("Inline-edit save race fixed after independent review — commits `d5e3ea5`, `2cc4a90`"):
  - `d5e3ea5` fixed an inline-edit save race. The Enter and blur paths re-rendered while `editingId` was still set, and a full re-render during a click replaced the DOM node the click was aimed at. The same commit added accessible names, `<label>`s, `aria-pressed`, import error handling and a colour variable.
  - `2cc4a90` covered the case that fix missed: an edit that moves the row outside the active filter or search now falls back to a full render.
  - NEXT.md: "The blur-commit path in `script.js:185-207` is subtle and already cost one review cycle."
- **Waits on the owner:** after the merge on 2026-07-30, nothing was committed. NEXT.md (2026-09-21) records an uncommitted edit dated 2026-08-17 by file time. It added `dev` and `start` scripts to `package.json` and created a `package-lock.json`, which goes against the CLAUDE.md rule that `package.json` "declares no dependencies and has no scripts". Two blockers have waited on the owner since that NEXT.md was written: which of the two is authoritative, and whether any next unit of work exists. NEXT.md says whether the 2026-08-17 edit was deliberate is "unknown — not verified". There is no HISTORY.md, so the reason for the gap between 2026-07-30 and 2026-08-17, and the gap after that, is not recorded.

## Direction

There is no PLAN.md. The goal comes from the project's CLAUDE.md: "This is a plain HTML/CSS/JavaScript todo app. These constraints are intentional and must not be relaxed without the user explicitly asking": no framework, no build step, no backend, all data in `localStorage`, deployed to GitHub Pages from `main`. The project memory states the purpose: "the whole point of the project is to exercise core CRUD + persistence features without any tooling overhead."

- 2026-07-30 — CLAUDE.md added (`91eac41`) — to record "the no-framework/no-build/no-backend/localStorage-only rules and the branch-then-PR git workflow this project was actually built under, so future sessions don't drift from them" (commit message).
- 2026-07-30 — the blur-commit edit path changed from a full `render()` to patching only its own row (`d5e3ea5`), then gained a fallback to a full render when the edited row leaves the active filter (`2cc4a90`) — `d5e3ea5`'s message says it addresses review feedback; NEXT.md ties both commits to the independent review before merge ("Inline-edit save race fixed after independent review — commits `d5e3ea5`, `2cc4a90`").
- 2026-08-17 (file time, from NEXT.md) — `package.json` gained `dev` and `start` scripts, both `python3 -m http.server 3004`, and a `package-lock.json` appeared. Neither file was committed. This contradicts the CLAUDE.md stack rule, and the record does not say why it was done.
- 2026-09-21 — the project was brought under NEXT.md status tracking: NEXT.md written ("Updated: 2026-09-21") and a "Session status" section added to CLAUDE.md (file time 2026-09-21 21:42). Both changes are uncommitted. `git status` on 2026-10-19 shows ` M CLAUDE.md`, ` M package.json`, `?? NEXT.md` and `?? package-lock.json`.

## What shipped

There are no initiatives (no PLAN.md). By NEXT.md workstream:

- **MVP feature set** — add, toggle, delete, inline edit, filters and search with a counter, persisted light and dark theme, JSON import and export, keyboard navigation, responsive layout. Evidence: PR #1 "Add plain HTML/CSS/JS todo app with localStorage persistence", merged 2026-07-30 as `7941280`.
- **Deploy** — GitHub Pages, legacy build from `main` `/`. Evidence: as recorded in NEXT.md, updated 2026-09-21, the live URL returned 200 and the deployed commit `7941280` matched `HEAD`, from `gh api repos/dgusti59/todo-app/pages`. Not re-checked for this report.
- **Project rules** — CLAUDE.md with the stack constraints and the git workflow. Evidence: `91eac41`, 2026-07-30.

## Still open

From NEXT.md (2026-09-21), plus the current `git status`:

- **Blocker 1: uncommitted `package.json` scripts and `package-lock.json` versus the CLAUDE.md rule** — `awaiting: user`. Diego chooses (a) keep both files and amend the rule, or (b) revert with `git checkout package.json && rm package-lock.json`. Claude carries out the choice.
- **Blocker 2: no defined next unit of work** — `awaiting: user`. Diego names the next unit, or declares the project done.
- **README.md is an 11-byte stub** (Roadmap unit 4, "not started") — who acts is not recorded in NEXT.md.
- **Uncommitted status tracking** — the CLAUDE.md "Session status" section and the untracked NEXT.md are not on `main`. NEXT.md does not list this as a blocker. It needs a branch and a PR under the project's git workflow, once Diego decides to keep them.

## Sources

- `node ~/.claude/skills/end/scripts/report-data.mjs <project>` run 2026-10-19: span, commit totals, commits and PRs per day, the PR list (through `gh`), and the errors "no PLAN.md" and "no docs/ledger/progress.tsv".
- `git log --all --date=iso`: commit times on 2026-07-30. `git log` message bodies of `91eac41`, `d5e3ea5` and `2cc4a90`. `git show --stat 7941280`.
- `git status --short` and `git diff` (2026-10-19): the uncommitted `CLAUDE.md` and `package.json` changes, the untracked `NEXT.md` and `package-lock.json`. `stat` file times and `wc -l` line counts.
- Project files: `CLAUDE.md`, `NEXT.md` (Updated 2026-09-21), `README.md`, `package.json`.
- Project memory file `project_todo-app-stack.md`.
- Not present: `PLAN.md`, `HISTORY.md`, `docs/ledger/progress.tsv`.
