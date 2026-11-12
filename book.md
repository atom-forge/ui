---
title: UI
subtitle: "@atom-forge/ui"
author: AtomForge
language: en
id: atom-forge-ui
intro: A practical learning path for building applications with @atom-forge/ui.
children:
  - "[[book/overview.md]]"
  - "[[book/setup.md]]"
  - "[[book/mental-models.md]]"
  - "[[book/choosing-controls.md]]"
  - "[[book/recipes.md]]"
  - "[[book/pitfalls.md]]"
  - "[[book/reference.md]]"
  - "[[book/upgrading.md]]"
  - "[AI Notes](book/ai-notes.md)"
  - "[AI Notes: SvelteKit](book/ai-notes-sveltekit.md)"
---

# AtomForge UI guide

> [!tip] Live examples
> Browse the components running live at [ui.atom-forge.eu](https://ui.atom-forge.eu/).

This book explains **how to think about** `@atom-forge/ui`: what the library is, how its pieces fit together, and where the usual mistakes are. It is a reading path, not a reference.

The reference lives in `docs/en/` (Hungarian translation in `docs/hu/`) and is embedded into the chapters instead of being copied, so each topic has one source. Useful entry points:

- [Component Overview](https://github.com/atom-forge/ui/blob/main/docs/en/guides/component-overview.md) — capability map and category index
- [Control documentation](https://github.com/atom-forge/ui/blob/main/docs/en/guides/component-overview.md#category-index) — props, behavior, and limitations per control
- [Composition guides](https://github.com/atom-forge/ui/blob/main/docs/en/guides/forms.md) — forms, overlays, data display, sortable lists

> [!note] Book and reference
> When this book and a control's documentation disagree, the control documentation wins. Open an issue or fix the book.

## Reading guide

- New to the library: read [[book/overview]], [[book/setup]] and [[book/mental-models]] in order.
- Building a screen: pick controls with [[book/choosing-controls]], then follow the [[book/recipes]] for forms, overlays, data display and sortable lists.
- Something behaves unexpectedly: check [[book/pitfalls]].
- Looking up a control: the [[book/reference]] chapter holds every control page.
- Moving to a newer version: [[book/upgrading]] lists the changes that need action.
- Working with a coding agent: copy the instructions from [[book/ai-notes]] and [[book/ai-notes-sveltekit]] into your project.
