---
status: active
plan: work/plan.editor.md
tags: [frontend]
---

# Todo: Block Editor — Block Navigation & Granular Operations

## Source / Context
work/plan.editor.md — Phase 3

## Description
Add cross-block keyboard navigation and block-splitting operations.

## Acceptance Criteria
- [ ] `ArrowUp` / `ArrowDown` switches focus between blocks using coordinate-based logic, preserving horizontal X position
- [ ] `Double Shift+Enter` splits the current block at the cursor position into two blocks
- [ ] Cursor placement is correct when switching between blocks (lands at matching X position)
- [ ] Dev page updated to exercise navigation
- [ ] No type errors (`bun run check`)
- [ ] Documentation updated (plan file progress reflected)
- [ ] Relevant documents in `work/docs/guides/` and `work/contribution/rules/` updated as needed

## Technical Notes
- Coordinate-based switching: use `getBoundingClientRect` or caret coordinates, not simple line counts

## Implementation Log
