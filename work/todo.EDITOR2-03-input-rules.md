---
status: active
plan: work/plan.block-editor-2.md
tags: [frontend]
---

# Todo: EDITOR2-03 — Input Rules (Auto Block Conversion)

## Source / Context
Plan: work/plan.block-editor-2.md — Phase EDITOR2-03

## Description
Detect trigger patterns while typing and auto-convert the current block type. Detection runs inside `onKeydown`/`onInput` on the active block.

## Acceptance Criteria
- [ ] `# ` … `###### ` triggers heading 1–6 conversion on Space after `#…`
- [ ] `- ` or `* ` triggers bullet list on Space
- [ ] `1. ` triggers ordered list on Space
- [ ] `[] ` triggers todo list on Space
- [ ] `> ` triggers quote on Space
- [ ] ` ``` ` triggers code block on third backtick
- [ ] `---` triggers divider immediately and places cursor in new empty paragraph below
- [ ] Trigger characters are stripped from content after conversion
- [ ] No type errors (`bun run check`)
- [ ] Documentation updated (plan status updated to reflect EDITOR2-03 complete)
- [ ] Relevant documents in `work/docs/guides/` and `work/contribution/rules/` updated as needed

## Technical Notes
- Depends on EDITOR2-02 block components
- Detection in `onKeydown` / `onInput` on the active block

## Implementation Log
