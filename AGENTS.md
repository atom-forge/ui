# Agent Instructions

UI (`@atom-forge/ui`) is a Svelte 5 component library for building admin interfaces and dashboards, styled with Tailwind CSS. The repository also hosts the live component showcase published at https://ui.atom-forge.eu.

How to use the library — choosing components, usage contracts, and reading routes into the documentation — is described in [`README-AI.md`](README-AI.md). Read it before changing a component's behavior or its documentation.

Documentation model: **reference-first** (see `AGENTS/devrules.md` for the documentation layout).

## Rules

Read the rule file that applies before you start, not only at the end:

- **Changing code, tests, or configuration** → read `AGENTS/devrules.md` first: this package's development rules, source layout, and commands.
- **Changing the book, `docs/`, `README.md`, or `README-AI.md`** — including any change to the public API or its behavior, which always needs documentation → read `AGENTS/documentation.md` first.
- **Every task** ends with a `CHANGELOG.md` entry → follow `AGENTS/changelog.md`.

`AGENTS/changelog.md` and `AGENTS/documentation.md` are shared by every AtomForge package and are identical in all of their repositories: change them only when the change is meant for every package, and then in all AtomForge package repositories at once. Everything else in `AGENTS/` — `devrules.md` and the files it refers to — belongs to this package alone.

## Todos and notes

- `TODO.md` lists planned work, most important first, as a numbered checkbox list (`1. [ ]`), one or two lines per item. Subtasks are unnumbered checkbox items (`- [ ]`) indented under their task; renumber the tasks when one is added or removed. Longer context lives in `notes/`, and the item links to it.
- `notes/` holds ideas, plans, specs, and research in any form and language.
- Neither is an instruction: work on an item only when asked. Do not remove finished items: check them off (`[x]`) as you go, each subtask as soon as it is done and the task when its last subtask is, and update or delete the notes they made obsolete. When you notice work outside the current task, add it to `TODO.md` and mention it in your report.
- Neither is shipped in the npm package.
