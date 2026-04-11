---
status: active
spec: work/docs/specs/block-editor-2.md
tags: [frontend]
---

# Plan: Block Editor v2 (Live Preview)

A ground-up redesign of the block-based Markdown editor. The core shift from v1: **Focus-to-Reveal** — blocks render a formatted live preview when unfocused and reveal raw Markdown markers only when focused.

Implementation target: `src/lib/dev/block-editor-2/`

---

## Phases

### EDITOR2-01 — Architecture & Live Preview Core

Redesign the block model and core editor to support dual-mode rendering (preview vs. edit) per block.

**Scope:**
- New `types.ts`: extend `Block` to track `focused` state; define all block type literals
- New `BlockEditor.svelte` scaffold: focus tracking, block focus/blur event propagation
- Focus-to-Reveal rendering contract: unfocused → preview HTML; focused → raw content editable
- Global style rules: monospace font, uniform font-size for all block types including headings

**Acceptance criteria:**
- A paragraph block shows plain text when unfocused; shows raw Markdown with muted markers when focused
- No layout shift (color/font/spacing) when switching between preview and edit mode
- `bun run check` passes

---

### EDITOR2-02 — Block Components

Individual Svelte components for each block type. Each component handles both preview and edit rendering.

**Block components to implement:**

| Component | Type key | Preview | Edit |
|---|---|---|---|
| `ParagraphBlock.svelte` | `paragraph` | Plain inline-formatted text | Raw markdown with muted markers |
| `HeadingBlock.svelte` | `heading` | Formatted text + fixed-width H1–H6 level icon | `# ` prefix visible, uniform font-size |
| `BulletListBlock.svelte` | `bullet-list` | `•` bullets, auto-indent | `- ` markers visible |
| `OrderedListBlock.svelte` | `ordered-list` | `1.` numbering | `1.` markers visible |
| `TodoListBlock.svelte` | `todo-list` | Interactive `Checkbox` component per item | `- [ ]` / `- [x]` markers |
| `QuoteBlock.svelte` | `quote` | Vertical bar, italic text | `> ` marker visible |
| `CodeBlock.svelte` | `code` | Syntax highlight, muted background | ` ``` ` fences visible |
| `DividerBlock.svelte` | `divider` | `<hr>` visual line | Not editable — delete only |

**Notes:**
- `TodoListBlock`: use the existing library `Checkbox` component for the checkbox
- `HeadingBlock`: level icon (H1–H6) must be fixed-width so it doesn't cause text reflow
- `DividerBlock`: no contenteditable; Backspace/Delete removes it

**Acceptance criteria:**
- All 8 block types render correctly in both preview and edit mode
- `bun run check` passes

---

### EDITOR2-03 — Input Rules (Auto Block Conversion)

Detect trigger patterns while typing and auto-convert the current block type.

**Trigger table:**

| Typed pattern | Converts to | Trigger moment |
|---|---|---|
| `# ` … `###### ` | Heading 1–6 | On `Space` after `#…` |
| `- ` or `* ` | Bullet List | On `Space` |
| `1. ` | Ordered List | On `Space` |
| `[] ` | Todo List | On `Space` |
| `> ` | Quote | On `Space` |
| ` ``` ` | Code Block | On third backtick |
| `---` | Divider | Immediately (whole line) |

**Implementation notes:**
- Detection runs inside `onKeydown` / `onInput` on the active block
- On match: strip the trigger prefix from content, update `block.type`, re-render
- `---` input rule produces a `DividerBlock` and places cursor in a new empty paragraph below

**Acceptance criteria:**
- All 7 triggers convert the block correctly
- Trigger characters are stripped from content after conversion
- `bun run check` passes

---

### EDITOR2-04 — Heading Editor (Outline View)

A separate `HeadingEditor.svelte` component that shows all headings as an interactive tree.

**Features:**
- Lists all `heading` blocks in document order
- Indent (→) / Outdent (←) controls per heading → updates the `#` level in the block content
- Skip-level validation via `$derived`: if a heading jumps more than one level (e.g. H1 → H3), show a red `!` warning badge next to it
- Click on any heading → scrolls the editor to that block (via `data-block-id` DOM query)

**Acceptance criteria:**
- Outline reflects live document state
- Indent/outdent updates markdown level and re-validates hierarchy
- Skip-level warning appears and disappears correctly
- Clicking a heading entry scrolls to the correct editor block
- `bun run check` passes

---

### EDITOR2-05 — Conversion Matrix (Convert-to)

Allow users to manually convert a block to a compatible type via a UI affordance (e.g. block-type icon button or context menu).

**Allowed conversions per source type (from spec matrix):**

| Source | Can convert to |
|---|---|
| Paragraph | H1–6, BL, OL, Todo, Quote, Code |
| Heading | P, H1–6, BL, OL, Todo, Quote |
| Bullet List | P, H1–6, OL, Todo, Quote |
| Ordered List | P, H1–6, BL, Todo, Quote |
| Todo List | P, H1–6, BL, OL, Quote |
| Quote | P, H1–6, BL, OL, Todo |
| Code Block | P only (content becomes plain text) |
| Divider | — (no conversion) |

**Implementation notes:**
- Show a convert-to picker (dropdown or small popover) on block hover/focus
- Apply the conversion: strip/add markers, update `block.type`
- Code Block → Paragraph: strip ` ``` ` fences, paste raw text as paragraph content

**Acceptance criteria:**
- All matrix-allowed conversions work correctly
- Disallowed conversions are not offered
- `bun run check` passes

---

## Phase Execution Order

```
EDITOR2-01 → EDITOR2-02 → EDITOR2-03 → EDITOR2-04 → EDITOR2-05
```

Each phase depends on the previous. EDITOR2-04 and EDITOR2-05 can be done in any order after EDITOR2-03.

## Status

| Phase | Todo file | Status |
|---|---|---|
| EDITOR2-01 | `work/journal/2026-04-11-*.done.EDITOR2-01-architecture.md` | done |
| EDITOR2-02 | `work/todo.EDITOR2-02-block-components.md` | pending |
| EDITOR2-03 | `work/todo.EDITOR2-03-input-rules.md` | pending |
| EDITOR2-04 | `work/todo.EDITOR2-04-heading-editor.md` | pending |
| EDITOR2-05 | `work/todo.EDITOR2-05-conversion-matrix.md` | pending |

---

## EDITOR2-01 Key Decisions

1. **`Block.focused` owns the mode.** Each block carries its own `focused: boolean`. The `{#if block.focused}` branch swaps between preview div and contenteditable div. No separate "active index" state variable.

2. **`initEditBlock` use: action.** When the edit div mounts (focus toggle), the action sets highlighted innerHTML, calls `node.focus()`, and places the cursor from a `pendingCursors: Map<string, number>` side-channel. The map is non-reactive — written by `focusBlock()` just before the Svelte update, read by the action just after mount.

3. **`onBlur` defers via `setTimeout(0)`.** Without the defer, clicking from block A's edit div to block B's preview would briefly show both in preview mode (A blurs → A becomes preview → B is clicked → B becomes edit). The delay allows `focusBlock(B)` to set `A.focused = false` synchronously first, making the `onBlur(A)` handler a no-op.

4. **Shared CSS string `blockContentCls`.** Both the preview div and edit div use the same Tailwind class string (monospace, text-sm, leading-relaxed, same padding). This is the structural guarantee against layout shift.

5. **`preview.ts` is a pure function module.** `renderPreview(content, type)` handles all 8 block types with simple regex-based inline Markdown → HTML conversion. EDITOR2-02 will introduce per-type Svelte components that replace this per-type handling.

6. **Plugin system removed.** The v1 `BlockPlugin` registry is gone. V2's extensibility model is component-based (separate Svelte component per block type, EDITOR2-02).

7. **`detectType` order matters.** `todo-list` must be checked before `bullet-list` because `- [ ] text` matches both `^\s*[-*] ` and `^\s*- \[[ x]\] `. `divider` is checked first since it tests the full content (not just the first line).
