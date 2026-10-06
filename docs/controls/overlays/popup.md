# Popup

A floating overlay system for anchored, temporary content — context menus, dropdowns, submenus, tooltips. Supports cursor and element anchoring, viewport-quadrant positioning, promise-based results, and nested popup hierarchies. Positioning does not measure popup size or guarantee collision-free viewport fitting.

---

## Import

```ts
import { Root, PopupContainer, createPopupManager, getPopupManager } from '@atom-forge/ui';
```

## Components & Exports

| Export | Description |
|--------|-------------|
| `PopupContainer` | Renders the active popup. Place one globally (handled by `Root`) or wrap content for a scoped child manager. |
| `createPopupManager()` | Creates a `PopupManager` and registers it in Svelte context. Called automatically by `Root`. |
| `getPopupManager()` | Returns the nearest `PopupManager` from Svelte context. |
| `PopupManager` | Class managing popup state, opening, closing, and resolve logic. |

---

## Setup

`Root` handles global setup automatically — no manual configuration needed.

```sveltehtml
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { Root } from '@atom-forge/ui';
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
</script>

<Root>
  {@render children()}
</Root>
```

For manual setup (without `Root`):

```sveltehtml
<script lang="ts">
  import { createPopupManager, PopupContainer } from '@atom-forge/ui';
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
  createPopupManager();
</script>

{@render children()}
<PopupContainer />
```

---

## PopupManager API

### `open.snippet(snippet, params, args, ref?)`

Opens a popup rendering a Svelte snippet.

```sveltehtml
<script lang="ts">
  const popupManager = getPopupManager();
</script>

{#snippet myPopup(data)}
  <Card class="p-4">Hello, {data.name}!</Card>
{/snippet}

<Button onclick={e => popupManager.open.snippet(myPopup, { name: 'World' }, { anchor: e })} label="Open"/>
```

### `open.component(component, params, args, ref?)`

Opens a popup rendering a Svelte component. Useful when the popup is defined in a separate file.

```ts
import MyDropdown from './MyDropdown.svelte';
popupManager.open.component(MyDropdown, { items }, { anchor: event, align: 'left' });
```

Both methods return a `Promise<any>`. Explicit `resolve()` settles current/pending content, and an accepted `close()` settles the active popup with `undefined`; do not assume every replacement or overlapping open settles earlier promises (see limitations below). `ref` is the optional fourth argument, not a positioning property; a matching active ref returns the existing promise.

---

## Closing & Resolving

| Method | Description |
|--------|-------------|
| `close()` | Schedules active-popup dismissal with `undefined`; ignored during the opening guard and does not cancel a pending open. |
| `resolve(value?)` | Closes the popup and resolves the promise with `value`. |
| `closeRoot()` | Calls the root manager's delayed `close()`; scoped child promises are not explicitly settled. |
| `resolveRoot(value?)` | In nested popups, resolves the root manager's promise with `value`. |

```sveltehtml
<!-- Inside a popup snippet -->
<Button label="Confirm" onclick={() => popupManager.resolve('confirmed')}/>
<Button label="Cancel" ghost onclick={() => popupManager.close()}/>
```

### Awaiting results

```ts
const result = await popupManager.open.snippet(myPopup, {}, { anchor: event });
if (result === 'confirmed') { /* handle */ }
```

## Navigation

With Root installed, route navigation calls `resolveRoot(undefined)` to clear the root manager's current popup and tracked pending open. Scoped child promises are not explicitly settled by the root manager. Modal and Drawer overlays are also cleared on navigation; Toast notifications remain visible.

---

## Positioning args

The third parameter of `open.snippet` / `open.component` controls positioning.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pos` | `{ clientX, clientY }` | — | Positions the popup at the cursor. Mutually exclusive with `anchor`. |
| `anchor` | `Element \| MouseEvent` | — | Positions the popup relative to a DOM element. Passing a `MouseEvent` uses its `currentTarget`. |
| `align` | `'auto' \| 'left' \| 'right' \| 'both' \| 'side'` | `'auto'` | Horizontal alignment. See below. |
| `offset` | `number` | `4` | Anchored popup gap; `0` falls back to `4`. Cursor positioning always uses `4`. |

### Alignment modes

| Value | Behavior |
|-------|----------|
| `auto` | Left-aligns if anchor is in the left half of the screen, right-aligns otherwise. |
| `left` | Aligns the popup's left edge to the anchor's left edge. |
| `right` | Aligns the popup's right edge to the anchor's right edge. |
| `both` | Popup matches the anchor's width (min-width). Ideal for full-width dropdowns. |
| `side` | Opens to the right or left of the anchor, aligned to its top or bottom edge. Used for submenus. |

For non-`side` alignment, vertical position is automatic: opens below if the anchor's center is in the top half of the viewport, above otherwise. `side` aligns with the anchor's top or bottom edge. Neither mode measures the popup's dimensions to prevent overflow.

---

## Nested Popups

Wrap popup content in `<PopupContainer>` to create an isolated child manager. The child manager can open its own popups independently. Use `resolveRoot()` to propagate a result up to the root promise.

```sveltehtml
<!-- NestedMenu.svelte: rendered as a descendant of a scoped PopupContainer -->
<script lang="ts">
  import { Button, Card, getPopupManager } from '@atom-forge/ui';
  import { ChevronRight } from 'lucide-svelte';
  const popupManager = getPopupManager();
</script>

{#snippet subMenu()}
  <Card class="p-2">
    <Button ghost label="Nested action" onclick={() => popupManager.resolveRoot('nested-action')}/>
  </Card>
{/snippet}

<Card class="p-1 flex flex-col gap-0">
  <Button ghost compact label="Action" onclick={() => popupManager.resolveRoot('action')}/>
  <Button ghost compact label="Submenu" endIcon={ChevronRight}
          onclick={e => popupManager.open.snippet(subMenu, {}, { anchor: e, align: 'side' }, subMenu)}/>
</Card>
```

In the parent component, import `NestedMenu` and render `<PopupContainer><NestedMenu/></PopupContainer>` as the root popup content. The separate child component is necessary: a snippet's lexical context does not become the scoped container's context, and `getPopupManager()` must not be called during template rendering.

The `ref` parameter on the submenu open call reuses the existing active popup promise rather than reopening it.

---

## Architecture

```
Root
  └── createPopupManager()          → root PopupManager in context
       └── PopupContainer (global)  → renders root popup

Inside a popup snippet:
  PopupContainer (scoped)
    └── createPopupManager(parent)  → child PopupManager in context
         └── PopupContainer         → renders child popup
```

- The root `PopupContainer` listens for `window` click/contextmenu events to close the popup.
- Each scoped `PopupContainer` adds its own listener, so clicking inside a child popup doesn't bubble to close the parent (click propagation is stopped on the popup element).
- `ignoreClose` + a 100ms timeout prevents the open call from being immediately cancelled by the same click event.
- Positioning is recalculated every animation frame while an anchored popup is open, so it tracks scroll/resize correctly.

## When to use

Use for anchored transient content, dropdowns, or nested menus with promise-based results.

## Alternatives

Use [Tooltip](tooltip.md) for hover-only explanations, [ContextMenu](context-menu.md) for configured actions, or [Modal](modal.md) for a blocking task.

## Setup and limitations

Root creates the global manager and container. Manual providers must be created during component initialization, and consumers must be descendants. Scoped PopupContainer creates child context; obtain that child manager in a component initialized beneath the container rather than reusing a manager captured outside it. A manager holds one active popup, not a general stack. Avoid overlapping opens: a new open schedules replacement without reliably settling the previous active promise, and repeated opens before the timer runs can overwrite the pending resolver. Do not rely on replacement to complete earlier awaits. Pass ref as the fourth open argument; repeated matching ref returns the existing promise. `close()` is delayed and ignored during the first 100 ms after opening; `resolve()` immediately resolves current/pending content. There is no generic Escape handler or focus trap: popup content owns keyboard dismissal/focus. Capture a real element before awaiting if using an event anchor, since currentTarget is only available during event dispatch.
