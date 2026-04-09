---
status: active
plan: work/plan.editor.md
tags: [frontend]
---

# Todo: Block Editor — Dev Test Page

## Source / Context
work/plan.editor.md — Phase 0

## Description
Set up a development-only sandbox page for the block editor so each subsequent phase can be tested live.

## Acceptance Criteria
- [ ] `src/routes/` is enabled for dev-only use (update `work/contribution/rules/ui-lib-dev.md` to explicitly allow dev routes that are never published in the package)
- [ ] `src/routes/editor/+page.svelte` created as a live sandbox
- [ ] Page exercises: basic text editing, load/save round-trip, and registered plugins
- [ ] No type errors (`bun run check`)
- [ ] Documentation updated (plan file progress reflected)
- [ ] Relevant documents in `work/docs/guides/` and `work/contribution/rules/` updated as needed

## Technical Notes
- Dev routes live in `src/routes/` but are never exported from `src/lib/index.ts`
- Page will be updated after each phase to reflect new editor capabilities

## Implementation Log
