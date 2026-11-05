# Agent Instructions

## Project

UI (`@atom-forge/ui`) is a Svelte 5 component library for building admin interfaces and dashboards, styled with Tailwind CSS. The repository also hosts the live component showcase published at https://ui.atom-forge.eu.

How to use the library — choosing components, usage contracts, and reading routes into the documentation — is described in [`README-AI.md`](README-AI.md). Read it before changing a component's behavior or its documentation.

- Source: `src/lib/` — `controls/<category>/<component>/` (one folder per component with an `index.ts`), `core/` (`Root`, theme manager, `theme.css`), `helpers/`, `dev/` (staging area for new components, never exported), `index.ts` and `ui.ts` (root exports and the `UI` namespace). `dist/` is built with `svelte-package`.
- `src/routes/(site)` is the showcase site, deployed to https://ui.atom-forge.eu, and `/dev/*` holds development pages; neither is part of the npm package. `work/` holds plans, todos, and specs; it is not documentation.
- Use `bun`, not `npm` or `pnpm`. There is no test suite yet.
- Typecheck: `bun run check` · Package: `bun run package` (`bun run prepack` also runs `publint`) · Showcase check: `bun run check:showcase` · Showcase deploy: `bun run deploy`
- Release: commit everything first, then `bun run pub <patch|minor|major>` — it pushes the tag, waits for npm, and deploys the showcase. A release is complete only when https://ui.atom-forge.eu shows it; if `pub` stops before the deploy, fix the cause and run `bun run deploy`. Verify npm: `bun run pub-check`. Never run `npm publish` or `bun run release` directly.
- Documentation model: **reference-first**. The reference in `docs/` (`docs/controls/<category>/<component>.md` and `docs/guides/`) is the source of truth; the book (`book.md` in the repository root, chapters in `book/`) embeds it, and its reference chapter is generated with `bun run scripts/book-reference.ts`. The page template for components is `AGENTS/local/contribution/documentation.md`.

## Rules

Read the rule file that applies before you start, not only at the end:

- **Changing code, tests, or configuration** → read `AGENTS/devrules.md` first.
- **Creating or modifying components** → also read `AGENTS/local/ui-lib-dev.md` and `AGENTS/local/svelte-standards.md`, and update the component's showcase page in the same task; `AGENTS/local/contribution/` holds the detailed workflow, coding, styling, helper, and documentation standards (start at its `index.md`).
- **Changing the book, `docs/`, `README.md`, or `README-AI.md`** — including any change to the public API or its behavior, which always needs documentation → read `AGENTS/documentation.md` first.
- **Every task** ends with a `CHANGELOG.md` entry → follow `AGENTS/changelog.md`.

The three files directly in `AGENTS/` are shared by every AtomForge package and are identical in all of their repositories. Do not put package-specific rules in them — those belong in this file or, when they need more room, in `AGENTS/local/`. Change a shared file only when the change is meant for every package, and then apply the same change in all AtomForge package repositories.
