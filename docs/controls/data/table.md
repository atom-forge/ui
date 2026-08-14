# Table

A generic, type-safe data table with sticky headers, column visibility control, custom cell rendering, and per-row/per-cell styling.

## Import

```sveltehtml
import { Table, type ColumnDef } from '@atom-forge/ui';
```

---

## Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | — | Row data array. `T` must extend `Record<string, any>`. |
| `columns` | `ColumnDef<T>[]` | — | Bindable column definitions. |
| `rowStyle` | `string \| StylingFn<T>` | — | Static class string or function returning classes/styles per row. |
| `rowClick` | `(row, table, index, event) => void` | — | Optional row click handler. Rows become keyboard-focusable and activate on Enter/Space. Clicks on interactive child elements are ignored. |
| `columnsEditable` | `boolean` | `false` | Enables a right-click context menu on the header to toggle column visibility. |
| `frameless` | `boolean` | `false` | Removes the outer frame, rounded wrapper, and row dividers for embedded table layouts. |
| `hideHeader` | `boolean` | `false` | Omits the table header. When enabled, `columnsEditable` has no header target to open from. |
| `noScroll` | `boolean` | `false` | Prevents horizontal table scrolling. Column widths are treated as relative weights so all visible columns fit inside the wrapper. |
| `layout` | `'fixed' \| 'auto'` | `'fixed'` | Controls the table layout algorithm. Fixed layout is predictable for dashboards; auto layout follows content more closely. |
| `overflow` | `'ellipsis' \| 'wrap' \| 'clip'` | `'ellipsis'` | Default overflow behavior for header and body cells. Columns can override it. |
| `headerClass` | `string` | — | Extra Tailwind classes applied to every header `<th>`, before per-column `style.header` classes. |
| `class` | `string` | — | Extra Tailwind classes on the wrapper, merged via `twMerge`. |

---

## ColumnDef

```ts
type ColumnDef<T> = {
  key: keyof T;           // Data key to read from each row
  label: string;          // Column header text
  visible?: boolean;      // Defaults to true
  fixed?: boolean;        // Prevents hiding; receives protected width priority in noScroll mode
  width?: string;         // CSS width, e.g. "8rem", "20ch", "30%"
  minWidth?: string;      // CSS min-width
  maxWidth?: string;      // CSS max-width
  overflow?: TableOverflow;
  grow?: true;            // Leaves the column fluid so it can take remaining width
  shrink?: true;          // Column shrinks to fit content
  style?: ColumnStyling<T>;
  formatter?: (row: T, table: T[], index: number) => string | number;
  snippet?: Snippet<[T]>;
};
```

`formatter` and `snippet` are mutually exclusive.

---

## ColumnStyling

```ts
type ColumnStyling<T> = {
  header?: string;                          // Tailwind classes on <th>
  cell?: string | StylingFn<T>;            // Static class or function
};

type StylingFn<T> = (row: T, table: T[], index: number) => StylingResult;
type StylingResult = string | { class?: string; style?: string };
type TableOverflow = 'ellipsis' | 'wrap' | 'clip';
```

---

## Usage

```sveltehtml
<script>
  import { Table, type ColumnDef } from '@atom-forge/ui';

  type User = { id: number; name: string; role: string; active: boolean };

  const data: User[] = [
    { id: 1, name: 'Alice', role: 'Admin', active: true },
    { id: 2, name: 'Bob',   role: 'User',  active: false },
  ];

  let columns: ColumnDef<User>[] = [
    { key: 'id',     label: 'ID',    shrink: true },
    { key: 'name',   label: 'Name',  grow: true },
    { key: 'role',   label: 'Role',
      style: { cell: (row) => row.role === 'Admin' ? 'font-bold text-accent' : '' }
    },
    { key: 'active', label: 'Active',
      snippet: activeCellSnippet,
    },
  ];
</script>

{#snippet activeCellSnippet(row)}
  <Chip color={row.active ? 'green' : 'base'}>
    {row.active ? 'Active' : 'Inactive'}
  </Chip>
{/snippet}

<Table {data} bind:columns class="max-h-96"/>
```

### Row styling

```sveltehtml
<Table
  {data}
  bind:columns
  rowStyle={(row) => row.active ? '' : 'opacity-50'}
/>
```

### Row clicks

```sveltehtml
<Table
  {data}
  bind:columns
  rowClick={(row) => openUser(row)}
/>
```

When `rowClick` is provided, rows use pointer affordance and can be activated with Enter or Space. Clicks inside buttons, links, form controls, labels, or elements marked with `data-table-row-click-ignore` do not trigger the row handler.

### Header styling

Use `headerClass` to style every header cell. Use `style.header` on a column to override or extend a single header cell.

```sveltehtml
<Table
  {data}
  bind:columns
  headerClass="bg-surface-primary normal-case text-muted-contrast"
/>
```

```ts
let columns: ColumnDef<User>[] = [
  {
    key: 'id',
    label: 'ID',
    shrink: true,
    style: {
      header: 'text-right'
    }
  },
  { key: 'name', label: 'Name', grow: true },
];
```

Header classes are merged in this order: default header classes, `headerClass`, then `column.style.header`.

### Column sizing

Use `width`, `minWidth`, and `maxWidth` to control narrow and wide columns. The sizing is applied through a `<colgroup>` and repeated on cells, so it also works when `hideHeader` is enabled.

```sveltehtml
<script>
  let columns: ColumnDef<User>[] = [
    { key: 'id', label: 'ID', width: '6rem', shrink: true },
    { key: 'name', label: 'Name', minWidth: '16rem', grow: true },
    { key: 'email', label: 'Email', width: '24ch' },
    { key: 'notes', label: 'Notes', minWidth: '22rem' },
  ];
</script>

<Table {data} bind:columns />
```

`shrink` maps to `width: 1%` when no explicit `width` is provided. `grow` leaves the column fluid; in fixed layout, fluid columns divide the remaining width after fixed-width columns.

### No-scroll layout

Use `noScroll` when the table must always fit horizontally inside its wrapper. In this mode, column `width`, `minWidth`, `shrink`, and `grow` values are converted into relative weights instead of absolute constraints. `noScroll` uses fixed table layout internally, even if `layout="auto"` is also passed.

```sveltehtml
<Table
  {data}
  bind:columns
  noScroll
/>
```

```ts
let columns: ColumnDef<User>[] = [
  { key: 'id', label: 'ID', width: '5rem', overflow: 'clip' },
  { key: 'name', label: 'Name', width: '18rem', overflow: 'ellipsis' },
  { key: 'notes', label: 'Notes', minWidth: '28rem', overflow: 'wrap' },
];
```

In the example above, `notes` receives the largest share, `name` receives a medium share, and `id` stays narrow. The table remains `width: 100%` with no horizontal scroll; overflow is handled inside cells.

Set `fixed: true` on key columns that must remain readable. In `noScroll` mode, fixed columns receive protected width priority in addition to being locked in the column visibility menu.

```ts
let columns: ColumnDef<User>[] = [
  { key: 'id', label: 'ID', fixed: true, width: '7ch', shrink: true },
  { key: 'name', label: 'Name', minWidth: '18rem', grow: true },
  { key: 'status', label: 'Status', width: '8rem' },
];
```

### Overflow behavior

Cells use ellipsis by default. Set `overflow` on the table to change the default, or on a column to override one column.

```sveltehtml
<Table
  {data}
  bind:columns
  overflow="wrap"
/>
```

```ts
let columns: ColumnDef<User>[] = [
  { key: 'name', label: 'Name', width: '12rem', overflow: 'ellipsis' },
  { key: 'notes', label: 'Notes', minWidth: '24rem', overflow: 'wrap' },
  { key: 'code', label: 'Code', width: '10rem', overflow: 'clip' },
];
```

Available values:

| Value | Behavior |
|-------|----------|
| `'ellipsis'` | Single-line content with hidden overflow and an ellipsis. |
| `'wrap'` | Multi-line content that wraps inside the cell. |
| `'clip'` | Single-line content with hidden overflow and no ellipsis. |

### Layout

The default `fixed` layout keeps column widths predictable. Use `auto` when content should influence the table width more strongly.

```sveltehtml
<Table
  {data}
  bind:columns
  layout="auto"
/>
```

### Frameless

Use `frameless` when the table is embedded inside another surface and should not draw its own frame or row dividers.

```sveltehtml
<Table
  {data}
  bind:columns
  frameless
/>
```

### Hidden header

Use `hideHeader` for compact lists where the surrounding UI already explains the columns.

```sveltehtml
<Table
  {data}
  bind:columns
  hideHeader
/>
```

When `hideHeader` is enabled, `columnsEditable` cannot be opened from the header. Provide a separate external control if users still need to edit column visibility.

### Editable columns

```sveltehtml
<Table {data} bind:columns columnsEditable/>
```

Right-click the header to show the column visibility popup.

---

## Column visibility

Set `visible: false` in a column definition to hide it initially. Set `fixed: true` to prevent the user from toggling it via the settings popup.
