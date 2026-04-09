---
status: active
plan: work/plan.editor.md
tags: [frontend]
---

# Todo: Block Editor — Plugin System

## Source / Context
work/plan.editor.md — Phase 4

## Description
Implement a plugin system so non-text block types (youtube, gallery, etc.) are registered externally. The core editor has no knowledge of specific types beyond `text`.

## Acceptance Criteria
- [ ] `BlockPlugin` interface defined: `{ type, parse, serialize, component }`
- [ ] `BlockEditor` accepts a `plugins: BlockPlugin[]` prop; dispatches rendering by `block.type`
- [ ] Plugin components render inline within the continuous text flow (no card framing, no extra margins, same layout wrapper as text blocks)
- [ ] `youtubePlugin` reference plugin shipped as a separate export
- [ ] `galleryPlugin` reference plugin shipped as a separate export
- [ ] `BlockEditor` and both plugins exported from `src/lib/index.ts`
- [ ] Plugin authoring documented (interface + example)
- [ ] Component documented in `work/docs/guides/` (controls/forms/block-editor)
- [ ] Dev page updated to register and exercise both reference plugins
- [ ] No type errors (`bun run check`)
- [ ] Documentation updated (plan file progress reflected)
- [ ] Relevant documents in `work/docs/guides/` and `work/contribution/rules/` updated as needed

## Technical Notes
- Plugin `parse` maps raw block content string → metadata object
- Plugin `serialize` maps metadata → raw Markdown string
- Core editor never imports plugin-specific logic

## Implementation Log
