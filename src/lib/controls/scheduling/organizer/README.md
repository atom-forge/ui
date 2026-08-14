# Organizer

A flexible, grid-based layout component for building interactive dashboards, schedulers, and calendar views. Items are positioned by coordinates (`x`, `y`, `w`, `h`) and can be freely dragged and resized.

## Files

```
src/organizer/
  Organizer.svelte   — main component
  types.ts           — OrganizerItem, OrganizerItemRendered, OverlapStrategy
  layout.ts          — calendar layout algorithm (conflict groups → lanes)
  README.md          — this file

src/routes/organizer/
  +page.svelte       — interactive demo (weekly calendar)
```

---

## Basic usage

```svelte
<script>
  import Organizer from '$organizer/Organizer.svelte';

  let items = $state([
    { id: 'a', x: 0, y: 0, w: 4, h: 2, title: 'Widget A' },
    { id: 'b', x: 4, y: 0, w: 2, h: 1, title: 'Widget B' },
  ]);
</script>

<Organizer bind:items cols={6} rowHeight={60}>
  {#snippet item(entry)}
    {@const title = entry.title}
    <div class="h-full w-full p-2 bg-control border border-base-b rounded">
      {title}
    </div>
  {/snippet}
</Organizer>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `OrganizerItem[]` | `[]` | Array of items. Use `bind:items` for two-way binding. |
| `item` | `Snippet<[OrganizerItemRendered]>` | — | **(Required)** Snippet for rendering each item. |
| `cols` | `number` | `12` | Number of grid columns. |
| `rows` | `number` | — | Number of rows. If omitted, height grows dynamically from item positions. |
| `rowHeight` | `number` | `50` | Height of one row in pixels. |
| `draggable` | `boolean` | `true` | Enable drag-to-move. |
| `resizable` | `boolean` | `true` | Enable resize from the bottom-right corner. |
| `allowOverlap` | `boolean` | `false` | If `false`, a drop is rejected when it would cause overlap. |
| `overlapStrategy` | `OverlapStrategy` | `'compress'` | How overlapping items are rendered. See below. |
| `subdivisions` | `OrganizerSubdivisions` | `{}` | Unit-based marker rules for x/y axes. Adds `minor`, `major`, and `alternate` metadata to header and cell snippets. |
| `minColWidth` | `number` | `0` | Minimum width for each column in pixels. Enables horizontal body scrolling when the grid is wider than the container. |
| `colHeader` | `Snippet<[OrganizerAxisMark]>` | — | Snippet for column headers (rendered above the grid). |
| `rowHeader` | `Snippet<[OrganizerAxisMark]>` | — | Snippet for row headers (rendered to the left of the grid). |
| `rowHeaderWidth` | `number \| string` | — | Fixed row header column width. Use this when the row header must stay visually stable during scroll. |
| `footer` | `Snippet` | — | Optional footer rendered below the scrollable grid body. |
| `cell` | `Snippet<[OrganizerCellMeta]>` | — | Snippet for individual cell backgrounds. |
| `class` | `string` | `''` | Extra CSS classes on the root element. |

---

## Types

```ts
type OrganizerItem = {
  id: string;
  x: number;          // column index (0-based)
  y: number;          // row index (0-based)
  w: number;          // width in columns
  h: number;          // height in rows
  [key: string]: any; // any extra data fields
};

// Passed to the `item` snippet — extends OrganizerItem with layout metadata
type OrganizerItemRendered = OrganizerItem & {
  _lane: number;        // 0-based lane index within the conflict group
  _laneCount: number;   // total lanes in the conflict group (1 = no overlap)
  _renderLeft: string;  // CSS left value (%)
  _renderWidth: string; // CSS width value (%)
};

type OverlapStrategy = 'compress' | 'expand' | 'calendar';

type OrganizerSubdivision = {
  minorEvery?: number;
  majorEvery?: number;
  alternateEvery?: number;
  offset?: number;
};

type OrganizerSubdivisions = {
  x?: OrganizerSubdivision;
  y?: OrganizerSubdivision;
};

type OrganizerAxisMark = {
  index: number;
  minor: boolean;
  major: boolean;
  alternate: boolean;
};

type OrganizerCellMeta = {
  x: OrganizerAxisMark;
  y: OrganizerAxisMark;
};
```

---

## `overlapStrategy`

### `'compress'` (default)
Overlapping items stack on top of each other via z-index. The item rendered last appears on top.

### `'expand'`
Not yet implemented. Reserved for future use — would grow the container height to accommodate overlapping items vertically.

### `'calendar'`
Google Calendar-style side-by-side layout for overlapping items within the same column.

**Algorithm:**
1. Items are grouped by starting column (`x`).
2. Within each column, **conflict groups** are found using DFS on the overlap graph — only items that directly or transitively overlap are grouped together. Isolated items form their own group of one.
3. Within each group, lanes are assigned greedily (sorted by `y`): each item gets the first lane whose previous occupant has already ended.
4. `laneCount` = number of lanes in the group = maximum simultaneous overlap at any row.
5. Each item's rendered width is `w/cols/laneCount` and its left offset is shifted by `lane × itemWidth`.

The original `x`, `y`, `w`, `h` values are **never mutated** — layout is computed purely for rendering.

---

## Calendar example

```svelte
<script>
  import Organizer from '$organizer/Organizer.svelte';

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const startHour = 8;
  const rowHeight = 44;

  const subdivisions = {
    y: { minorEvery: 3, majorEvery: 12, alternateEvery: 12 }
  };

  function timeLabel(unit) {
    const totalMinutes = startHour * 60 + unit * 5;
    const h = Math.floor(totalMinutes / 60);
    const m = String(totalMinutes % 60).padStart(2, '0');
    return `${h}:${m}`;
  }

  let events = $state([
    { id: '1', x: 0, y: 2, w: 1, h: 4, title: 'Team Standup',  color: '#3b82f6' },
    { id: '2', x: 0, y: 4, w: 1, h: 3, title: 'Design Review', color: '#a855f7' },
    { id: '3', x: 1, y: 2, w: 1, h: 5, title: 'Project Work',  color: '#f59e0b' },
    { id: '4', x: 1, y: 3, w: 1, h: 3, title: '1:1 Meeting',   color: '#f43f5e' },
  ]);
</script>

<Organizer
  bind:items={events}
  cols={5}
  rows={20}
  {rowHeight}
  {subdivisions}
  allowOverlap
  overlapStrategy="calendar"
>
  {#snippet colHeader(x)}
    <div class="text-center font-semibold py-2 border-b border-base-b">{days[x.index]}</div>
  {/snippet}

  {#snippet rowHeader(y)}
    <div class="w-12 text-right pr-2 text-xs text-muted-c" style="height:{rowHeight}px">
      {#if y.major}{timeLabel(y.index)}{/if}
    </div>
  {/snippet}

  {#snippet cell({ x, y })}
    <div class="h-full border-r border-base-b {y.major ? 'border-t' : y.minor ? 'border-t opacity-60' : ''} {y.alternate ? 'bg-muted/20' : ''}"></div>
  {/snippet}

  {#snippet item(ev)}
    {@const isNarrow = ev._laneCount > 1}
    {@const title = ev.title}
    {@const color = ev.color}
    <div
      class="h-full w-full rounded text-white text-xs p-1 overflow-hidden"
      style="background-color:{color}; margin:1px; width:calc(100%-2px); height:calc(100%-2px)"
    >
      <span class="font-semibold truncate block">{title}</span>
      {#if !isNarrow}
        <span class="opacity-75">{ev.y / 2 + 8}:00</span>
      {/if}
    </div>
  {/snippet}
</Organizer>
```

## Fixed header and footer

Column headers stay pinned to the top of the scrollable body. Row headers stay
pinned to the left edge during horizontal scrolling. The optional footer is
rendered outside the scrollable body. Set a constrained height on the organizer
root when the body should scroll, and set `minColWidth` when columns need a
minimum visual width. Set `rowHeaderWidth` when the left header column should
not depend on content measurement.

```sveltehtml
<Organizer
  bind:items={events}
  cols={5}
  rows={24}
  rowHeight={44}
  subdivisions={{ y: { minorEvery: 3, majorEvery: 12, alternateEvery: 12 } }}
  minColWidth={160}
  rowHeaderWidth={64}
  class="h-96 border border-frame"
>
  {#snippet colHeader(x)}
    <div class="border-b border-frame py-2 text-center text-xs font-medium">
      {days[x.index]}
    </div>
  {/snippet}

  {#snippet rowHeader(y)}
    <div class="w-12 pr-2 text-right text-xs text-muted-contrast">
      {#if y.major}{timeLabel(y.index)}{/if}
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="border-t border-frame px-3 py-2 text-xs text-muted-contrast">
      {events.length} events
    </div>
  {/snippet}

  {#snippet item(ev)}
    <div class="h-full w-full border border-frame bg-surface p-2">
      {ev.title}
    </div>
  {/snippet}
</Organizer>
```

---

## Drag & resize behaviour

- **Drag**: click and hold anywhere on an item, then move. A ghost outline snaps to the nearest grid cell. On mouse-up the item commits to the new position.
- **Resize**: click and hold the small grip handle in the bottom-right corner. Minimum size: `w=1, h=1`.
- **`allowOverlap=false`**: if the committed position would overlap another item, the drag/resize is silently cancelled and the item snaps back.
- Touch events are not currently supported (mouse only).

---

## Limitations & known issues

- `overlapStrategy='expand'` is not implemented.
- `allowOverlap=false` cancels the drop instead of pushing other items away.
- No keyboard navigation for drag/resize.
- No touch/pointer support (mouse events only).
- Calendar lane assignment uses starting column `x` only — multi-column items (`w > 1`) are treated as belonging to their starting column for conflict detection purposes.
