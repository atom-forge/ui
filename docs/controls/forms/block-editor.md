# MdBlockEditor

A minimalist, block-based Markdown editor. Follows the **Split on Load / Join on Save** principle — Markdown is split into editable blocks on load and joined back with `\n\n` on save. Renders with a monospace font and visible Markdown syntax (not WYSIWYG).

## Import

```svelte
import { MdBlockEditor } from '@atom-forge/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Markdown content. Supports `bind:value` for two-way binding. |
| `class` | `string` | — | Additional CSS classes merged onto the container. |

## Basic usage

```sveltehtml
<script lang="ts">
  let markdown = $state('# Hello\n\nStart writing here.');
</script>

<MdBlockEditor bind:value={markdown} />
```

## Load / Save round-trip

On load, `value` is split on `\n\n` into blocks. On save (i.e. whenever the user edits), the serialized Markdown is written back to `value`.

```sveltehtml
<script lang="ts">
  let content = $state('# Title\n\nFirst paragraph.\n\nSecond paragraph.');
  let saved   = $state(content);
</script>

<MdBlockEditor bind:value={content} />
<button onclick={() => saved = content}>Save</button>
<pre>{saved}</pre>
```

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Create a new block below, splitting content at cursor |
| `Shift+Enter` | Soft line break (`\n`) within the current block |
| `Backspace` at block start | Merge current block into the previous block |

## Block model

Each block in the internal state follows the `Block` interface:

```ts
import type { MdBlockEditorTypes } from '@atom-forge/ui';

// MdBlockEditorTypes.Block
interface Block {
  id: string;      // crypto.randomUUID()
  type: string;    // 'text' for all Phase 1 blocks; plugins extend this
  content: string; // raw Markdown text
  metadata: any;   // structured data for non-text blocks (Phase 4+)
}
```

## Styling

The editor container accepts a `class` prop for external overrides. By default it renders with a border, background, and internal padding. Block divs use a monospace font with `whitespace-pre-wrap` for accurate Markdown display.

```sveltehtml
<MdBlockEditor bind:value={markdown} class="min-h-64" />
```

## Related

- [plan: Block Editor](../../../work/plan.editor.md)
- [spec: editor.md](../../../work/docs/specs/editor.md)
