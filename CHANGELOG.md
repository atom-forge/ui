# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-11-12

### Added
- Hungarian translation of the documentation in `docs/hu/`, mirroring `docs/en/` file by file; shipped in the package.
- `book/upgrading.md`, the migration chapter of the book, and a reading guide on the front page.
- `portal` action, exported from the package root: moves an element into the floating layer that `Root` renders above modals and drawers (or into a given selector or element, falling back to `document.body`), so your own dropdowns, toolbars and menus are not hidden behind an open modal. `Tooltip` uses it. Documented in the Overlays guide, with when to use `portal` and when the Popup manager.
- `TODO.md` for planned work (a numbered checkbox list, subtasks as indented checkboxes under their task; finished items are checked off, not removed) and a `notes/` folder for ideas, plans, and specs, with rules in `AGENTS.md`: neither is an instruction, and neither is shipped. The former `work/` folder moved there: plans and todos to `notes/`, specs and guides to `notes/specs/` and `notes/guides/`.

### Changed
- Releases use `@atom-forge/ship` 0.3.0 (a new dev dependency) instead of the own `scripts/pub.ts`, `pub-check.ts` and `changelog-release.ts`: `bun run pub` adds registry and tag preflight checks, runs `check`, `check:showcase` and `publint` before releasing, pushes the commit and tag atomically, then waits for npm and deploys the showcase through `ship.after`. The publish workflow validates that the tag, `package.json` and changelog agree instead of silently rewriting the version. The `release` script is removed; the main branch must be pushed before `bun run pub`.
- The prop types, type utilities, `variantMap`, `debounce`, `debounceAsync`, `as`, and `RenderSnippet` now come from the `@atom-forge/svelte-helpers` package (a new dependency) instead of local copies; `@atom-forge/ui` re-exports the whole package, so the same names are still available from it. The local copies were identical.
- **Breaking:** the shipped documentation moved from `docs/` to `docs/en/` (file names below it are unchanged). Links in `README.md`, `README-AI.md`, the book, and `scripts/book-reference.ts` follow the new paths. If your agent instructions or scripts point into `docs/guides/` or `docs/controls/` of the package, change them to `docs/en/...`; see the book's upgrading chapter.
- The book follows the shared AtomForge book rules: unnumbered chapter files (`overview.md`, `recipes.md`, `recipe-forms.md`, …, `reference.md`, `ai-notes.md`), `id: atom-forge-ui`, and the SvelteKit AI Notes page listed on the front page after the main AI Notes page.
- Development rules merged into `AGENTS/contribution/`: `AGENTS/ui-lib-dev.md` and `AGENTS/svelte-standards.md` are removed, the new-component workflow, showcase, and release rules moved to `AGENTS/contribution/workflow.md` and `AGENTS/devrules.md`. The contradiction about helpers is resolved: the prop types and utilities come from `@atom-forge/svelte-helpers`, and `src/lib/helpers/` holds only the library's own helpers. The rules now list all component categories, forbid importing the root barrel from inside the library, and describe how floating elements handle Escape.
- Modals and drawers no longer close on an Escape that an element inside already handled (`event.preventDefault()`), and they call `preventDefault()` only when they actually close. The built-in Escape handlers that close their own popup — DatePicker, TimePicker and the picker popovers, Select, MultiSelect, TagEditor, CommandPalette (`SelectPopup`), Zen, the Gantt rename field and the Block Editor YouTube URL field — now call `preventDefault()`. The popups listen on `document` in the capture phase instead of `window`, and Zen on `document` in the bubble phase, ignoring an Escape already handled. Escape on a dropdown or picker inside a modal, a drawer or Zen now closes only the dropdown or picker.

### Removed
- The unused `@atlaskit/pragmatic-drag-and-drop-hitbox` dependency, the stale `atom-forge-ui-0.0.30.tgz` from the repository root, and committed temp files under `var/tmp/` (`*.tgz` and `/var` are now git-ignored).
- The unused internal `DatePickerCalendar` and `TimePickerPopup` components (never exported).
- **Breaking:** `BlockEditor` (with `BlockView`, `BlockItem`, the `BlockEdit*`/`BlockView*` block components and `getBlockAPI`), `TableEditor`, `TablePreview`, `DiagramEditor`, `MarkdownEditor`, `ImgEditor` (and with it the `editors` category), `GanttChart`, and `ResourceManager`, with their documentation, showcase pages, and `UI` namespace entries. Rich text and block documents are covered by the separate `@atom-forge/brickee` package. The `sheetclip` and `turndown` dependencies are gone with them. The last state with these controls is kept in the `archive/complex-controls` git tag. See the book's upgrading chapter.
- The staging editors in `src/lib/dev/` (`block-editor`, `block-editor-2`, `editorjs-editor`), the `/editor` and `/editorjs` development routes, and the Block Editor 2 plans and specs in `notes/`.

### Fixed
- The Modal and Drawer showcase pages list `closeTopmostIfClosable()` as returning `boolean` (whether it closed an overlay). The showcase API inventories are re-audited against 0.0.39 (no prop changes since 0.0.37), and `scripts/showcase/audit.mjs` no longer warns about a stale inventory. The audit now covers all 69 showcase pages, not only data and overlays, and lists every undocumented prop at once; the missing ones were added: `children` of ProsePage, ProseParagraph, ProseText, ProseTitle, ProseMarkdown and CheckboxGroupManager, `class` of CodeInput, and `oninput` of Input.
- Pages that imported from the library's root module could fail to hydrate with `Cannot access 'Popup' before initialization`: the popup manager, `ContextMenu`, `Input`, `FlipCard`, and the tree and context menu types imported from the root barrel and created a circular import. They now import from the modules they need.
- A stray `igen` after `</Card>` in a Color System guide code example.

---

## [0.0.39] - 2026-11-05

### Fixed

- `Field` now connects its hint or error text to the bound control with `aria-describedby`, and sets `aria-invalid="true"` on it while an error is shown (not on button-like triggers such as `Select`, `MultiSelect` and the date/time pickers, where `aria-invalid` is not valid). An `aria-describedby` passed to `Input` is kept and extended. `field.useFieldControl()` exposes the new `describedBy` and `invalid` values for custom controls.

---

## [0.0.38] - 2026-11-05

### Added

- Live component showcase application in `src/routes/(site)` (every control under `/ui/<category>/<control>/`, the former `ui-pro` controls in the `content`, `editors`, `scheduling` and `overlays` categories, and the CRM, Inbox and Intranet showcase applications), moved here from the atom-forge.eu website. It resolves `@atom-forge/ui` to the local source through `kit.alias`, so the examples always run against the current code. The site shell lives in `src/site`; none of it is part of the published package.
- `scripts/showcase/migration-check.mjs` and `scripts/showcase/audit.mjs` (run both with `bun run check:showcase`), moved from the website. They compile the showcase pages, validate the embedded code strings and public imports, compare page API inventories with the packaged components and render the pages on the server. The inventories were last audited against 0.0.34 and the audit prints a warning until they are reviewed for the current version.
- BookMD learning guide (`book.md` entry at the repository root, chapters in `book/`) that embeds sections of the `docs/` reference with `![[...]]` instead of duplicating them, including a reference chapter with every control page (ordered from general to specialised controls), generated by `bun run scripts/book-reference.ts`.

### Changed

- Agent instructions follow the AtomForge structure: `AGENTS.md` holds a short project description, a pointer to `README-AI.md`, the documentation model, and when to read which rule file. `AGENTS/devrules.md` holds this package's own development rules, source layout, and commands; `AGENTS/changelog.md` and `AGENTS/documentation.md` are shared and identical in every AtomForge package (`documentation.md` covers the book-first and reference-first documentation models, BookMD authoring with a link to the canonical BookMD LLM reference, the upgrading chapter, and `README-AI.md` versus AI Notes). The library's own standards (`ui-lib-dev.md`, `svelte-standards.md`, `contribution/`) are in `AGENTS/`, referenced from `devrules.md`.
- The contribution guides moved from `docs/contribution/` to `AGENTS/contribution/`, so they are no longer shipped in the npm package; `README.md` points developers to `AGENTS.md` and links the book and the live showcase.
- `bun run pub` now refuses to release with uncommitted changes and, after pushing the tag, waits until the new version is on npm and deploys the showcase (`bun run deploy`), so every release updates https://ui.atom-forge.eu.
- Project rules require the showcase site (https://ui.atom-forge.eu) to follow every component change in the same task (`bun run check:showcase`), and make deploying it (`bun run deploy`) part of every release.
- Documentation rules no longer forbid Hungarian: the reference is written in English and may get a Hungarian translation; labels and UI text stay English. The project rules now describe the showcase site and `/dev/*` pages in `src/routes` instead of calling the repository a pure library.
- The development demo pages moved from `/ui/*` to `/dev/*` so that `/ui/*` belongs to the showcase.
- The SvelteKit app now builds a static site (`@sveltejs/adapter-static` replaces `@sveltejs/adapter-node`).
- `book.md` links to the showcase at ui.atom-forge.eu.
- Showcase data and overlay pages re-audited against 0.0.37 (no API changes since 0.0.34): version-pinned limitation notes are now version-neutral, the outdated comparisons with the reference guides (Heatmap defaults, `AtomForge` provider name) were removed, and `scripts/showcase/audit.mjs` no longer warns about a stale inventory.

### Removed

- The SOP and journal workflow (`work/contribution/overview.md`, `work/contribution/sop/`, `work/journal/`) and the `CLAUDE.md` / `GEMINI.md` redirect files.

### Fixed

- `Field` now binds its label to the control inside it (accessibility): it generates an ID that the first nested form control (`Input`, `Textarea`, `NativeSelect`, `Select`, `MultiSelect`, `DatePicker`, `DateTimePicker`, `TimePicker`, `ColorPicker`, `TagEditor`, `Switch`) applies to its focusable element, with `aria-labelledby` on button-like triggers. Screen readers announce the field name and tests can use `getByLabelText`. An explicit `for` still takes precedence. Custom controls can opt in with `field.useFieldControl()`.
- `NativeSelect` no longer lists its placeholder (`'Select an option'` by default) as a selectable entry in the native dropdown; the empty-state option is now rendered `hidden`.

---

## [0.0.37] - 2026-10-07

---

## [0.0.36] - 2026-10-07

---

## [0.0.35] - 2026-10-06

---

## [0.0.34] - 2026-09-04

---

## [0.0.33] - 2026-09-04

---

## [0.0.32] - 2026-09-02

---

## [0.0.31] - 2026-08-14

---

## [0.0.30] - 2026-06-01

- Initial changelog entry

---
