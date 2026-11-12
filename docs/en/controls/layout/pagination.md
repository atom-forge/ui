# Pagination

A page navigation control. Displays first/last pages, sibling pages around the current one, and `…` ellipsis for skipped ranges. All range logic is internal.

## Import

```ts
import { Pagination } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | — | Current page (1-indexed). |
| `total` | `number` | — | Total number of pages. |
| `onchange` | `(page: number) => void` | — | Called when the user selects a new page. |
| `siblings` | `number` | `1` | Pages shown on each side of the current page. |
| `compact` | `boolean` | `false` | h-8 w-8 per button. |
| `small` | `boolean` | `false` | h-6 w-6 per button. |
| `class` | `string` | — | Extra Tailwind classes on the `<nav>` wrapper. |

---

## Usage

```sveltehtml
<script lang="ts">
  let page = $state(1);
</script>

<Pagination {page} total={20} onchange={p => page = p}/>

<!-- Wider sibling range -->
<Pagination {page} total={20} siblings={2} onchange={p => page = p}/>

<!-- Compact -->
<Pagination {page} total={20} compact onchange={p => page = p}/>
```

### Range calculation

| Condition | Rendered |
|-----------|----------|
| `page` near start | `1 2 3 … N` |
| `page` in middle | `1 … 4 5 6 … N` |
| `page` near end | `1 … N-2 N-1 N` |
| All pages fit (≤ `2*siblings + 3`) | No ellipsis |

## When to use

Use for numbered navigation when the total page count is known.

## Alternatives

Use [PaginationSlider](pagination-slider.md) for scrubbing through many pages; it takes an item count and page size instead of a page count.

## Setup and limitations

Pagination is controlled: pass 1-indexed `page` and update it in required `onchange(page)`. It does not bind or mutate page and calls the handler only for a different page within 1…total. Fetching, URL synchronization, and loading states belong to the caller. Normalize page after filters change; supplied pages/totals are not clamped. A page-1 button is still rendered for `total <= 1`. Choose at most one size prop.
