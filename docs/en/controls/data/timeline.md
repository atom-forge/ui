# Timeline

A flexible timeline component that renders an `items` array along a vertical or horizontal line. Content and dot nodes are fully customisable via snippets.

## Import

```ts
import { Timeline } from '@atom-forge/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `any[]` | required | Data array. Passed as-is to both snippets. |
| `right` | `boolean` | — | Vertical layout, content on the right (default when no direction is set). |
| `left` | `boolean` | — | Vertical layout, content on the left. |
| `bottom` | `boolean` | — | Horizontal layout, content below. |
| `top` | `boolean` | — | Horizontal layout, content above. |
| `alternate` | `boolean` | `false` | Flips content to the opposite side on each successive item. |
| `children` | `Snippet<[any]>` | required | Renders each item's content. |
| `dot` | `Snippet<[any]>` | — | Renders the line node. Defaults to a small grey circle. |
| `class` | `string` | — | Extra classes on the connecting line element. |

Direction props (`left`, `right`, `top`, `bottom`) are mutually exclusive; provide exactly one. If none is set, `right` behaviour is used.

## Layouts

| Layout | Structure |
|--------|-----------|
| `right` | Vertical line on the left, all content to the right |
| `left` | Vertical line on the right, all content to the left |
| `right` + `alternate` | 3-column grid, content alternates right/left |
| `bottom` | Horizontal line at top of section, all content below |
| `top` | Horizontal line at bottom, all content above |
| `bottom` + `alternate` | Content alternates below/above the dot row |

## Example

```sveltehtml
<script lang="ts">
  import { Timeline } from '@atom-forge/ui';
  import { CheckCircle, Circle } from 'lucide-svelte';

  const tasks = [
    { label: 'Design', done: true },
    { label: 'Build', done: true },
    { label: 'Test', done: false },
  ];
</script>

<Timeline items={tasks} right>
  {#snippet dot(t)}
    {#if t.done}
      <CheckCircle size={18} class="text-emerald-500" />
    {:else}
      <Circle size={18} class="text-muted-contrast" />
    {/if}
  {/snippet}

  {#snippet children(t)}
    <p class="text-sm font-medium">{t.label}</p>
  {/snippet}
</Timeline>
```

## When to use

Use to display ordered events, milestones, or activity with custom content and nodes.

## Alternatives

Use [Stepper](../layout/stepper.md) for active workflow progress or [Organizer](../scheduling/organizer.md) for editable unit-positioned items.

## Setup and limitations

Items are rendered in supplied order: the component does not sort dates or calculate time-scaled positions. Choose at most one direction prop, or omit all for right. `class` styles the line, not the outer layout. Snippets receive each item without an index. No selection, expansion, date parsing, or click handling is provided; compose interactions and list semantics in the content. Horizontal layouts do not add a dedicated scrolling control.
