# Sortable (DnD)

Drag-and-drop sortable lists built on
[`svelte-dnd-action`](https://github.com/isaacHagoel/svelte-dnd-action). Supports
single-list reordering, grouped cross-list transfer, handle-only dragging,
animated placement previews, and a bindable Svelte-friendly list API.

## Import

```sveltehtml
import { SortableList, SortableGroup } from '@atom-forge/ui';
```

Items must have a unique `id: string | number` field.

---

## SortableList

`SortableList` is the primary API. In the common case, use `bind:items`; the
component writes the final order back after drop.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | `[]` | Bindable array of items. Updated on drop. |
| `id` | `string` | `'default-list'` | Identifier for this list. Use unique ids inside a `SortableGroup`. |
| `item` | `Snippet<[T]>` | — | Snippet rendered for each item. |
| `orientation` | `'vertical' \| 'horizontal' \| 'grid'` | `'vertical'` | Controls list direction and default placement indicator orientation. |
| `grabbedClass` | `string` | `'shadow-xl opacity-95 scale-[1.01]'` | Tailwind classes added to the actively dragged element. |
| `draggingClass` | `string` | `'opacity-35'` | Tailwind classes applied to the source item while it is dragged. |
| `dropIndicatorClass` | `string` | — | Tailwind classes added to the shadow/placement item wrapper. Ignored when not needed by the chosen indicator. |
| `dragHandleSelector` | `string` | — | CSS selector for a handle inside each item. Drag starts only from matching elements. |
| `flipDurationMs` | `number` | `160` | Duration for Svelte `animate:flip` list movement. |
| `onchange` | `(items, detail) => void` | — | Called after a successful reorder or transfer, only when item order changed. |
| `dropIndicator` | `Snippet<[T \| undefined]>` | — | Custom placement indicator snippet. Rendered for the temporary shadow item. |
| `empty` | `{ icon, title, description? }` | — | Shown via `EmptyState` when the list is empty. |
| `class` | `string` | — | Added to the list wrapper `<div>`. |
| `preservePreviewSize` | `boolean` | `true` | Compatibility prop from the previous implementation. Currently retained for API stability. |
| `previewOffset` | `(args) => {x, y}` | — | Compatibility prop from the previous implementation. Currently retained for API stability. |

### Change detail

`onchange` receives the next items array and a detail object:

```ts
type SortableChangeDetail<T extends { id: string | number }> = {
  items: T[];
  previousItems: T[];
  item: T | undefined;
  itemId: string | number;
  fromIndex: number;
  toIndex: number;
  trigger: string;
  source: string;
};
```

Use `bind:items` when the component should own the local reorder. Add
`onchange` when the parent also needs to persist, validate, or react to the
change.

### Basic usage

```sveltehtml
<script lang="ts">
  import { SortableList } from '@atom-forge/ui';

  let tasks = $state([
    { id: 1, title: 'Design' },
    { id: 2, title: 'Develop' },
    { id: 3, title: 'Test' },
  ]);
</script>

<SortableList bind:items={tasks} class="gap-2">
  {#snippet item(task)}
    <div class="rounded border border-frame bg-control p-3">
      {task.title}
    </div>
  {/snippet}
</SortableList>
```

### React to changes

```sveltehtml
<SortableList
  bind:items={tasks}
  onchange={(nextTasks, detail) => {
    console.log('moved', detail.itemId, detail.fromIndex, detail.toIndex);
    saveOrder(nextTasks.map(task => task.id));
  }}
>
  {#snippet item(task)}
    <div class="rounded border border-frame bg-control p-3">
      {task.title}
    </div>
  {/snippet}
</SortableList>
```

`onchange` is fired after finalize/drop, not on every hover movement.

### Drag handle

Only trigger drag from a specific element inside the item:

```sveltehtml
<SortableList bind:items={tasks} dragHandleSelector="[data-handle]" class="gap-2">
  {#snippet item(task)}
    <div class="flex items-center gap-2 rounded border border-frame bg-control p-3">
      <GripVertical data-handle class="cursor-grab text-muted-c" />
      <span>{task.title}</span>
    </div>
  {/snippet}
</SortableList>
```

The selector can target regular elements or SVG/icon elements.

### Drag state styling

```sveltehtml
<SortableList
  bind:items={tasks}
  grabbedClass="rounded-md bg-surface-primary shadow-xl ring-2 ring-accent/40 scale-[1.02]"
  draggingClass="opacity-30 blur-[1px]"
>
  {#snippet item(task)}...{/snippet}
</SortableList>
```

### Custom drop indicator

```sveltehtml
<SortableList bind:items={tasks} class="gap-2">
  {#snippet item(task)}...{/snippet}

  {#snippet dropIndicator(draggingItem)}
    <div class="rounded-md border border-dotted border-accent/60 bg-accent/5 p-2">
      {draggingItem?.title}
    </div>
  {/snippet}
</SortableList>
```

Without a custom snippet, the temporary shadow item uses the normal `item`
snippet. Use `dropIndicator` when the placement preview should be lighter than
the real item, or when the list needs a line/dot-style insertion marker.

---

## SortableGroup

Wrap multiple `SortableList`s in a `SortableGroup` to allow items to move
between lists. Each list should have a unique `id`.

```sveltehtml
<script lang="ts">
  import { SortableList, SortableGroup } from '@atom-forge/ui';

  let todo  = $state([{ id: 1, title: 'Plan' }, { id: 2, title: 'Design' }]);
  let doing = $state([{ id: 3, title: 'Develop' }]);
  let done  = $state([{ id: 4, title: 'Deploy' }]);
</script>

<SortableGroup class="flex gap-4">
  <SortableList id="todo" bind:items={todo} class="min-w-56 gap-2">
    {#snippet item(task)}...{/snippet}
  </SortableList>

  <SortableList id="doing" bind:items={doing} class="min-w-56 gap-2">
    {#snippet item(task)}...{/snippet}
  </SortableList>

  <SortableList id="done" bind:items={done} class="min-w-56 gap-2">
    {#snippet item(task)}...{/snippet}
  </SortableList>
</SortableGroup>
```

### SortableGroup props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | — | Added to the wrapper `<div>`. |
| `rules` | `GroupRules` | — | Legacy compatibility prop. The current `svelte-dnd-action` implementation does not enforce per-list accept rules yet. |
| `typeField` | `string` | `'type'` | Legacy compatibility prop used by the previous rule engine. |

Grouped lists share an internal DnD type, so items can transfer between lists in
the same group and remain isolated from lists outside that group.

---

## Legacy low-level exports

`DropIndicator`, `DropSlot`, and `dnd` are still exported for compatibility with
older custom DnD surfaces. New sortable list UIs should prefer `SortableList`
and `SortableGroup`.

```sveltehtml
import { DropIndicator, DropSlot, dnd } from '@atom-forge/ui';
```

The low-level `dnd` helper still wraps `@atlaskit/pragmatic-drag-and-drop`.
It is separate from the current `SortableList` implementation, which uses
`svelte-dnd-action`.
