# Slider / Range

`Slider` — single thumb for a scalar value. `Range` — two thumbs for an interval `[min, max]`. Both share the same visual and size API.

## Import

```ts
import { Slider, Range } from '@atom-forge/ui';
```

---

## Slider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `50` | Bindable current value. Clamped to `[min, max]` on mount. |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |
| `step` | `number` | `1` | Step increment. |
| `disabled` | `boolean` | — | Disables interaction. |
| `drawStops` | `boolean` | — | Draws tick marks at each step. |
| `compact` | `boolean` | — | Compact track size. Mutually exclusive with `small`. |
| `small` | `boolean` | — | Small track size. Mutually exclusive with `compact`. |
| `showValue` | `boolean \| (value: number) => string` | — | Shows the current value in a bubble above the knob while dragging. Pass a formatter to add a unit, e.g. `v => v + ' %'`. |
| `class` | `string` | — | Extra Tailwind classes. |

---

## Range Props

Same as Slider, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `[number, number]` | `[25, 75]` | Bindable two-value interval. |
| `distance` | `{ min?: number; max?: number }` | — | Enforces a minimum and/or maximum distance between the two thumbs. |

---

## Usage

```sveltehtml
<script lang="ts">
  let vol   = $state(60);
  let range = $state<[number, number]>([20, 80]);
</script>

<!-- Slider -->
<Slider bind:value={vol}/>
<Slider bind:value={vol} min={0} max={200} step={10}/>
<Slider bind:value={vol} drawStops compact/>

<!-- Range -->
<Range bind:value={range}/>
<Range bind:value={range} distance={{ min: 10, max: 50 }}/>

<!-- showValue -->
<Slider bind:value={vol} showValue/>
<Slider bind:value={vol} showValue={v => v + ' %'}/>
<Range bind:value={range} showValue={v => v + ' kg'}/>
```

## When to use

Use Slider for a bounded scalar and Range for a two-value interval controlled by dragging.

## Alternatives

Use [Input](input.md) when exact numeric text entry is required. Use [ProgressBar](progress-bar.md) for read-only progress.

## Setup and behavior

Bind a number or an explicitly typed `[number, number]` tuple. Initial values are clamped during component initialization (with a console error), not continuously normalized on external assignment. Supply `max > min`, positive `step`, and feasible distance constraints. Range sorts values during drag updates and may push the other thumb to enforce distance; distance is not validated on initial/external values. Size is captured at initialization. Tick marks are suppressed when the step count reaches 100. Neither wrapper exposes a change/commit callback; use binding for live updates and do not infer a save-on-release contract.
