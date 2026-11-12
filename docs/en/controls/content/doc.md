# Doc components

Presentation controls for API references, highlighted source, and live examples. These are public exports, not an automatic documentation generator.

## Import

```ts
import { DocApiBlock, DocApiTable, DocInlineCode, DocShowCode, DocShowExample,
  type PropDef, type CodeFile } from '@atom-forge/ui';
```

## When to use

Use these to build component reference pages with explicit prop metadata and source examples.

## Alternatives

Use [Prose](./prose.md) for narrative content, or plain semantic HTML for an unstyled reference.

## Setup

Apply the library CSS setup in [Getting Started](../../guides/getting-started.md). Import a `svelte-highlight` theme in your application entry, for example `import 'svelte-highlight/styles/github-dark.css'`. The highlighter does not supply theme CSS automatically. No Doc-specific context provider is required.

## Minimal example

```sveltehtml
<script lang="ts">
  import { DocApiBlock, DocApiTable, DocInlineCode, DocShowCode,
    DocShowExample, type PropDef, type CodeFile } from '@atom-forge/ui';
  const props: PropDef[] = [
    { name: 'label', type: 'string', description: 'Visible text.', default: "''" }
  ];
  const files: CodeFile[] = [
    { name: 'example.ts', language: 'typescript', code: "const label = 'Save';" }
  ];
</script>

<p>Set <DocInlineCode>label</DocInlineCode> to the visible text.</p>
<DocApiBlock title="Props"><DocApiTable {props}/></DocApiBlock>
<DocShowCode code={files} title="Source"/>
<DocShowExample code="const label = 'Save';"/>
```

The example intentionally omits `component`. To show a live demo, pass an imported, self-contained Svelte component: `component={Demo}`. `DocShowExample` instantiates it without props; configure any required values inside that demo component.

## Behavior

- `DocApiTable` splits consecutive entries into sections when `group` changes. Entries without `name` can establish a section without producing a row.
- Descriptions recognize literal `<code>...</code>` segments; this is not a general HTML renderer.
- `DocShowCode` uses tabs for more than one file and a collapsible source panel.
- `DocShowExample` combines an optional live component with a source accordion.

## API

| Export | Props |
|---|---|
| `DocApiBlock` | Required `title: string`, `children: Snippet`; optional `class: string`. |
| `DocApiTable` | Required `props: PropDef[]`. |
| `DocInlineCode` | Required `children: Snippet`; optional `class`; additional props are forwarded to its element. |
| `DocShowCode` | Required `code: string \| CodeFile[]`; optional `file: string`, `title: string`, `open: boolean = true`, `class: string`. |
| `DocShowExample` | Required `code: string \| CodeFile[]`; optional `component: Component`, `class: string`. |

`PropDef` has optional string fields `name`, `type`, `description`, `default`, and `group`. `CodeFile` is `{ name: string; language?: string; code: string }`.

Supported language keys are `typescript`, `javascript`, `python`, `css`, `xml`, `bash`, `shell`, `json`, `sql`, `rust`, `go`, `java`, `kotlin`, `swift`, `cpp`, `markdown`, `yaml`, `php`, `dockerfile`, `plaintext`, and `svelte`. Omitted language uses TypeScript; unknown keys use plaintext. The `svelte` key currently uses the TypeScript grammar.

## Limitations

Metadata is authored manually and is not checked against component props by these controls. A string `code` input has no language prop; use `CodeFile[]` to select a language. Live demos do not receive a props object. Do not confuse `CodeFile` (`name`, `code`) with the block editor's `BlockCodeFile` (`filename`, `source`).

Source: `src/lib/controls/content/doc/index.ts` and the five exported `.svelte` files.
