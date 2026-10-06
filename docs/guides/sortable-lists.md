# Compose sortable lists

Use stable item identities and bound arrays to compose reorderable queues or flat boards. Treat a completed drag as a local state change, not as a persisted transaction.

## Select by task

| Task | Compose | Decision |
|---|---|---|
| Reorder one queue | [SortableList](../controls/data/sortable.md) | Bind `items`; provide an `item` snippet. |
| Transfer between lanes | SortableGroup + uniquely identified SortableLists | All exchanging items need globally unique IDs. |
| Keep row actions separate from dragging | SortableList with `dragHandleSelector` | Provide a matching, meaningfully labelled handle. |
| Reorder tiles | SortableList with `orientation="grid"` | Supply tile sizing and spacing. |
| Explain an empty lane | SortableList `empty` prop | Provide its required icon and title; preserve a usable drop area. |
| Move hierarchical nodes | [Tree](../controls/layout/tree.md) | Do not model hierarchy as unrestricted flat transfers. |
| Drag scheduled items by coordinates | [Organizer](../controls/scheduling/organizer.md) | Different interaction and data contract from list ordering. |

## Setup

Use Svelte 5 and the theme/Tailwind 4 library scan from [Getting Started](getting-started.md#css-setup). SortableList does **not** require Root. SortableGroup supplies the only context needed for cross-list transfer. Root may still wrap the surrounding application for other controls.

## Recipe: move tasks between two lanes

Complete component with reactive lane arrays, typed row snippets, handle-only dragging, and a local change notification. No external save function is assumed.

```sveltehtml
<script lang="ts">
  import { Button, SortableGroup, SortableList } from '@atom-forge/ui';
  import { Inbox } from 'lucide-svelte';

  type Task = { id: string; title: string };

  let todo = $state<Task[]>([
    { id: 'task-1', title: 'Plan' },
    { id: 'task-2', title: 'Design' },
  ]);
  let doing = $state<Task[]>([{ id: 'task-3', title: 'Build' }]);
  let changes = $state(0);
  let lastChangedLane = $state('');

  function changed(lane: string) {
    changes += 1;
    lastChangedLane = lane;
  }
</script>


<SortableGroup class="grid grid-cols-1 gap-4 md:grid-cols-2">
  <section aria-label="To do">
    <h2>To do</h2>
    <SortableList
      id="todo"
      bind:items={todo}
      dragHandleSelector="[data-handle]"
      class="min-h-40 gap-2"
      empty={{ icon: Inbox, title: 'No tasks to do' }}
      onchange={() => changed('To do')}
    >
      {#snippet item(task)}
        <div class="flex items-center gap-2 rounded border border-frame bg-control p-3">
          <Button type="button" ghost compact data-handle label={`Move ${task.title}`} class="cursor-grab"/>
          <span>{task.title}</span>
        </div>
      {/snippet}
    </SortableList>
  </section>
  <section aria-label="Doing">
    <h2>Doing</h2>
    <SortableList
      id="doing"
      bind:items={doing}
      dragHandleSelector="[data-handle]"
      class="min-h-40 gap-2"
      empty={{ icon: Inbox, title: 'Nothing in progress' }}
      onchange={() => changed('Doing')}
    >
      {#snippet item(task)}
        <div class="flex items-center gap-2 rounded border border-frame bg-control p-3">
          <Button type="button" ghost compact data-handle label={`Move ${task.title}`} class="cursor-grab"/>
          <span>{task.title}</span>
        </div>
      {/snippet}
    </SortableList>
  </section>
</SortableGroup>
<p role="status">{changes ? `Local list updates: ${changes}. Last changed: ${lastChangedLane}.` : 'Move a task to update the board.'}</p>
```

The native button rendered by [Button](../controls/general/button.md) receives `data-handle`, which matches the selector. The dependency supplies drag-handle interaction; test pointer and keyboard operation in your consuming app. The counter counts **list notifications**, not drag gestures: transfer can update both lanes.

For a single queue, omit SortableGroup and keep one uniquely identified SortableList. Independent ungrouped lists must also have distinct list IDs; identical IDs share a DnD type and can exchange items unintentionally.

## Application responsibilities

- Persist order and lane membership from `onchange(nextItems, detail)` with explicit error handling, retry, and rollback. Bound arrays are assigned before this callback; it is not a cancellable validation hook.
- For a board, coordinate notifications and persist a consistent whole-board snapshot rather than assuming one lane callback represents an atomic cross-list transaction.
- Keep IDs stable and unique across all exchanging zones. Never use the current array index as item identity.
- Do not assume `SortableGroup.rules` or `typeField` enforces allowed transfers: the current SortableList implementation does not use that legacy rule engine. Enforce permissions/restrictions in application design; choose a different interaction if invalid drops must be prevented.
- Handle transfer details defensively: `fromIndex` or `toIndex` can be `-1` in the entering/leaving list; callbacks fire only when membership/order changes, not on every hover.
- There is no dedicated disabled prop, and legacy preview props are compatibility-only. Own pending-state restrictions, undo, concurrency, and an alternative non-drag move workflow where required.
