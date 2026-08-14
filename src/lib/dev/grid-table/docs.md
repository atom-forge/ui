# GridTable

Experimental data table rendered with CSS grid tracks instead of native table layout.

## Sizing model

Columns choose one of three sizing modes:

| Mode | Track | Behavior |
|------|-------|----------|
| `content` | `max-content` | Fits the widest header or cell content without truncating. |
| `truncate` | `minmax(minWidth, width \| max-content)` | May give up space down to its minimum and uses the column overflow behavior. |
| `fill` | `minmax(minWidth, 1fr)` | Fills remaining space. Prefer at most one fill column. |

`truncate` and `fill` columns default to `minWidth: '8rem'`. Override `minWidth`
per column when a tighter or wider collapse point is needed. The minimum prevents
flexible columns from collapsing to zero width while still allowing their content
to truncate.

If the visible column set has no `fill` column, GridTable promotes the last visible
`truncate` column to a temporary `fill` track. This keeps `no horizontal scroll`
layouts stable when users hide the configured fill column through column settings.

`content` columns are still measured by their content, but their painted content is
clipped to the cell boundary as a final guardrail so a stressed layout cannot draw
over neighboring cells.

## Horizontal overflow

GridTable allows horizontal scrolling by default when the column minimums cannot
fit inside the available width. Use `noScroll` to hide horizontal overflow and
force the configured truncation rules to handle the narrow layout.

In scrollable mode, the grid uses fit-content width with `min-width: 100%` so it
fills the viewport without creating tiny accidental overflow, but can still grow
when the column minimums genuinely need horizontal scrolling.

## Frame and dividers

Use `frameless` to remove only the outer table frame. It does not remove header
or row separators.

Use `dividers` to control internal row separation:

| Value | Behavior |
|-------|----------|
| `true` | Shows header and row divider borders. This is the default. |
| `false` | Removes internal divider borders. |
| `'alternate'` | Removes internal divider borders and uses alternating row backgrounds. |

## Interaction states

Hover effects are opt-in and can be enabled independently:

| Prop | Behavior |
|------|----------|
| `hoverCell` | Highlights only the hovered body cell. |
| `hoverRow` | Highlights every visible cell in the hovered body row. |
| `hoverColumn` | Highlights the header cell for the hovered column. |

Use `fixedFirstColumn` to keep the first visible column sticky while the table
scrolls horizontally. The header cell and body cells are layered separately. A
right border is added to the sticky column to separate it from horizontally
scrolling content.

When styling sticky columns, prefer opaque backgrounds. Opacity utilities
such as `bg-error/10` can show scrolled content through the sticky layer; use an
opaque token or `color-mix(..., var(--color-surface))` style instead.

Body cells render a vertically filling inner visual layer with `2px` inset and a
small radius. `rowStyle`, `column.style.cell`, and hover backgrounds are applied
to that inner layer instead of the outer grid cell. The outer cell keeps borders,
sticky positioning, and the opaque base background.

Hover backgrounds are rendered as a separate overlay inside the visual layer, so
they remain visible even when `rowStyle` or `column.style.cell` sets a custom
background through inline styles.

## Density

Use `compact` or `small` to reduce row height:

| Prop | Body visual layer | Text |
|------|-------------------|------|
| `compact` | `py-1.5` | `text-sm` |
| `small` | `py-1` | `text-xs` |

`small` takes precedence if both props are set.

## Sorting

Set `sortable: true` on a column to make its header clickable and keyboard
activatable. Use `bind:sort` to read or control the requested sort state:

```svelte
<GridTable
	bind:sort={sort}
	bind:columns={columns}
	data={rows}
	sortChange={(nextSort) => loadRows(nextSort)}
/>
```

`sort` is an ordered array of sort rules:

```ts
[
	{key: 'category', direction: 'asc'},
	{key: 'price', direction: 'asc'},
]
```

The first item is the primary sort, later items are secondary sorts. Clicking a
new sortable header adds it to the front as `ascending`. Clicking an active header
cycles that field through `ascending -> descending -> none`; when it remains
active, it moves to the front. GridTable renders Lucide sort markers and updates
`sort`, but it does not reorder `data` internally. Treat the change as a sort
request and handle it in the parent, for example by sorting a local array or
fetching new rows from an API. Only the primary sort is visually marked in the
header; secondary sorts remain in the request state but are not displayed.

## Feature parity target

Currently implemented:

- custom column sizing
- `formatter` and `snippet`
- `rowStyle`
- `rowClick`
- keyboard row activation from the first cell
- interactive-child click ignore
- `columnsEditable` through the existing table settings popup
- `fixed` columns hidden from the settings popup
- `hideHeader`, `frameless`, `dividers`, and `headerClass`
- horizontal overflow with `noScroll` opt-out
- independent cell, row, and column hover effects
- `fixedFirstColumn` for sticky first visible columns
- sortable header markers and controlled sort state
- `compact` and `small` density variants

Still experimental:

- ARIA div-based table semantics instead of native `<table>`
- no published package export
- no final public API guarantee
