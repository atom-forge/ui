# TableEditor and TablePreview

Editable string-cell tables with row/column controls, headings, per-column decoration, and sum display. `TablePreview` renders the same data without the editing interface.

## Import

```ts
import { TableEditor, TablePreview, makeDefaultTableData,
  type TableData, type ColStyle } from '@atom-forge/ui';
```

## When to use

Use for an authored table embedded in content rather than a collection of domain records.

## Alternatives

Use [Table](../data/table.md) for record-oriented data presentation, or [BlockEditor](./block-editor.md) to include a table in a document.

## Setup

Apply [Getting Started](../../guides/getting-started.md) CSS. `TableEditor` creates its own popup manager/container for editor settings. Clipboard and drag interactions require the browser.

## Minimal example

```sveltehtml
<script lang="ts">
  import { TableEditor, TablePreview, makeDefaultTableData, type TableData } from '@atom-forge/ui';
  let table = $state<TableData>(makeDefaultTableData());
</script>

<TableEditor value={table} onchange={(next) => table = next}/>
<TablePreview data={table}/>
```

## Behavior

The editor maintains local table data and synchronizes it when `value` changes. Cell edits and structural/settings changes call `onchange`. The default helper creates four rows of four empty strings and four default column styles, with all heading/sum flags off. The editor supports clipboard table text via SheetClip and row drag interactions.

## API

| Export | Public surface |
|---|---|
| `TableEditor` | Optional `value: TableData` (declared bindable, default helper result), `onchange: (value: TableData) => void`. |
| `TablePreview` | Required `data: TableData \| null`. |
| `makeDefaultTableData` | `() => TableData`. |
| `ColStyle` | `{ align: 'left' \| 'center' \| 'right'; prefix: string; postfix: string; sumDecorator: boolean }`. |
| `TableData` | `{ rows: string[][]; colStyles: ColStyle[]; headingRow: boolean; headingCol: boolean; sumRow: boolean; sumCol: boolean }`. |

## Limitations

The save function updates local data and calls `onchange`, not the `value` prop. Binding alone is not a persistence mechanism despite the bindable declaration. Supply matching column styles for your row dimensions; the default helper is the safest starting point. This is not a formula engine, database grid, or typed record table. Cells are strings. No declared `class`, readonly, validation, or disabled props exist; use `TablePreview` for read-only presentation.

Source: `src/lib/controls/editors/table-editor/{index.ts,types.ts,helpers.ts,TableEditor.svelte,TablePreview.svelte}`.
