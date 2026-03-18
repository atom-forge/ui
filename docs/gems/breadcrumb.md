# Breadcrumb

A navigation trail showing the current page's location within a hierarchy. Separated by `/`. The last item is always rendered as bold non-clickable text.

## Import

```svelte
import { Breadcrumb } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{ label: string; href?: string }[]` | — | Ordered list of breadcrumb segments. Last item is always non-clickable. |
| `class` | `string` | — | Extra Tailwind classes on the `<nav>` element. |

---

## Usage

```svelte
<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Profile' },
]}/>
```

### Notes

- The last item is rendered as `<span>` (bold, `text-control-c`) regardless of whether `href` is provided.
- All other items with `href` are rendered as `<a>` links.
- Items without `href` in non-last positions are rendered as `<span>`.
- Long labels are truncated with `truncate max-w-32` (links) or `max-w-48` (current).

