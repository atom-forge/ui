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
| `plugins` | `BlockPlugin[]` | `[]` | External plugins for non-text block types. |
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

## Syntax highlighting

The editor highlights Markdown syntax as you type. Syntax markers remain visible (not hidden), styled with semantic color tokens.

| Token | Syntax | Appearance |
|-------|--------|------------|
| Heading | `# Heading` | Accent color, bold |
| Bold | `**text**` | Bold weight |
| Italic | `*text*` | Italic style |
| Blockquote | `> text` | Muted color |
| Inline code | `` `code` `` | Error color, muted background |
| Markers | `#`, `**`, `*`, `` ` ``, `>` | Muted color |

Highlighting is applied reactively on every keystroke. Cursor position is preserved across DOM updates.

## Plugin system

The editor is plugin-based. Non-text block types are registered externally via `BlockPlugin` — the core editor has no knowledge of specific types beyond `text`.

### `BlockPlugin` interface

```ts
import type { MdBlockEditorTypes } from '@atom-forge/ui';
import type { Component } from 'svelte';

// MdBlockEditorTypes.BlockPlugin<M>
interface BlockPlugin<M = any> {
  type: string;                      // matches the `block:<type>` prefix
  parse: (raw: string) => M;         // raw content string → metadata
  serialize: (metadata: M) => string; // metadata → raw content string
  component: Component<{ metadata: M }>; // Svelte component rendered in-flow
}
```

### Block content format

Plugin blocks use a `block:<type>` prefix on the first line, followed by plugin-specific payload lines:

```
block:youtube
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

```
block:gallery
https://example.com/image1.jpg
https://example.com/image2.jpg
```

### Authoring a plugin

```ts
import type { MdBlockEditorTypes } from '@atom-forge/ui';
import type { Component } from 'svelte';
import MyBlockComponent from './MyBlockComponent.svelte';

interface MyMetadata { value: string }

const myPlugin: MdBlockEditorTypes.BlockPlugin<MyMetadata> = {
  type: 'my-type',
  parse(raw) {
    const [, ...lines] = raw.split('\n');
    return { value: lines.join('\n') };
  },
  serialize(meta) {
    return `block:my-type\n${meta.value}`;
  },
  component: MyBlockComponent,
};
```

`MyBlockComponent.svelte` receives `metadata` as a prop:

```sveltehtml
<script lang="ts">
  let { metadata }: { metadata: { value: string } } = $props();
</script>

<div>{metadata.value}</div>
```

### Registering plugins

Pass plugins at instantiation time:

```sveltehtml
<script lang="ts">
  import { MdBlockEditor, youtubePlugin, galleryPlugin } from '@atom-forge/ui';
  let markdown = $state('');
</script>

<MdBlockEditor bind:value={markdown} plugins={[youtubePlugin, galleryPlugin]} />
```

Plugin components render inline within the continuous text flow — no card framing, no extra margins, same left-aligned layout wrapper as text blocks.

## Reference plugins

Two reference plugins are exported from `@atom-forge/ui`:

### `youtubePlugin`

Renders a YouTube embed from a URL.

```
block:youtube
https://www.youtube.com/watch?v=<id>
```

```ts
import { youtubePlugin } from '@atom-forge/ui';
```

### `galleryPlugin`

Renders a row of images from a list of URLs.

```
block:gallery
https://example.com/img1.jpg
https://example.com/img2.jpg
```

```ts
import { galleryPlugin } from '@atom-forge/ui';
```

## Styling

The editor container accepts a `class` prop for external overrides. By default it renders with a border, background, and internal padding. Block divs use a monospace font with `whitespace-pre-wrap` for accurate Markdown display.

```sveltehtml
<MdBlockEditor bind:value={markdown} class="min-h-64" />
```

## Related

- [plan: Block Editor](../../../work/plan.editor.md)
- [spec: editor.md](../../../work/docs/specs/editor.md)
