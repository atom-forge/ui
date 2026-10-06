# MarkdownEditor

Markdown input with edit, split-preview, and preview modes.

## Import

```ts
import { MarkdownEditor } from '@atom-forge/ui';
```

## When to use

Use for a Markdown field or as the text editing surface in a structured document.

## Alternatives

Use [Textarea](../forms/textarea.md) for plain text, [ProseMarkdown](../content/prose.md) for display only, or [BlockEditor](./block-editor.md) for multiple typed blocks.

## Setup

Apply [Getting Started](../../guides/getting-started.md) CSS. Enable `@tailwindcss/typography` for preview typography. No editor-specific provider is required.

## Minimal example

```sveltehtml
<script lang="ts">
  import { MarkdownEditor } from '@atom-forge/ui';
  let markdown = $state('# Notes\n\nStart writing.');
</script>

<MarkdownEditor value={markdown} onchange={(next) => markdown = next}/>
```

## Behavior

The initial mode is `split`. Input and toolbar formatting report new Markdown through `onchange`. Parent value changes synchronize the local text. HTML clipboard content is converted with Turndown using ATX headings, fenced code blocks, and `-` bullets; images are discarded by a custom rule.

Ctrl/Cmd+B wraps the selection in `**`; Ctrl/Cmd+I uses `*`. Tab is prevented and calls `onnavigate` (Shift+Tab means `prev`), even when that callback is absent. Shift+Enter splits only if `onsplit` exists. Backspace at the beginning calls `onjoinprev`; Delete at the end calls `onjoinnext`, when provided.

## API

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | `''` |
| `onchange` | `(value: string) => void` | — |
| `onnavigate` | `(dir: 'prev' \| 'next') => void` | — |
| `onsplit` | `(before: string, after: string) => void` | — |
| `onjoinprev`, `onjoinnext` | `() => void` | — |

Component instance methods are `focus(dir: 'start' | 'end' = 'start')` and `focusAt(pos: number)`. Obtain the instance with `bind:this` if needed; `focus` targets the textarea, so preview-only mode has no textarea to focus.

## Limitations

`value` is not bindable: use `value` plus `onchange`, not `bind:value`. Preview uses `marked` and `{@html}` without sanitization; do not render untrusted Markdown without an application-level safety policy. There is no declared `class`, placeholder, readonly, or disabled prop. Tab handling requires attention when integrating keyboard navigation.

Source: `src/lib/controls/editors/markdown-editor/MarkdownEditor.svelte` and `index.ts`.
