# Block Editor Guide

`MdBlockEditor` — a minimalist, block-based Markdown editor located at `src/lib/controls/forms/block-editor/`.

## Architecture

**Split on Load / Join on Save**: Markdown is split on `\n\n` into independent blocks on load; blocks are joined back with `\n\n` when serialized to `value`.

**Syntax Highlighting**: Regex-based; highlights headings, bold, italic, blockquote, inline code, and more. Syntax markers stay visible (not hidden). Implementation in `highlight.ts`.

**Plugin-based**: The core editor only knows about the `text` built-in type. All other block types (`youtube`, `gallery`, custom) are registered externally via `BlockPlugin`. The core never imports plugin-specific logic.

## File structure

```
src/lib/controls/forms/block-editor/
  BlockEditor.svelte        — root component
  types.ts                  — Block, BlockPlugin interfaces
  highlight.ts              — regex highlight engine
  index.ts                  — public exports
  plugins/
    youtube/
      YoutubeBlock.svelte   — YouTube embed component
      index.ts              — youtubePlugin export
    gallery/
      GalleryBlock.svelte   — image gallery component
      index.ts              — galleryPlugin export
```

## Block types

| Type | Detected by |
|------|-------------|
| `text` | fallback |
| `heading` | `^#{1,6} ` |
| `blockquote` | `^> ` |
| `list` | `^\s*[-*] ` or `^\s*\d+\. ` |
| `code` | ` ``` ` opener |
| `table` | every line starts with `\|` |
| `hr` | `/^(-{3,}|\*{3,}|_{3,})$/` |
| `<plugin type>` | `^block:<type>` first line |

## Plugin block format

Plugin blocks in Markdown are identified by a `block:<type>` prefix on the first line:

```
block:youtube
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

`detectType()` checks for this prefix before any other detection. The `parse` function of the matching plugin receives the full raw content string.

## Exports

```ts
export { MdBlockEditor }        // root component
export type { MdBlockEditorTypes } // Block, BlockPlugin
export { youtubePlugin }        // reference plugin
export { galleryPlugin }        // reference plugin
```

## Adding a new plugin

1. Create `plugins/<type>/` with a Svelte component and `index.ts`.
2. The component must accept `metadata: <YourMetadata>` as a prop.
3. Define `parse` (raw → metadata) and `serialize` (metadata → raw).
4. Export from `index.ts` and re-export from `block-editor/index.ts`.
5. Register via the `plugins` prop at call site.

See `docs/controls/forms/block-editor.md` for the full authoring guide.
