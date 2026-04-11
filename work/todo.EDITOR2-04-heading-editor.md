---
status: active
plan: work/plan.block-editor-2.md
tags: [frontend]
---

# Todo: EDITOR2-04 — Heading Editor (Outline View)

## Source / Context
Plan: work/plan.block-editor-2.md — Phase EDITOR2-04

## Description
A separate `HeadingEditor.svelte` component showing all headings as an interactive outline tree with indent/outdent controls and skip-level validation.

## Acceptance Criteria
- [ ] Lists all `heading` blocks in document order
- [ ] Indent (→) / Outdent (←) controls update the `#` level in the block content
- [ ] Skip-level validation via `$derived`: H1→H3 (skipping a level) shows a red `!` warning badge
- [ ] Warning badge appears and disappears correctly as levels change
- [ ] Clicking a heading entry scrolls the editor to that block (via `data-block-id` DOM query)
- [ ] Outline reflects live document state
- [ ] No type errors (`bun run check`)
- [ ] Documentation updated (plan status updated to reflect EDITOR2-04 complete)
- [ ] Relevant documents in `work/docs/guides/` and `work/contribution/rules/` updated as needed

## Technical Notes
- Depends on EDITOR2-03
- New file: `HeadingEditor.svelte` in `src/lib/dev/block-editor-2/`
- Use `$derived` for live validation

## Implementation Log
