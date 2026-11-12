# Progress Ring

A circular SVG progress indicator. Supports a single ring or multiple concentric rings. The progress arc animates smoothly when `value` changes via CSS `stroke-dashoffset` transition.

## Import

```ts
import { ProgressRing } from '@atom-forge/ui';
```

## Props

### Single ring

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current progress value. |
| `max` | `number` | `100` | Maximum value. Percentage = `value / max × 100`. Value is clamped to [0, max]. |
| `color` | `string` | `var(--color-accent)` | Progress arc color. Also used as fallback in multi-ring mode. |
| `label` | `string` | `${Math.round(pct)}%` | Center text. Ignored when `children` snippet is provided. |
| `labelClass` | `string` | — | Extra classes on the default label. |

### Multi ring

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rings` | `RingDef[]` | — | Array of ring definitions. Each: `{ value, max?, color? }`. Drawn concentrically, outermost first. |
| `gap` | `number` | `4` | Gap in pixels between concentric rings. |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `120` | Outer diameter in pixels. |
| `strokeWidth` | `number` | `12` | Thickness of both arcs in pixels. |
| `trackColor` | `string` | `var(--color-secondary)` | Background track color. |
| `children` | `Snippet` | — | Custom center content. Overrides the default label. No parameters — use local state directly. |
| `class` | `string` | — | Classes on the root element. |

## Types

```ts
type RingDef = {
  value: number;
  max?: number;    // defaults to 100
  color?: string;  // falls back to the `color` prop
};
```

## Accessibility

Root element: `role="progressbar"` with `aria-valuemin=0`, `aria-valuemax={max}`, `aria-valuenow={clampedValue}` (single-ring mode only). Arbitrary attributes are not forwarded. Describe metrics with accessible text outside the component.

## SVG internals

For ring at index `i`:
- `radius = (size - strokeWidth) / 2 - i * (strokeWidth + gap)`
- `circumference = 2π × radius`
- `stroke-dashoffset = circumference × (1 - percentage / 100)`
- Rotated −90° so arcs start at the top.

## Examples

```sveltehtml
<script lang="ts">
  import { ProgressRing } from '@atom-forge/ui';
  let value = $state(65);
</script>

<!-- Default percentage label -->
<ProgressRing {value} />

<!-- Custom center content (no params — use local state) -->
<ProgressRing {value} color="#10b981">
  {#snippet children()}
    <span class="text-xl font-bold">{Math.round(value)}%</span>
  {/snippet}
</ProgressRing>

<!-- Multi-ring (Activity Rings style) -->
<ProgressRing
  size={160}
  strokeWidth={14}
  gap={6}
  rings={[
    { value: 78, color: '#ef4444' },
    { value: 52, color: '#10b981' },
    { value: 90, color: '#3b82f6' },
  ]}
/>
```

## When to use

Use for a compact circular completion metric, or concentric related metrics.

## Alternatives

Use [ProgressBar](../forms/progress-bar.md) for linear progress or [MeterGroup](meter-group.md) for contributions to one total.

## Setup and limitations

Values are visually clamped but not written back to caller state; max <= 0 produces an empty arc. Rings mode overrides scalar value/max and suppresses the default center label. Ensure size/strokeWidth/gap keep every radius positive. There is no indeterminate mode or completion callback. Multi-ring ARIA does not expose individual values. The component does not forward arbitrary attributes, so passing aria-label directly does not label its root; provide accessible text outside the visualization.
