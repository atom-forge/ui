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

### Decisions

- **`isOnFirstLine` / `isOnLastLine` via caret rect** — `sel.getRangeAt(0).getBoundingClientRect()` gives the cursor's pixel position. Comparing `caretRect.top` vs `elRect.top + caretRect.height * 0.5` (and bottom equivalent) detects boundary lines reliably without needing explicit line counts. `caretRect.height` is used as a line-height proxy since a collapsed range inherits the line's height. Empty elements return a zero rect and are treated as both first and last line.

- **`setCursorAtX` via `caretRangeFromPoint` / `caretPositionFromPoint`** — Places the cursor at a given `(x, y)` pixel coordinate using the browser's native hit-testing. `caretRangeFromPoint` (Chrome/Safari) is tried first; `caretPositionFromPoint` (Firefox) is the fallback; a start/end position is the last resort. The Y coordinate is computed as `top + lineH/2` (atTop) or `bottom - lineH/2` (atBottom) using the CSS `line-height` value.

- **`stickyX` for column preservation** — A non-reactive `stickyX` variable is set the first time the user crosses a block boundary via ArrowUp/Down and is preserved for consecutive arrow presses. Any non-arrow keypress resets it to `null`, just like native editor behavior.

- **Double Shift+Enter splits block** — `lastWasShiftEnter` (non-reactive) is set by the first Shift+Enter and cleared on any other key. On the second consecutive Shift+Enter, the cursor offset `pos` points to one character past the `\n` that was inserted by the first press; the block is split at `pos - 1` (removing that `\n`). The new block is spliced in and focused via `setTimeout` (same pattern as Enter).

- **Arrow handlers are synchronous** — Unlike Enter/Backspace (which need `setTimeout` to wait for Svelte to render new DOM nodes), ArrowUp/Down operate on already-existing block elements and call `setCursorAtX` synchronously after `e.preventDefault()`.

- **No changes to types or index** — All new logic lives inside `BlockEditor.svelte`. The `Block` interface, highlight module, and exports are unchanged.
