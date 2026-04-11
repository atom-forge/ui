---
status: active
plan: work/plan.block-editor-2.md
tags: [frontend]
---

# Todo: EDITOR2-02 — Block Components

## Source / Context
Plan: work/plan.block-editor-2.md — Phase EDITOR2-02

## Description
Implement all 8 individual Svelte block components. Each handles both preview and edit rendering under the Focus-to-Reveal contract.

## Acceptance Criteria
- [ ] `ParagraphBlock.svelte` — preview: inline-formatted; edit: raw markdown with muted markers
- [ ] `HeadingBlock.svelte` — preview: formatted + fixed-width H1–H6 level icon; edit: `#` prefix, uniform font-size
- [ ] `BulletListBlock.svelte` — preview: `•` bullets with auto-indent; edit: `- ` markers visible
- [ ] `OrderedListBlock.svelte` — preview: `1.` numbering; edit: `1.` markers visible
- [ ] `TodoListBlock.svelte` — preview: interactive library `Checkbox` per item; edit: `- [ ]`/`- [x]` markers
- [ ] `QuoteBlock.svelte` — preview: vertical bar + italic; edit: `> ` marker visible
- [ ] `CodeBlock.svelte` — preview: syntax-highlighted, muted background; edit: ` ``` ` fences visible
- [ ] `DividerBlock.svelte` — renders `<hr>`; no contenteditable; Backspace/Delete removes it
- [ ] No type errors (`bun run check`)
- [ ] Documentation updated (plan status updated to reflect EDITOR2-02 complete)
- [ ] Relevant documents in `work/docs/guides/` and `work/contribution/rules/` updated as needed

## Technical Notes
- Depends on EDITOR2-01 types and BlockEditor scaffold
- `TodoListBlock` must use the existing library `Checkbox` component
- `HeadingBlock` level icon must be fixed-width to avoid text reflow

## Implementation Log
