---
status: active
plan: work/plan.editor.md
tags: [frontend]
---

# Todo: Block Editor — Syntax Highlighting

## Source / Context
work/plan.editor.md — Phase 2

## Description
Add lightweight in-editor syntax highlighting via a regex parser that injects styled `<span>` tags into contenteditable content.

## Acceptance Criteria
- [ ] Regex parser highlights: headings (`#`), bold (`**`), italic (`*`), blockquote (`>`), inline code (`` ` ``)
- [ ] Color tokens from the semantic color system (no hardcoded hex values)
- [ ] Highlighting updates reactively as the user types
- [ ] Dev page updated to show highlighting in action
- [ ] No type errors (`bun run check`)
- [ ] Documentation updated (plan file progress reflected)
- [ ] Relevant documents in `work/docs/guides/` and `work/contribution/rules/` updated as needed

## Technical Notes
- Rendering mode is syntax highlighting, not WYSIWYG — Markdown syntax stays visible but is styled
- Must not break cursor position or contenteditable editing behavior

## Implementation Log
