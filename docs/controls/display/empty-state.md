# Empty State

A centered placeholder shown when a list or section has no content. Combines an icon, title, optional description, and an optional call-to-action slot.

## Import

```ts
import { EmptyState } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `IconDefinition` | — | Icon rendered above the title. Use `defineIcon()`. |
| `title` | `string` | — | Primary message. |
| `description` | `string` | — | Optional supporting text. |
| `children` | `Snippet` | — | Optional CTA area (e.g. a Button). |
| `class` | `string` | — | Extra Tailwind classes on the root `div`. |

---

## Usage

```sveltehtml
<!-- Minimal -->
<EmptyState icon={defineIcon(IconInbox)} title="No messages"/>

<!-- With description -->
<EmptyState
  icon={defineIcon(IconSearch)}
  title="No results"
  description="Try adjusting your search or filters."
/>

<!-- With CTA -->
<EmptyState
  icon={defineIcon(IconFilePlus)}
  title="No documents yet"
  description="Create your first document."
>
  <Button accent icon={defineIcon(IconFilePlus)} label="New Document"/>
</EmptyState>
```

## When to use

Use after loading completes when a collection is empty or a filter finds no results.

## Alternatives

Use a loading placeholder while work is pending; use [Card](card.md) for a populated surface.

## Setup and behavior

The application decides when the state is empty. `icon` and `title` are required; direct Lucide icons work without `defineIcon()`. Children supply optional actions, but the component does not fetch, retry, or navigate on its own.
