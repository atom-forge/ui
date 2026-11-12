# BarChart

A responsive bar chart supporting single-value, multi-series grouped, and stacked layouts. Shows a floating tooltip on hover.

## Import

```ts
import { BarChart } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ChartData[]` | — | Chart data. Each item is one bar group. |
| `series` | `Series[]` | — | Series metadata (name, color) used in tooltips and defaults. |
| `variant` | `'grouped' \| 'stacked'` | `'grouped'` | How multi-segment bars are rendered. |
| `showInfo` | `boolean` | `true` | Whether to show the hover tooltip. |
| `class` | `string` | — | Extra Tailwind classes. |

---

## Types

```ts
type ChartData = {
  label: string;       // X-axis label
  value?: number;      // Single-series shorthand
  values?: ChartSegment[];  // Multi-series
};

type ChartSegment = {
  value: number;
  color?: string;   // CSS color string
  label?: string;
};

type Series = {
  name: string;   // Shown in tooltip
  color: string;  // CSS color (e.g. 'var(--color-accent)')
};
```

---

## Usage

### Single series

```sveltehtml
<BarChart
  data={[
    { label: 'Jan', value: 40 },
    { label: 'Feb', value: 75 },
    { label: 'Mar', value: 55 },
  ]}
  series={[{ name: 'Value', color: 'var(--color-accent)' }]}
  class="h-48"
/>
```

### Multi-series grouped

```sveltehtml
<BarChart
  data={[
    { label: 'Q1', values: [{ value: 40 }, { value: 60 }] },
    { label: 'Q2', values: [{ value: 55 }, { value: 80 }] },
  ]}
  series={[
    { name: 'Sales', color: 'var(--color-accent)' },
    { name: 'Target', color: 'var(--color-secondary)' },
  ]}
  class="h-48"
/>
```

### Stacked

```sveltehtml
<BarChart
  variant="stacked"
  data={[{ label: 'Q1', values: [{ value: 40 }, { value: 60 }] }]}
  series={[
    { name: 'Sales', color: 'var(--color-accent)' },
    { name: 'Target', color: 'var(--color-secondary)' },
  ]}
  class="h-64"
/>
```

## When to use

Use for a lightweight DOM bar visualization of nonnegative values, grouped or stacked.

## Alternatives

Use [CjsBarChart](charts.md#cjsbarchart) for Chart.js axes/options or [MeterGroup](meter-group.md) for proportions within a total.

## Setup and limitations

Provide a usable height and valid CSS colors through segment/series colors. Single `value` takes precedence over `values`. Heights divide by the largest value or stacked sum; all-zero data divides by zero and negative values are not supported by this baseline layout. Supply a positive data maximum rather than relying on an empty/zero-state chart. No Root/popup provider is required: the tooltip is local DOM content and hides after 200 ms on mouse leave. There are no axes, keyboard tooltips, selection events, or accessible data-table fallback; compose textual data separately.
