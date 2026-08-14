# Organizer

A unit-based scheduling surface for dashboards, calendars, planners, and resource grids. Items are positioned with `x`, `y`, `w`, and `h` coordinates, can be dragged and resized, and can render fixed headers, row labels, custom cells, blocked regions, and overlap-aware layouts.

## Import

```sveltehtml
import { Organizer } from '@atom-forge/ui';
import type { OrganizerTypes } from '@atom-forge/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `OrganizerItem[]` | `[]` | Bindable item array. Use `bind:items` for drag and resize updates. |
| `item` | `Snippet<[OrganizerItemRendered]>` | — | Required item renderer. Receives the item plus computed render metadata. |
| `cols` | `number` | `12` | Number of horizontal units. |
| `rows` | `number` | — | Number of vertical units. When omitted, height grows from the item extents. |
| `rowHeight` | `number` | `50` | Pixel height for one vertical unit. |
| `draggable` | `boolean` | `true` | Enables drag-to-move. |
| `resizable` | `boolean \| 'vertical' \| 'horizontal'` | `true` | Enables resize handles. Use directional values to constrain resizing. |
| `allowOverlap` | `boolean` | `false` | Allows items to overlap in data. When false, invalid drops are rejected. |
| `overlapStrategy` | `OverlapStrategy` | `'compress'` | Controls how overlapping items are rendered. |
| `blocked` | `BlockedRegion[]` | `[]` | Regions that reject drops and render as blocked background areas. |
| `subdivisions` | `OrganizerSubdivisions` | `{}` | Unit-based marker rules for x/y axes. Adds `minor`, `major`, and `alternate` metadata to header and cell snippets. |
| `minColWidth` | `number` | `0` | Minimum pixel width per column. Enables horizontal scrolling when the grid is wider than its container. |
| `minW` | `number` | `1` | Minimum item width in units. |
| `maxW` | `number` | — | Maximum item width in units. |
| `minH` | `number` | `1` | Minimum item height in units. |
| `maxH` | `number` | — | Maximum item height in units. |
| `colHeader` | `Snippet<[OrganizerAxisMark]>` | — | Column header renderer. |
| `rowHeader` | `Snippet<[OrganizerAxisMark]>` | — | Row header renderer. |
| `rowHeaderWidth` | `number \| string` | — | Fixed row header width. Use this when the row header should not depend on content measurement. |
| `footer` | `Snippet` | — | Optional footer rendered below the scrollable grid body. |
| `cell` | `Snippet<[OrganizerCellMeta]>` | — | Background cell renderer. |
| `class` | `string` | `''` | Extra classes for the root element. |

## Types

```ts
type OrganizerItem = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  [key: string]: any;
};

type OrganizerItemRendered = OrganizerItem & {
  _lane: number;
  _laneCount: number;
  _renderLeft: string;
  _renderWidth: string;
  _renderTop?: string;
  _renderHeight?: string;
};

type OverlapStrategy = 'compress' | 'expand' | 'calendar' | 'calendar-v';

type BlockedRegion = {
  x: number;
  y: number;
  w: number;
  h: number;
};

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

## Basic Usage

```sveltehtml
<script lang="ts">
  import { Organizer } from '@atom-forge/ui';
  import type { OrganizerTypes } from '@atom-forge/ui';

  let items = $state<OrganizerTypes.OrganizerItem[]>([
    { id: 'a', x: 0, y: 0, w: 3, h: 2, title: 'Widget A' },
    { id: 'b', x: 3, y: 1, w: 2, h: 3, title: 'Widget B' },
  ]);
</script>

<Organizer bind:items cols={6} rowHeight={48}>
  {#snippet item(entry)}
    <div class="h-full w-full rounded border border-frame bg-surface p-2">
      {entry.title}
    </div>
  {/snippet}
</Organizer>
```

## Fixed Headers And Footer

Column headers and row headers are rendered outside the grid content and synced to the body scroll position. Set a constrained height on the organizer root when the body should scroll. Set `minColWidth` when columns need a minimum visual width and horizontal scrolling.

```sveltehtml
<Organizer
  bind:items={events}
  cols={7}
  rows={144}
  rowHeight={8}
  minColWidth={180}
  rowHeaderWidth={64}
  class="h-[520px] rounded border border-frame bg-surface"
>
  {#snippet colHeader(x)}
    <div class="border-b border-r border-frame bg-surface px-3 py-2 text-center text-xs font-semibold">
      {days[x.index]}
    </div>
  {/snippet}

  {#snippet rowHeader(y)}
    <div class="h-full w-full border-r border-frame bg-surface">
      {#if y.major}
        <span class="block pr-2 pt-1 text-right text-xs text-muted-contrast">
          {timeLabel(y.index)}
        </span>
      {/if}
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="border-t border-frame bg-surface px-4 py-2 text-xs text-muted-contrast">
      {events.length} events
    </div>
  {/snippet}

  {#snippet item(event)}
    <div class="h-full w-full rounded border border-frame bg-control p-2">
      {event.title}
    </div>
  {/snippet}
</Organizer>
```

## Unit-Based Subdivisions

Organizer does not need to know about minutes, dates, or resources. It works in units. For a calendar where one unit equals five minutes:

| Meaning | Rule |
|---------|------|
| 5-minute snap | one organizer unit |
| 15-minute guide | `minorEvery: 3` |
| 1-hour label/guide | `majorEvery: 12` |
| Hourly alternating background | `alternateEvery: 12` |

```sveltehtml
<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  const subdivisions = {
    y: {
      minorEvery: 3,
      majorEvery: 12,
      alternateEvery: 12,
    },
  };
</script>

<Organizer
  bind:items={events}
  rows={144}
  rowHeight={8}
  {subdivisions}
>
  {#snippet rowHeader(y)}
    <div class="h-full border-r border-frame bg-surface">
      {#if y.major}
        <span class="block pr-2 pt-1 text-right text-xs text-muted-contrast">
          {timeLabel(y.index)}
        </span>
      {/if}
    </div>
  {/snippet}

  {#snippet cell({ y })}
    <div
      class={twMerge(
        'h-full',
        y.alternate && 'bg-muted/20',
        y.major && y.index > 0 ? 'border-t border-frame' : y.minor && 'border-t border-frame/60',
      )}
    ></div>
  {/snippet}

  {#snippet item(event)}
    <div class="h-full w-full rounded border border-frame bg-control p-2">
      {event.title}
    </div>
  {/snippet}
</Organizer>
```

Subdivision rules are axis-agnostic. The same marker model can style vertical calendars, horizontal timelines, or two-dimensional resource grids.

## Overlap Strategies

### `compress`

The default strategy. Items keep their data positions and render in place. If items overlap, later items can visually stack above earlier ones.

### `calendar`

Calendar-style horizontal lane layout for items that overlap on the same starting column. Items keep their original `x`, `y`, `w`, and `h` values; `_renderLeft` and `_renderWidth` provide the adjusted visual lane.

### `calendar-v`

Vertical lane layout variant used when overlaps are resolved by vertical render metadata. It fills `_renderTop` and `_renderHeight`.

### `expand`

Reserved for future behavior. It is currently not implemented.

## Blocked Regions

Blocked regions reject drag and resize commits when the candidate item would overlap the region.

```sveltehtml
<script lang="ts">
  const blocked = [
    { x: 5, y: 0, w: 2, h: 24 },
    { x: 0, y: 132, w: 7, h: 12 },
  ];
</script>

<Organizer {blocked} bind:items cols={7} rows={144}>
  {#snippet item(event)}
    <div class="h-full w-full rounded border border-frame bg-control p-2">
      {event.title}
    </div>
  {/snippet}
</Organizer>
```

## Drag And Resize

Drag and resize operate in organizer units. If one unit means five minutes, then moving an item by one row moves it by five minutes. Use `resizable="vertical"` for calendar events where duration changes but column span should remain fixed.

```sveltehtml
<Organizer
  bind:items={events}
  cols={7}
  rows={144}
  rowHeight={8}
  resizable="vertical"
  minH={1}
  maxH={24}
>
  {#snippet item(event)}
    <div class="h-full w-full rounded border border-frame bg-control p-2">
      {event.title}
    </div>
  {/snippet}
</Organizer>
```

When `allowOverlap={false}`, a drop or resize that would collide with another item is cancelled. When `allowOverlap` is enabled, combine it with `overlapStrategy="calendar"` or custom item styling to make overlaps readable.

## Scroll Behavior

The grid body owns the native scroll position. Column and row headers live in separate layers and are visually synced to the body scroll position. This keeps the headers fixed while still supporting horizontal and vertical scrolling. The footer is outside the scroll body and remains fixed below it.

Use `rowHeaderWidth` for stable row header sizing when row labels are narrow or when the row header contains absolutely positioned marker labels.
