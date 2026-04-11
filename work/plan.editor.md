---
status: active
tags: [frontend]
spec: work/docs/specs/editor.md
---

# Plan: Block Editor (Notion-like)

## Overview
A minimalist, block-based Markdown editor in Svelte 5.
Design principle: **Split on Load / Join on Save** — content is split into blocks for editing, then serialized back to Markdown on save.
Rendering mode: **Syntax Highlighting** (not WYSIWYG — Markdown syntax stays visible but is styled).

The editor is visually a **single, continuous body of text**. Special blocks (youtube, gallery, chart, etc.) are not rendered as cards or panels — they appear as inline elements seamlessly integrated into the text flow, with consistent line spacing and left margin.

The editor is **plugin-based**. Non-text block types (youtube, gallery, chart, etc.) are not built-in features — they are plugins registered at instantiation time. The core editor has no knowledge of specific block types beyond `text`.

## Source
`work/docs/specs/editor.md`

## Component Location
`src/lib/controls/forms/block-editor/`

## Phases & Todos

### Phase 0 — Dev Test Page ✓
`work/journal/` (archived)
- Enable `src/routes/` in this project for development-only testing (update `ui-lib-dev.md` rule to allow dev routes, which are never published in the package)
- Create `src/routes/editor/+page.svelte` as a live sandbox for the editor component
- The page should exercise: basic text editing, load/save round-trip, and registered plugins
- Updated after each phase to reflect new capabilities

### Phase 1 — Core Block Structure ✓
`todo.EDITOR-01-core-blocks.md`
- `BlockEditor` root component with `$state` block array
- `Block` interface: `{ id, type, content, metadata }`
- `div[contenteditable]` per block, Monospace font
- `Enter` → new block; `Backspace` at start → merge with previous block
- Load: split Markdown on `\n\n` into blocks; Save: join blocks with `\n\n`
- `Shift+Enter` → soft line break (`\n`) within block

### Phase 2 — Syntax Highlighting ✓
`todo.EDITOR-02-syntax-highlighting.md`
- Lightweight regex parser injects styled `<span>` tags into contenteditable content
- Highlights: headings (`#`), bold (`**`), italic (`*`), blockquote (`>`), inline code (`` ` ``)
- Color tokens from the semantic color system (no hardcoded hex)

### Phase 3 — Block Navigation & Granular Operations ✓
`work/journal/` (archived)
- `ArrowUp/Down`: coordinate-based block switching, preserving horizontal X position
- `Double Shift+Enter`: block split at cursor position
- Cursor placement when switching blocks

## EDITOR-04 Key Decisions

- **`block:<type>` prefix convention** — Plugin blocks are identified by `block:<type>` on the first line of the block's content string. `detectType()` checks this before any built-in heuristic. The raw content string is preserved as-is through serialization — no transformation by the core.

- **`BlockPlugin<M>` with `any` default** — The generic `M` parameter defaults to `any` (matching the existing `Block.metadata: any`). A `plugins: BlockPlugin[]` array is heterogeneous; the core calls `plugin.parse(raw)` and passes the result directly to the component as `metadata`. No unsafe casts needed in the template.

- **Metadata computed at render time** — `plugin.parse(block.content)` is called inline in the `{#each}` block via `{@const meta = ...}`. Metadata is never stored in block state, avoiding stale values and reactivity side-effects.

- **`oncontent` callback on plugin components** — Plugin components receive an `oncontent: (content: string) => void` prop alongside `metadata`. Calling it updates `blocks[i].content` and re-derives the type. This makes plugin blocks fully editable without the core knowing anything about their internals.

- **Drag handle as flex sibling** — The `⠿` handle is a `shrink-0 w-4` flex sibling to the left of each block's `[data-block-id]` div. This eliminates the overlap with the `::before` bar that occurred when the handle was positioned absolutely inside `pl-3`. Text blocks no longer need `contenteditable="false"` hacks on the handle child.

- **`dragFromIdx` is `$state`** — Both drag indices are reactive so the end-of-list drop zone and the "don't highlight self" guard render correctly during a drag operation.

- **Tab/Shift+Tab indentation** — Collapse: insert/remove `\t` at cursor. Range: indent/dedent every line touched by the selection; both selection endpoints are adjusted by the number of characters added/removed before each endpoint. Implemented via `getCursorRange` / `setCursorRange` helpers that walk the text-node tree of the contenteditable.

- **Block margins** — Replaced `space-y-3` (bottom-only gap) with `my-1.5` per block row (equal top+bottom, same total gap between adjacent blocks).

## EDITOR-03 Key Decisions

- **`isOnFirstLine` / `isOnLastLine` zero-rect fix** — When `caretRect.height === 0` (cursor on an empty line), the original code treated it as both first and last line, causing ArrowUp/Down to incorrectly jump between blocks mid-block. Fixed by falling back to `getCursorOffset(el) === 0` for first-line detection and `getCursorOffset >= innerText.length` for last-line detection. Empty lines in the middle of multi-line blocks are now correctly treated as neither.

- **Double-Enter split trims surrounding newlines** — The second Enter splits at `pos - 1`, but if the cursor was already next to an existing `\n` (e.g. mid-paragraph), `before` could end with `\n` and `after` could start with `\n`. Fixed by applying `.replace(/\n+$/, '')` to `before` and `.replace(/^\n+/, '')` to `after` at split time.

- **Single-step Backspace merge** — Backspace at block start merges immediately into the previous block (cursor lands at the junction). Delete at block end merges the next block into the current one. No two-step gesture — merge is immediate.

- **Delete at block end merges forward** — New `Delete` key handler: `isAtEnd(el) && i < blocks.length - 1` → merges `blocks[i + 1]` into `blocks[i]`, cursor stays at the original content length (junction point).

- **`splitOnFenceClose` in `onInput`** — When a code block gains a closing ` ``` ` mid-edit, the block is split at the first closer. Guard condition: `!hadCloser || hasContentAfter` — skips the split for a normally-loaded closed block (where `after` would be empty), but fires when the user types a new closer in a position that leaves content after it.

### Phase 4 — Plugin System ✓
`work/journal/` (archived)
- Define `BlockPlugin` interface:
  ```ts
  interface BlockPlugin {
    type: string;           // matches the 'block:xxx' prefix in Markdown
    parse: (raw: string) => metadata;   // extracts structured data from raw content
    serialize: (metadata) => string;    // writes back to raw Markdown
    component: Component;  // Svelte component rendered in-flow
  }
  ```
- `BlockEditor` accepts a `plugins: BlockPlugin[]` prop; core has no knowledge of specific types beyond `text`
- Plugin components render **inline within the continuous text flow** — no card framing, no extra margins, same layout wrapper as text blocks
- Ship two reference plugins as separate exports: `youtubePlugin`, `galleryPlugin`
- Plugin registration and dispatch by `block.type`

## EDITOR-02 Key Decisions

- **`highlight.ts` pure module** — Regex parser in a separate file, no DOM dependency. Processes line-by-line (block/heading/blockquote), then inline (code → bold → italic, in that priority order).
- **`data-hl` + `:global()` CSS** — Dynamically-injected spans use `data-hl` attributes; styles live in the Svelte `<style>` block with `:global()`. Avoids Tailwind build-time purging issues for dynamic class names.
- **CSS custom properties** — All highlight colors use `var(--color-*)` tokens (accent, muted-contrast, error, muted). Theme-aware, no hardcoded hex.
- **`applyHighlight` cursor preservation** — Saves char offset via `getCursorOffset` before innerHTML update; restores via `setCursorPosition` (TreeWalker over text nodes). Works across span boundaries because TreeWalker operates on raw text nodes.
- **`initBlock` now sets `innerHTML`** — Changed from `innerText` to `innerHTML = highlight(content)`. All programmatic DOM writes (Enter, Backspace) follow the same pattern.

## EDITOR-01 Key Decisions

- **Export name is `MdBlockEditor`** — `BlockEditor` is already taken by `src/lib/controls/editors/block-editor/`. Types namespace is `MdBlockEditorTypes`. The component file remains `BlockEditor.svelte` internally.
- **Contenteditable DOM strategy** — `initBlock` Svelte action (fire-once, no `update` handler) sets `innerText` on element creation. Content is never reactively re-rendered by Svelte; `oninput` syncs DOM → state, and programmatic changes (Enter/Backspace) update both state and DOM imperatively.
- **Two-`$effect` sync pattern** — Effect 1 (`blocks` → `value`) serializes on every mutation; Effect 2 (`value` → `blocks`) re-parses only when `value !== lastSerialized`. A plain (non-reactive) `lastSerialized` variable breaks the feedback loop without introducing extra reactive state.
- **Shift+Enter** uses `document.execCommand('insertText', false, '\n')` for cross-browser `\n` insertion in contenteditable. With `whitespace-pre-wrap`, the character renders as a visual line break and `innerText` reads it back correctly.
- **Cursor placement** after Enter/Backspace uses `setTimeout` to query the target block by `data-block-id` after Svelte re-renders, then a `TreeWalker` over text nodes to position the caret.

## EDITOR-00 Key Decisions

- **`$lib` unavailable in routes** — The project `tsconfig.json` overrides the `$lib` path alias (points to the published dist, not `src/lib`). Route files must use relative imports (`../lib/...`).
- **New component, not existing BlockEditor** — The plan builds a new minimalist `Editor` at `src/lib/controls/forms/block-editor/`. The existing `BlockEditor` at `src/lib/controls/editors/block-editor/` is a separate, unrelated component.
- **Shell files added** — `src/app.html` and `src/routes/+layout.svelte` are required for SvelteKit dev routes. Layout wraps with `Root` for theming.
- **Dev routes guide** — `work/docs/guides/dev-routes.md` documents the convention for future phases.

## Plan-level Acceptance Criteria
- [ ] All 5 phase todos completed and closed
- [ ] Component and reference plugins exported from `src/lib/index.ts`
- [ ] Component documented in `docs/controls/forms/block-editor.md`
- [ ] Plugin authoring documented (interface + example)
- [ ] `bun run check` passes with no type errors
