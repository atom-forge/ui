# Block Editor Guide

The block editor is being rebuilt as **Block Editor v2** (`BlockEditor2`) in `src/lib/dev/block-editor-2/`. The original v1 is preserved in `src/lib/dev/block-editor/` for reference during the v2 development phases.

---

## Block Editor v2 (active development)

**Location:** `src/lib/dev/block-editor-2/`

### Architecture: Focus-to-Reveal

The core design contract: blocks render a formatted preview when unfocused; focused blocks reveal raw Markdown with muted syntax markers.

- **Unfocused state**: a plain `<div>` renders preview HTML via `renderPreview()`. Markdown markers are hidden; inline formatting (`**bold**`, `*italic*`, etc.) is converted to semantic HTML.
- **Focused state**: a `contenteditable` div shows raw Markdown with syntax highlighting via `highlight.ts`.
- **No layout shift**: both modes share identical CSS (`font-mono text-sm leading-relaxed`). Color, font, and spacing are unchanged on focus toggle.

### Focus management

`Block.focused` is the single source of truth. The `{#if block.focused}` branch in the template drives the DOM swap.

- `focusBlock(i, offset?)` — sets `blocks[i].focused = true`, clears all others. Stores desired cursor offset in `pendingCursors` (non-reactive `Map`) for the `initEditBlock` action.
- `initEditBlock` Svelte action — runs once when the edit div mounts. Sets highlighted HTML, focuses element, places cursor from `pendingCursors`.
- `onBlur(i)` — uses `setTimeout(0)` to defer unfocus, allowing a same-tick `focusBlock()` (from clicking another block) to cancel the effect.

### File structure

```
src/lib/dev/block-editor-2/
  BlockEditor.svelte   — root component, Focus-to-Reveal scaffold
  types.ts             — BlockType literal union, Block interface (with focused)
  preview.ts           — renderPreview(): inline Markdown → semantic HTML
  highlight.ts         — regex highlight engine (edit mode only)
  index.ts             — exports: BlockEditor2, BlockEditor2Types
```

### Block types

| Type | Detected by | Preview |
|------|-------------|---------|
| `paragraph` | fallback | inline Markdown rendered to HTML |
| `heading` | `^#{1,6} ` | text without `#` prefix |
| `bullet-list` | `^\s*[-*] ` | `•` bullet + inline formatting |
| `ordered-list` | `^\s*\d+\. ` | number + inline formatting |
| `todo-list` | `^\s*- \[[ x]\] ` | checkbox symbol + inline formatting |
| `quote` | `^> ` | italic text without `>` |
| `code` | ` ``` ` opener | raw code without fences |
| `divider` | `/^(-{3,})$/` | `<hr>` element |

### Exports

```ts
export { BlockEditor2 }
export type { BlockEditor2Types }  // Block, BlockType
```

---

## Block Editor v1 (reference)

**Location:** `src/lib/dev/block-editor/`

Always-editable syntax-highlighting editor. Plugin-based architecture (`BlockPlugin`). Kept for reference during v2 development. Will be removed once v2 is promoted.
