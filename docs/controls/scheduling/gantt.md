# GanttChart

Hierarchical task timeline with date bars, progress, dependencies, and move/resize interactions.

## Import

```ts
import { GanttChart, type GanttTypes } from '@atom-forge/ui';
```

## When to use

Use to display and interactively adjust date ranges for project tasks.

## Alternatives

Use [Calendar](./calendar.md) for a month/event view, [ResourceManager](./resource-manager.md) for allocation lanes, or [Timeline](../data/timeline.md) for sequential presentation.

## Setup

Apply [Getting Started](../../guides/getting-started.md) CSS. Provide unique task IDs and `YYYY-MM-DD` dates. Give the component a usable height through `class`. It creates its own internal scheduling context.

## Minimal example

```sveltehtml
<script lang="ts">
  import { GanttChart, type GanttTypes } from '@atom-forge/ui';
  const initialTasks: GanttTypes.GanttTask[] = [
    { id: 'design', label: 'Design', startDate: '2026-10-05', endDate: '2026-10-09', progress: 50 },
    { id: 'build', label: 'Build', startDate: '2026-10-12', endDate: '2026-10-16', dependencies: ['design'] }
  ];
  let latestTasks = $state<GanttTypes.GanttTask[]>(initialTasks);
</script>

<GanttChart tasks={initialTasks} onchange={(next) => latestTasks = next} class="h-[480px]"/>
<p>{latestTasks.length} tasks in the latest snapshot.</p>
```

## Behavior

Tasks initialize an internal context once. The component observes that context and calls `onchange` with its current task array, including an initial notification. `viewOnly` is synchronized after initialization. The toolbar and task list operate on the internal context, not an externally controlled task list.

## API

| Prop | Type | Default |
|---|---|---|
| `tasks` | `GanttTypes.GanttTask[]` (declared bindable) | `[]` |
| `viewOnly` | `boolean` | `false` |
| `workdays` | `string` of weekday digits, Sunday `0` | `'12345'` |
| `extraRest`, `extraWork` | `string[]` of dates | `[]` |
| `class` | `string` | — |
| `onchange` | `(tasks: GanttTypes.GanttTask[]) => void` | — |

`GanttTask` requires string `id`, `label`, `startDate`, `endDate`; optional `progress: number` (0–100), `color: string`, `children: GanttTask[]`, `dependencies: string[]` (task IDs).

The namespace also exports implementation-shaped types: `FlatTask` has `task`, `depth`, `parentId: string | null`, `hasChildren`, `index`; `DragState` is `null` or a `move`, `resize-left`, or `resize-right` object with `taskId`, `startX`, `originalStart`, `originalEnd`. These are not component props or a public context-manager API.

## Limitations

Changing `tasks`, workday rules, or exception arrays after mounting does not reinitialize/synchronize the context. Remount (for example with a Svelte keyed block) to load a replacement dataset. Do not rely on `bind:tasks` as an outgoing state channel; use `onchange`. Persistence is application-owned. Dependency data is not a promise of project constraint solving or automatic scheduling. Pointer-driven editing requires browser interaction; there is no public task-edit manager export.

Source: `src/lib/controls/scheduling/gantt/{index.ts,gantt.types.ts,GanttChart.svelte}` and internal context/components.
