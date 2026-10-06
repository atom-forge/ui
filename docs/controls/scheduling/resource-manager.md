# ResourceManager

Resource/project allocation timeline with stacked allocation lanes and create/move/resize interactions.

## Import

```ts
import { ResourceManager, type ResourceManagerTypes } from '@atom-forge/ui';
```

## When to use

Use to assign project date ranges to people or other named resources.

## Alternatives

Use [GanttChart](./gantt.md) for task hierarchies/dependencies, [Calendar](./calendar.md) for event dates, or [Table](../data/table.md) for a noninteractive allocation list.

## Setup

Apply [Getting Started](../../guides/getting-started.md) CSS. Resource/project IDs must match those in allocations. Use `YYYY-MM-DD` dates and a sized container. The component creates its internal context.

## Minimal example

```sveltehtml
<script lang="ts">
  import { ResourceManager, type ResourceManagerTypes } from '@atom-forge/ui';
  const resources: ResourceManagerTypes.RMResource[] = [{ id: 'alex', name: 'Alex', role: 'Designer' }];
  const projects: ResourceManagerTypes.RMProject[] = [{ id: 'website', name: 'Website', color: '#2563eb' }];
  const allocations: ResourceManagerTypes.RMAllocation[] = [
    { id: 'a1', resourceId: 'alex', projectId: 'website', startDate: '2026-10-06', endDate: '2026-10-09' }
  ];
  let latest = $state<ResourceManagerTypes.RMAllocation[]>(allocations);
</script>

<ResourceManager {resources} {projects} {allocations}
  rangeStart="2026-10-01" rangeEnd="2026-10-31"
  onchange={(next) => latest = next} class="h-[480px]"/>
<p>{latest.length} allocations in the latest snapshot.</p>
```

## Behavior

Initial allocations, date range, and workday rules are copied into an internal context. The first supplied project is initially active. Resources, projects, and `viewOnly` synchronize subsequently. Changes to internal allocations call `onchange`, including an initial notification. The timeline stacks overlapping allocations into lanes.

## API

| Prop | Type | Default |
|---|---|---|
| `resources` | `ResourceManagerTypes.RMResource[]` | `[]` |
| `projects` | `ResourceManagerTypes.RMProject[]` | `[]` |
| `allocations` | `ResourceManagerTypes.RMAllocation[]` | `[]` |
| `viewOnly` | `boolean` | `false` |
| `workdays` | `string` of weekday digits, Sunday `0` | `'12345'` |
| `extraRest`, `extraWork` | `string[]` of dates | `[]` |
| `rangeStart`, `rangeEnd` | `string` dates | Internal today range; end defaults to start + 30 days |
| `class` | `string` | — |
| `onchange` | `(allocations: ResourceManagerTypes.RMAllocation[]) => void` | — |

### Public types

- `RMResource`: required `id`, `name`; optional `role`, `avatar` (image URL), all strings.
- `RMProject`: required `id`, `name`; optional `color`, all strings.
- `RMAllocation`: required string `id`, `resourceId`, `projectId`, `startDate`, `endDate`.
- `LanedAllocation`: `{ alloc: RMAllocation; lane: number }`.
- `ResourceRow`: `{ resource: RMResource; laned: LanedAllocation[]; laneCount: number; rowHeight: number; offsetY: number }`.
- `DragState`: `null`, move/resize objects (`type: 'move' | 'resize-right' | 'resize-left'`, `allocId`, `startX`, `originalStart`, `originalEnd`), or creation object (`type: 'create'`, `resourceId`, `startX`, `startDate`, `endDate`). ID/date fields are strings; coordinates are numbers.

## Limitations

`allocations` is not bindable and later prop replacements are not synchronized. Date ranges and workday rules are initialization-only too; remount for a replacement dataset/configuration. Save outgoing snapshots through `onchange` rather than expecting a controlled component. There is no persistence adapter, capacity/effort field, or conflict-validation callback in the public props. Resources/projects are required for meaningful creation. Avatar URLs may make external network requests. Internal contexts and toolbars are not exported by this module.

Source: `src/lib/controls/scheduling/resource-manager/{index.ts,rm.types.ts,ResourceManager.svelte}` and internal context/components.
