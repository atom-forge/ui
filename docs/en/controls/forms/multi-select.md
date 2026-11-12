# MultiSelect

Select multiple items from a list. Stores the `value` field of each selected option and displays the human-readable `label` as chips. Supports static arrays and async search functions.

## Import

```ts
import { MultiSelect } from '@atom-forge/ui';
import type { SelectOption, SelectOptionsSource } from '@atom-forge/ui';
```

## Basic usage

```sveltehtml
<script lang="ts">
  import { MultiSelect } from '@atom-forge/ui';

  const options = [
    { value: 'hu', label: 'Hungary' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
  ];

  let value = $state<(string | number)[]>([]);
</script>

<MultiSelect {options} bind:value placeholder="Select countries..." />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `(string \| number)[]` | `[]` | Selected values. Use `bind:value` for two-way binding. |
| `options` | `SelectOptionsSource` | — | Static array or async source object with `search` and `get` methods. |
| `placeholder` | `string` | `'Select...'` | Placeholder shown when nothing is selected. |
| `disabled` | `boolean` | `false` | Disables the trigger. Chips remain visible. |
| `searchable` | `boolean` | `true` | Shows a search input in the dropdown. |
| `button` | `SelectButtonTrigger` | — | Renders a Button component as the trigger instead of the chip field. |
| `hideKeyboardHints` | `boolean` | `false` | Hides the keyboard-navigation hint bar at the bottom of the dropdown. |
| `clearable` | `boolean` | `false` | Shows a clear-all button when items are selected. |
| `sortable` | `boolean` | `false` | Enables drag-and-drop chip reordering. |
| `max` | `number` | — | Maximum selectable items. Further options are greyed out. |
| `compact` | `boolean` | — | Compact size. Mutually exclusive with `small`. |
| `small` | `boolean` | — | Small size. Mutually exclusive with `compact`. |
| `class` | `string` | — | Extra classes forwarded to the trigger element. |

## Snippets

### `chip` — custom chip renderer

```sveltehtml
{#snippet chip(opt, remove)}
  <span>{opt.label} <button onclick={remove}>×</button></span>
{/snippet}
```

Receives `(opt: SelectOption, remove: () => void)`.

### `option` — custom dropdown item renderer

```sveltehtml
{#snippet option(opt, isHighlighted)}
  <div class={isHighlighted ? 'bg-accent' : ''}>
    {opt.label}
  </div>
{/snippet}
```

Receives `(opt: SelectOption, isHighlighted: boolean)`.

## Async options

Pass an object with `search` and `get` methods as `options`.
`search(query)` fetches results on demand.
`get(values)` resolves selected labels in sortable mode. Non-sortable mode currently caches only options selected in the dropdown; see Setup and behavior below.

```sveltehtml
<script lang="ts">
  import { MultiSelect, type SelectOption } from '@atom-forge/ui';

  const source = {
    search: async (query: string): Promise<SelectOption[]> => {
      const res = await fetch(`/api/users?q=${encodeURIComponent(query)}`);
      return res.json();
    },
    get: async (values: (string | number)[]): Promise<SelectOption[]> => {
      const res = await fetch(`/api/users?ids=${values.join(',')}`);
      return res.json();
    },
  };

  let selected = $state<(string | number)[]>([]);
</script>

<MultiSelect options={source} bind:value={selected} placeholder="Search users…" />
```

## Sortable chips

Add `sortable` to enable drag-and-drop reordering. The `value` binding is kept in sync with the displayed order.

```sveltehtml
<MultiSelect {options} bind:value sortable />
```

## Button trigger

Use the same `button` prop as Select when the trigger should be a Button. No chevron is shown unless you provide `endIcon`.

Variant flags remain optional booleans, including dynamic values and explicit `false`. The trigger forwards at most one active variant to Button: the first truthy flag in the order `destructive` → `secondary` → `ghost` → `link` → `muted` → `accent`. If none is truthy, it uses the primary style. Variant changes are reactive.

```sveltehtml
<MultiSelect
  {options}
  bind:value
  button={{label: 'Add tags', icon: Plus, secondary: true}}
/>
```

## Keyboard

| Key | Action |
|-----|--------|
| `ArrowDown / Up` | Navigate the dropdown list |
| `Enter` | Toggle the highlighted option |
| `Escape` | Close the dropdown |

No option is highlighted when the dropdown opens. Press an arrow key to begin keyboard navigation.

## SelectOption type

```ts
type SelectOption = {
  value: string | number;
  label: any;
};
```

## When to use

Use to choose multiple string or numeric IDs and optionally reorder selected chips.

## Alternatives

Use [Select](select.md) for one ID or [TagEditor](tag-editor.md) for free-form strings instead of an ID/label model.

## Setup and behavior

Render below `Root` for popup context. Bind an array of unique IDs with consistent string/number types. Toggling updates selection without closing the dropdown; there is no public change callback. The open dropdown snapshots the initial selection rather than tracking later external assignments. `max` prevents additions but does not trim externally supplied values. Static, non-sortable chips follow options-array order, not selected-value order. Async search has no built-in debounce. **Current limitation:** non-sortable async mode displays only cached options selected in the dropdown; it does not call `get()` to hydrate preselected labels. Sortable mode calls `get(value)` but synchronizes resolved items back into the value array, so unresolved IDs may be dropped. Do not rely on it to preserve unavailable IDs.
