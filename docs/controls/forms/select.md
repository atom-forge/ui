# Select

A popup-based dropdown select. Accepts a static options array or an async search function. Supports custom rendering via snippets for both the trigger display and dropdown items.

## Import

```ts
import { Select } from '@atom-forge/ui';
import type { SelectOption, SelectOptionsSource } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number \| undefined` | `undefined` | Bindable selected value. |
| `options` | `SelectOptionsSource` | `[]` | Static array or async source object with `search` and `get` methods. |
| `placeholder` | `string` | `'Select...'` | Text shown when no value is selected. |
| `disabled` | `boolean` | `false` | Disables the trigger button. |
| `searchable` | `boolean` | `true` | Shows a search input inside the dropdown. |
| `button` | `SelectButtonTrigger` | — | Renders a Button component as the trigger instead of the select-field trigger. |
| `hideKeyboardHints` | `boolean` | `false` | Hides the keyboard-navigation hint bar at the bottom of the dropdown. |
| `clearable` | `boolean` | `false` | Shows an × button to clear the value. Selecting the same item again also clears it. |
| `compact` | `boolean` | — | Compact size (h-8). Mutually exclusive with `small`. |
| `small` | `boolean` | — | Small size (h-6). Mutually exclusive with `compact`. |
| `class` | `string` | — | Extra CSS classes on the trigger button. |
| `trigger` | `Snippet<[SelectOption]>` | — | Custom rendering of the selected value in the trigger button. |
| `option` | `Snippet<[SelectOption, boolean]>` | — | Custom rendering of each dropdown item. Receives `(option, isHighlighted)`. |

---

## Types

```ts
type SelectOption = { value: string | number; label: any };

type SelectOptionsSource =
  | SelectOption[]
  | {
      search: (query: string) => Promise<SelectOption[]>;
      get: (values: (string | number)[]) => Promise<SelectOption[]>;
    };

type SelectButtonTrigger = {
  label: string;
  icon?: IconDefinition;
  endIcon?: IconDefinition;
  secondary?: boolean;
  destructive?: boolean;
  ghost?: boolean;
  link?: boolean;
  muted?: boolean;
  accent?: boolean;
  outline?: boolean;
  pill?: boolean;
  borderless?: boolean;
};
```

---

## Usage

No option is highlighted when the dropdown opens. Press an arrow key to begin keyboard navigation.

### Static options

```sveltehtml
<script lang="ts">
  import { Select } from '@atom-forge/ui';

  const options = [
    { value: 'apple',  label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  let value = $state<string | number | undefined>();
</script>

<Select {options} bind:value placeholder="Pick a fruit..."/>
```

### Clearable

```sveltehtml
<Select {options} bind:value clearable/>
```

### Hide keyboard hints

```sveltehtml
<Select {options} bind:value hideKeyboardHints/>
```

### Button trigger

Use `button` when the trigger should be a Button rather than a select field. It accepts Button styling options; no chevron is shown unless you provide `endIcon`.

Variant flags remain optional booleans, including dynamic values and explicit `false`. The trigger forwards at most one active variant to Button: the first truthy flag in the order `destructive` → `secondary` → `ghost` → `link` → `muted` → `accent`. If none is truthy, it uses the primary style. Variant changes are reactive.

```sveltehtml
<Select
  {options}
  bind:value
  button={{label: 'Filter', icon: Filter, secondary: true}}
/>
```

### Async search

Pass an object with `search` and `get` methods as `options`.
`search(query)` is called on every query change.
`get(values)` resolves pre-selected values on load so the trigger can display the correct label.

```sveltehtml
<script lang="ts">
  import { Select } from '@atom-forge/ui';

  const source = {
    search: async (q: string) => {
      const res = await fetch(`/api/items?q=${encodeURIComponent(q)}`);
      return res.json(); // SelectOption[]
    },
    get: async (values: (string | number)[]) => {
      const res = await fetch(`/api/items?ids=${values.join(',')}`);
      return res.json(); // SelectOption[]
    },
  };

  let value = $state<string | number | undefined>();
</script>

<Select options={source} bind:value placeholder="Search..."/>
```

### Custom rendering

Use a script-side caster for extra option fields; avoid assertions inside template expressions:

```sveltehtml
<script lang="ts">
  import { Select, as } from '@atom-forge/ui';
  import type { SelectOption } from '@atom-forge/ui';

  const toColorOption = as<SelectOption & { dot: string }>;
  const options = [
    { value: 'active', label: 'Active', dot: 'bg-accent' },
    { value: 'inactive', label: 'Inactive', dot: 'bg-muted' },
  ];
  let value = $state<string | number | undefined>();
</script>

<Select {options} bind:value>
  {#snippet trigger(opt)}
    {@const colorOption = toColorOption(opt)}
    <span class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full {colorOption.dot}"></span>
      {opt.label}
    </span>
  {/snippet}
  {#snippet option(opt, isHighlighted)}
    <div class={isHighlighted ? 'bg-accent text-accent-contrast' : 'hover:bg-secondary'}>
      {opt.label}
    </div>
  {/snippet}
</Select>
```

### Sizes

```sveltehtml
<Select {options} bind:value/>           <!-- normal (h-10) -->
<Select {options} bind:value compact/>   <!-- h-8 -->
<Select {options} bind:value small/>     <!-- h-6 -->
```

## When to use

Use for one string or numeric ID from static options or a searchable async source, especially when custom option rendering is needed.

## Alternatives

Use [NativeSelect](native-select.md) for a browser-native picker without search, [Radio](radio.md) for visible single-choice options, or [MultiSelect](multi-select.md) for several IDs.

## Setup and behavior

Render below `Root`, which provides popup context and a PopupContainer. Bind `value` to `$state<string | number | undefined>`; `undefined` means no selection. Matching uses strict equality, so keep ID types consistent. Selection updates the binding and closes the popup; there is no public `onchange` prop. Static search compares `String(label)` case-insensitively. Async `search(query)` runs when the dropdown opens and on query changes, without built-in debounce; `get([value])` resolves labels after mount and on value changes. Implement request throttling and error handling in the source. Label-resolution requests are not cancelled or guarded against stale responses. Button-trigger mode shows `button.label`, not the selected-label snippet or field clear button.
