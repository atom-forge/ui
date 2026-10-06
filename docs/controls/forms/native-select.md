# NativeSelect

A styled wrapper around the native `<select>` element. Supports the same size variants as other form controls and an optional borderless mode.

## Import

```ts
import { NativeSelect } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `{ value: any; label: string }[]` | — | List of options to render. |
| `value` | `any` | — | Bindable selected value. |
| `placeholder` | `string` | `'Select an option'` | Placeholder option shown when nothing is selected (disabled). |
| `disabled` | `boolean` | — | Disables the select. |
| `borderless` | `boolean` | — | Removes border and makes background transparent. |
| `compact` | `boolean` | — | Compact size (h-8, text-xs). Mutually exclusive with `small`. |
| `small` | `boolean` | — | Small size (h-6, text-xs). Mutually exclusive with `compact`. |

---

## Sizes

| Size | Height | Font |
|------|--------|------|
| normal | `h-10` | `text-sm` |
| `compact` | `h-8` | `text-xs` |
| `small` | `h-6` | `text-xs` |

---

## Usage

```sveltehtml
<script lang="ts">
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];
  let selected = $state();
</script>

<NativeSelect {options} bind:value={selected}/>
<NativeSelect {options} bind:value={selected} compact/>
<NativeSelect {options} bind:value={selected} placeholder="Choose one..."/>
<NativeSelect {options} bind:value={selected} borderless/>
<NativeSelect {options} bind:value={selected} disabled/>
```

## When to use

Use for a simple single-choice list with the browser’s native menu and no popup provider.

## Alternatives

Use [Select](select.md) for search, async options, or custom option rendering; use [Radio](radio.md) for choices visible at once.

## Setup and behavior

Bind `value` to application state. The overlaying native select handles interaction while a separate label shows the selected option. Display lookup uses loose equality (`==`), unlike Select’s strict equality; avoid ambiguous mixed ID types. Placeholder is disabled, so users cannot return to it through the menu. There is no search, custom option snippet, multi-selection, generic attribute forwarding, or public change callback.
