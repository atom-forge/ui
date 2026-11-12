# Contribution Guide

Welcome to the **atom-forge** UI library contribution guide. This documentation is split into focused pillars to help you build consistent, high-quality Svelte 5 components.

---

## 1. [Workflow](./workflow.md)
The "operations manual" for the library.
- **Key topics**: Project structure, categorization, atomic components, the new-component workflow, the showcase, and the **mandatory component reuse** rule.
- **Goal**: Understand where to put files and how the development lifecycle works.

## 2. [Coding Standards](./coding-standards.md)
Technical coding guidelines and best practices.
- **Key topics**: Scoped exports, relative imports, mandatory use of runes ($state, $derived), snippets vs slots, event handling, and Escape in floating elements.
- **Goal**: Ensure the codebase is consistent, type-safe, and follows Svelte 5 best practices.

## 3. [Styling & Color System](./styling.md)
Visual consistency and Tailwind CSS standards.
- **Key topics**: `twMerge` usage, the semantic color system (tokens vs hardcoding), and size naming conventions (`normal`, `compact`, `small`).
- **Goal**: Maintain visual integrity and perfect Dark/Light mode support.

## 4. [Library Helpers & Utilities](./helpers.md)
Documentation for the shared internal toolbox.
- **Key topics**: Common types (`ClassProp`, `AnyProp`), utility functions (`variantMap`, `debounce`, `as`), and `RenderSnippet` from `@atom-forge/svelte-helpers`; actions (`portal`, `dnd`) and `Spinner` from `src/lib/helpers/`.
- **Goal**: Reuse internal helpers instead of reinventing common patterns.

## 5. [Documentation Guide](./documentation.md)
Standards, structure, and rules for creating and maintaining component documentation.

---

## Quick Rules

- **Library first**: The published package contains only the library and its documentation; the showcase site (deployed to https://ui.atom-forge.eu) and the development pages in `src/routes` are not part of the package.
- **Documentation**: When modifying a control, **ALWAYS** update its page in `docs/en/` and its translation in `docs/hu/`.
- **Language**: code and the reference are written in English; `docs/hu/` is the Hungarian translation.
- **Bun**: Use `bun` for development.
