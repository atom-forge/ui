# ColorPicker

A styled color input that shows a swatch and the current hex value. Wraps the native `<input type="color">` with a design-system-consistent appearance.

## Import

```ts
import { ColorPicker } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `'#ffffff'` | Bindable hex color string. |
| `disabled` | `boolean` | — | Disables the picker. |
| `compact` | `boolean` | — | Compact size (h-8). Mutually exclusive with `small`. |
| `small` | `boolean` | — | Small size (h-6). Mutually exclusive with `compact`. |
| `class` | `string` | — | Extra Tailwind classes, merged via `twMerge`. |

---

## Sizes

| Size | Height |
|------|--------|
| normal | `h-10` |
| `compact` | `h-8` |
| `small` | `h-6` |

---

## Usage

```sveltehtml
<script lang="ts">
  let color = $state('#3b82f6');
</script>

<ColorPicker bind:value={color}/>
<ColorPicker bind:value={color} compact/>
<ColorPicker bind:value={color} disabled/>
```

## When to use

Use for a color swatch backed by the browser’s native color picker.

## Alternatives

Use [Input](input.md) if users need to enter arbitrary color syntax or tokens; ColorPicker has no palette or token selector.

## Setup and behavior

Bind a hex color string suitable for native `input type="color"`. The browser owns the picker UI; there is no custom alpha or format API. Size is captured at initialization. Extra attributes and handlers are forwarded to the wrapper div, not to the native input, so do not assume `name`, `id`, or `onchange` configure the input itself.
