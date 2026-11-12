# Contribution Workflow & Standards

This guide outlines the project-wide standards and the development lifecycle for the **atom-forge** UI library.

---

## Rules

- **Library first**: The published package contains only the library (`src/lib`) and its documentation. The showcase site (`src/routes/(site)`) and the development pages (`/dev/*`) live in `src/routes`; they are never exported from `src/lib/index.ts` and are not part of the package.
- **Component Reuse**: **ALWAYS** reuse existing components within the library. If a control exists (e.g., `Checkbox`), use it instead of native elements or creating a new implementation. This is one of the most critical rules to ensure consistency and maintainability. Refer to the [Component Overview](../../docs/en/guides/component-overview.md) for a categorized list of available controls.
- **Grouping**: Components must be placed in their category folder: `content`, `data`, `display`, `forms`, `general`, `layout`, `overlays`, or `scheduling`.
- **Atomic Components**: Each component has its own folder with an `index.ts` for clean exports.
- **Documentation**: When modifying a control, **ALWAYS** update its page in `docs/en/controls/[category]/` and the Hungarian translation in `docs/hu/`. Refer to the [Documentation Guide](./documentation.md) for standards and structure.
- **Showcase**: The showcase site (`src/routes/(site)`, published at https://ui.atom-forge.eu) must always represent the current state of the library. When adding a component, or changing a component's API or behavior, update its showcase page under `src/routes/(site)/ui/<category>/<component>/` — examples and API inventory — in the same task, and run `bun run check:showcase`. When the audit warns that the inventories were reviewed against an older version, review them for the current version.
- **Planned work**: tracked in `TODO.md`, with longer plans and specs in `notes/` (see the root `AGENTS.md`).
- **Scripts**: Place all automation and helper scripts in the `scripts/` directory.
- **Language**: Write code, comments, and the reference documentation in English. Labels, descriptions, and UI text in components are always English.
- **Bun**: Use `bun` for development (not `npm` or `pnpm`).

---

## New Component Workflow

New components are always developed in a staging area before being placed in their final location.

1. **Develop in `src/lib/dev/`** — create the component and its documentation here during active development.
2. **Iterate freely** — `src/lib/dev/` is a sandbox; structure and naming can change.
3. **Move when done** — once the component is complete, move it to the correct `src/lib/controls/[category]/` folder and its page to `docs/en/controls/[category]/` (then translate it to `docs/hu/controls/[category]/`).
4. **Then export** — add the component to `src/lib/index.ts` (and the `UI` namespace in `src/lib/ui.ts`) only after it has left `src/lib/dev/`.
5. **Showcase** — add its page under `src/routes/(site)/ui/<category>/<component>/`.

`src/lib/dev/` is never exported and never published in the package.

---

## Project layout

```
docs/en/controls/[category]/*.md  # component reference (source of truth)
docs/en/guides/                   # composition guides
docs/hu/                          # Hungarian translation of docs/en/
src/lib/controls/[category]/      # component source (atomic folders)
src/lib/dev/                      # staging area for new components (not exported)
src/lib/core/                     # central library logic (Root, theme-manager, theme.css)
src/lib/helpers/                  # library-own helpers: Spinner, SelectPopup, portal, dnd (prop types and utilities come from @atom-forge/svelte-helpers)
src/lib/index.ts                  # main entry point (re-exports)
src/lib/ui.ts                     # the UI namespace
src/routes/(site)/                # showcase site (not in the package)
src/routes/dev/                   # development pages (not in the package)
scripts/                          # automation and helper scripts
```
