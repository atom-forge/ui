# Development rules

Development rules of this package. Unlike `AGENTS/changelog.md` and `AGENTS/documentation.md`, this file is not shared with other AtomForge packages.

## General

- Keep changes focused and consistent with the existing code style. Edit the sources, never generated output.
- Preserve the public API and its behavior unless a breaking change is explicitly requested. A change that may require action from users is breaking: follow `AGENTS/changelog.md` and the *Upgrading chapter* rules in `AGENTS/documentation.md`.
- A change to the public API or its behavior is also a documentation change: update the documentation in the same task, following `AGENTS/documentation.md`.
- Before finishing, run the checks listed below and report what passed or failed.
- Only commit, push, or publish when asked.

## Project

- Source: `src/lib/` — `controls/<category>/<component>/` (one folder per component with an `index.ts`), `core/` (`Root`, theme manager, `theme.css`), `helpers/`, `dev/` (staging area for new components, never exported), `index.ts` and `ui.ts` (root exports and the `UI` namespace). `dist/` is built with `svelte-package`.
- `src/routes/(site)` is the showcase site, deployed to https://ui.atom-forge.eu, and `/dev/*` holds development pages; neither is part of the npm package. `TODO.md` and `notes/` hold planned work, plans, and specs; they are not documentation.
- Use `bun`, not `npm` or `pnpm`. There is no test suite yet.
- Typecheck: `bun run check` · Package: `bun run package` (`bun run prepack` also runs `publint`) · Showcase check: `bun run check:showcase` · Showcase deploy: `bun run deploy`
- Release (with `@atom-forge/ship`): commit and push everything first, then `bun run pub <patch|minor|major|x.y.z>` (`--dry-run` shows the plan). Ship checks that the tree is clean and `main` matches the remote, that the version and tag are free locally, on the remote and on npm, runs `ship.verify` (`check`, `check:showcase`, `publint`), stamps `CHANGELOG.md`, bumps `package.json`, creates the release commit and the `v*` tag, and pushes both atomically. The tag triggers `.github/workflows/publish.yml` (`ship-it validate`, then publish to npm). Then `ship.after` waits for npm (`ship-it check --wait 900`) and deploys the showcase (`bun run deploy`). A release is complete only when https://ui.atom-forge.eu shows it; if an after-release command fails, fix the cause and run it and the remaining ones by hand — never run `pub` again, it would release the next version. Verify npm: `bun run pub-check`. Never run `npm publish` directly.
- Documentation: The reference in `docs/en/` (`docs/en/controls/<category>/<component>.md` and `docs/en/guides/`) is the source of truth, `docs/hu/` is its Hungarian translation; the book (`book.md` in the repository root, chapters in `book/`) embeds it, and its reference chapter is generated with `bun run scripts/book-reference.ts`. The page template for components is `AGENTS/contribution/documentation.md`.

## Library standards

Before creating or modifying components, read `AGENTS/contribution/` (start at `index.md`): the workflow (structure, categories, new-component workflow, showcase), coding standards (Svelte 5, imports, exports, Escape in floating elements), styling, the helpers in `src/lib/helpers/`, and the component page template.

Update the component's showcase page in the same task.
