# BlockEditor, BlockItem, and BlockView

Composable document editor with typed blocks, custom component registries, structural operations, focus coordination, and read-only previews.

## Import

```ts
import { BlockEditor, BlockItem, BlockView, getBlockAPI, defaultPreviewComponents,
  BlockEditTextarea, BlockEditMarkdown, BlockEditHeading, BlockEditQuote,
  BlockEditDiagram, BlockEditCallout, BlockEditDivider, BlockEditYoutube,
  BlockEditCode, BlockEditTable, BlockEditLinkCard,
  BlockViewHeading, BlockViewTextarea, BlockViewMarkdown, BlockViewQuote,
  BlockViewDivider, BlockViewYoutube, BlockViewTable, BlockViewDiagram,
  BlockViewCallout, BlockViewCode, BlockViewLinkCard, LANGUAGES,
  type Block, type BlockAPI, type BlockController,
  type BlockCodeFile, type CodeBlockData, type LinkCardData } from '@atom-forge/ui';
```

## When to use

Use for a document containing reorderable text, headings, tables, diagrams, and other typed blocks, or to register application-specific block editors.

## Alternatives

Use [MarkdownEditor](./markdown-editor.md) for a single Markdown value, [Prose](../content/prose.md) for read-only narrative content, or the standalone [TableEditor](./table-editor.md), [DiagramEditor](./diagram-editor.md), and [Doc](../content/doc.md) controls for individual content surfaces.

## Setup

Apply [Getting Started](../../guides/getting-started.md) CSS. Render `BlockEditor` inside `Root` because it retrieves the modal manager. Enable `@tailwindcss/typography` for prose/Markdown previews and import a `svelte-highlight` theme for code previews. Diagram and video blocks have the external-service requirements of their underlying controls.

## Minimal example

```sveltehtml
<script lang="ts">
  import { Root, BlockEditor, BlockView, BlockEditTextarea, BlockEditHeading,
    defaultPreviewComponents, type Block } from '@atom-forge/ui';
  let blocks = $state<Block[]>([
    { id: 'title', type: 'heading', data: { text: 'Project notes', level: 1 } },
    { id: 'intro', type: 'text', data: { text: 'Start writing here.' } }
  ]);
  const components = { heading: BlockEditHeading, text: BlockEditTextarea };
</script>

<Root>
  <BlockEditor bind:blocks {components} joinable="text"
    typeLabels={{ heading: 'Heading', text: 'Text' }}/>
  <BlockView {blocks} previewComponents={defaultPreviewComponents}/>
</Root>
```

Omit `Root` here when already provided by the application. The component registry is required: built-in editors are not registered automatically.

## Behavior

Block IDs identify editing controllers and keyed rendering; keep them unique. `BlockEditor` supplies the block API context to its descendants and manages structural operations. `blocks` is bindable. Its `onchange` tracks the comma-joined ID sequence and therefore reports additions/removals/reordering, **not** edits made through `updateData`. Observe bound state explicitly when persisting all edits; do not use `onchange` as an all-content-change notification.

`BlockView` looks up each block's type in `previewComponents`, instantiates the renderer with `data={block.data}`, and shows a missing-preview message for unknown types. Its preview is wrapped in a scrollable card. `defaultPreviewComponents` includes `heading`, `text`, `markdown`, `quote`, `divider`, `youtube`, `table`, `diagram`, `callout`, `code`, and `link`; spread the map to extend it.

## API

### Main components

| Export | Props |
|---|---|
| `BlockEditor` | Required `components: Record<string, Component<any>>`; optional bindable `blocks: Block[] = []`, `joinable: string = ''`, `typeLabels: Record<string, string> = {}`, `previewComponents: Record<string, Component<any>> = defaultPreviewComponents`, `onchange: (blocks: Block[]) => void`. |
| `BlockView` | Required `blocks: Block[]`, `previewComponents: Record<string, Component<any>>`. |
| `BlockItem` | Required `block: Block`, `components: Record<string, Component<any>>`; optional `typeLabels = {}`, `collapsed = false`, `onToggleCollapse: () => void`, `isFirst = false`, `isLast = false`, `onMoveUp: () => void`, `onMoveDown: () => void`. It is an editor row, not a standalone provider. |

`Block = { id: string; type: string; data: any }`. Type-to-data correspondence is application-owned; the public type is not a validated discriminated union.

### Built-in editors and views

Editors accept required `id: string` and `data` as shown below (including `null` for initial/default data), obtain `getBlockAPI()` from context, and report edits through that API. Views accept required `data` only. Render editors under `BlockEditor`; they are not context-free field components.

| Type key | Editor | View | Data shape (or `null`) |
|---|---|---|---|
| `text` | `BlockEditTextarea` | `BlockViewTextarea` | `{ text: string }` |
| `markdown` | `BlockEditMarkdown` | `BlockViewMarkdown` | `{ text: string }` |
| `heading` | `BlockEditHeading` | `BlockViewHeading` | `{ text: string; level: 1 \| 2 \| 3 }` |
| `quote` | `BlockEditQuote` | `BlockViewQuote` | `{ text: string }` |
| `divider` | `BlockEditDivider` | `BlockViewDivider` | `null` |
| `youtube` | `BlockEditYoutube` | `BlockViewYoutube` | `{ url: string; title?: string }` |
| `table` | `BlockEditTable` | `BlockViewTable` | `TableData` from [TableEditor](./table-editor.md) |
| `diagram` | `BlockEditDiagram` | `BlockViewDiagram` | `DiagramEditorTypes.DiagramData` from [DiagramEditor](./diagram-editor.md) |
| `callout` | `BlockEditCallout` | `BlockViewCallout` | `{ icon: string; color: 'info' \| 'warning' \| 'success' \| 'error' \| 'tip' \| 'note'; title: string; text: string }` |
| `code` | `BlockEditCode` | `BlockViewCode` | `CodeBlockData` |
| `link` | `BlockEditLinkCard` | `BlockViewLinkCard` | `LinkCardData` |

`BlockCodeFile = { filename: string; language: string; source: string }`.
`CodeBlockData = { files: BlockCodeFile[]; title: string; open: boolean }`.
`LinkCardData = { url: string; title: string; description: string; favicon: string }`.
`LANGUAGES` is an array of `{ value: string; label: string }` choices for code editing; values match the supported language keys listed in [Doc](../content/doc.md).

The default `table` preview registry entry is `TablePreview`; the separately exported `BlockViewTable` is also available.

### Context and controller API

Call `getBlockAPI(): BlockAPI` during initialization of a descendant editor under `BlockEditor`, not in the same parent component that merely renders it. No public context setter is exported from this module.

| Member | Signature |
|---|---|
| `joinable` | Readonly `string`; configured joinable block type. |
| `split` | `(blockId: string, newBlocksData: Omit<Block, 'id'>[]) => void` |
| `joinWithPrev`, `joinWithNext` | `(blockId: string, cursorPos?: number) => void` |
| `updateData` | `(blockId: string, newData: any) => void` |
| `insertAfter` | `(blockId: string, newBlockData: Omit<Block, 'id'>) => void` |
| `deleteBlock` | `(blockId: string) => void` |
| `getBlock`, `getPrevBlock`, `getNextBlock` | `(blockId: string) => Block \| undefined` |
| `focusNext`, `focusPrev` | `(currentBlockId: string) => void` |
| `register` | `(blockId: string, controller: BlockController) => void` |
| `unregister` | `(blockId: string) => void` |

`BlockController` requires `focus(direction: 'start' | 'end'): void` and optionally implements `focusAt(pos: number): void`. Custom editor components receive `id` and `data`, use the context API for updates, and should unregister their controllers when destroyed. `split` inserts generated-ID blocks after the referenced block; it is not a general replacement operation.

## Limitations

There is no public document schema validator, persistence adapter, history API, or readonly prop on `BlockEditor`; use `BlockView` for display. `BlockItem` relies on editor context and is not a replacement for the provider. Main components do not declare a `class` prop. Markdown and SVG previews inherit unsanitized HTML limitations: treat content as trusted or enforce an application-level safety policy. Link-card metadata assistance derives a domain/title and Google favicon URL, rather than fetching full page metadata; displaying that favicon can contact Google. Generated IDs use `crypto.randomUUID()`. These exports do not imply a stability guarantee.

Source: `src/lib/controls/editors/block-editor/index.ts`, `types.ts`, `context.ts`, main `.svelte` files, and `blocks/` exported editors/views.
