---
status: active
plan: work/plan.block-editor-2.md
tags: [frontend]
---

# Todo: EDITOR2-05 — Conversion Matrix (Convert-to)

## Source / Context
Plan: work/plan.block-editor-2.md — Phase EDITOR2-05

## Description
Allow users to manually convert a block to a compatible type via a UI affordance (dropdown or small popover on hover/focus). Apply conversion matrix from spec.

## Acceptance Criteria
- [ ] Convert-to picker appears on block hover/focus
- [ ] Paragraph can convert to: H1–6, BL, OL, Todo, Quote, Code
- [ ] Heading can convert to: P, H1–6, BL, OL, Todo, Quote
- [ ] Bullet List can convert to: P, H1–6, OL, Todo, Quote
- [ ] Ordered List can convert to: P, H1–6, BL, Todo, Quote
- [ ] Todo List can convert to: P, H1–6, BL, OL, Quote
- [ ] Quote can convert to: P, H1–6, BL, OL, Todo
- [ ] Code Block can convert to: P only (` ``` ` fences stripped, content becomes plain text)
- [ ] Divider offers no conversion options
- [ ] Disallowed conversions are not offered in the UI
- [ ] No type errors (`bun run check`)
- [ ] Documentation updated (plan status updated to reflect EDITOR2-05 complete)
- [ ] Relevant documents in `work/docs/guides/` and `work/contribution/rules/` updated as needed

## Technical Notes
- Depends on EDITOR2-03
- Can be implemented in parallel with EDITOR2-04

## Implementation Log
