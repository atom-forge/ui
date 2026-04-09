---
status: active
plan: work/plan.editor.md
tags: [frontend]
---

# Todo: Block Editor — Core Block Structure

## Source / Context
work/plan.editor.md — Phase 1

## Description
Implement the foundational block editor: a Svelte 5 component that splits Markdown into editable blocks and joins them back on save.

## Acceptance Criteria
- [ ] `BlockEditor` root component with `$state` block array at `src/lib/controls/forms/block-editor/`
- [ ] `Block` interface: `{ id, type, content, metadata }`
- [ ] One `div[contenteditable]` per block, monospace font
- [ ] `Enter` → new block below; `Backspace` at start of block → merge with previous
- [ ] `Shift+Enter` → soft line break (`\n`) within current block
- [ ] Load: split Markdown on `\n\n` into blocks; Save: join blocks with `\n\n`
- [ ] Dev page updated to exercise core editing
- [ ] No type errors (`bun run check`)
- [ ] Documentation updated (plan file progress reflected)
- [ ] Relevant documents in `work/docs/guides/` and `work/contribution/rules/` updated as needed

## Technical Notes
- Component location: `src/lib/controls/forms/block-editor/`
- Spec: `work/docs/specs/editor.md`

## Implementation Log
