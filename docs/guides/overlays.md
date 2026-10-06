# Compose overlay workflows

Choose an overlay from the task's interaction contract, not its appearance. Open it from a user action, await a decision where appropriate, then perform the application operation.

## Select by task

| Task | Control/API | Contract |
|---|---|---|
| Confirm a blocking action | [Modal](../controls/overlays/modal.md) manager | Await a component or snippet result. |
| Inspect/edit from an edge | [Drawer](../controls/overlays/drawer.md) manager | Await completion; shares the modal overlay stack. |
| Anchored transient content | [Popup](../controls/overlays/popup.md) manager | Supply an element/event anchor or cursor position. |
| Configured context actions | [ContextMenu](../controls/overlays/context-menu.md) | Prefer its configuration API over inventing a menu. |
| Non-blocking completion feedback | [Toast](../controls/overlays/toast.md) manager | `show` returns an ID immediately, not a promise. |
| Supplementary hover help | [Tooltip](../controls/overlays/tooltip.md) | Not a substitute for essential labels or keyboard-accessible help. |
| Bound focus-mode view | [Zen](../controls/overlays/zen.md) | Use its externally controlled state rather than modal results. |

## Setup

Load Tailwind 4 and the library theme, including the `dist` scan, as described in [Getting Started](getting-started.md#css-setup). Import that stylesheet and provide Root once:

```sveltehtml
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { Root } from '@atom-forge/ui';
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
</script>

<Root>{@render children()}</Root>
```

Root creates the managers, containers, and portal target. Retrieve managers during initialization of a **descendant component**, not in the layout script that renders Root and not inside an event handler.

## Recipe: confirm removal, then notify

Complete child page component. Removal changes local state only. The snippet avoids an undefined external dialog component.

```sveltehtml
<script lang="ts">
  import { Button, Card, getModalManager, getToastManager } from '@atom-forge/ui';

  const modal = getModalManager();
  const toast = getToastManager();
  const titleId = $props.id();
  let removed = $state(false);
  let deciding = $state(false);

  async function remove() {
    if (deciding || removed) return;
    deciding = true;
    try {
      const confirmed = await modal.openSnippet(confirmRemoval, {}, { key: 'remove-record' });
      if (confirmed !== true) return;
      removed = true;
      toast.show('Removed from this local view.', { type: 'success' });
    } finally {
      deciding = false;
    }
  }
</script>

{#snippet confirmRemoval()}
  <Card role="dialog" aria-modal="true" aria-labelledby={titleId} class="p-6 flex flex-col gap-4 w-80">
    <h2 id={titleId}>Remove this record?</h2>
    <p>This demo changes only the local view.</p>
    <div class="flex justify-end gap-2">
      <Button type="button" ghost label="Cancel" onclick={() => modal.close(false)}/>
      <Button type="button" destructive label="Remove" onclick={() => modal.close(true)}/>
    </div>
  </Card>
{/snippet}

<Button type="button" destructive label="Remove record" disabled={deciding || removed} onclick={remove}/>
<p role="status">{removed ? 'Record removed from this local view.' : 'Record is present.'}</p>
```

Only `true` authorizes the local mutation. Backdrop/Escape dismissal, navigation, or duplicate-key suppression can resolve with `undefined`. `modal.close` targets the last modal of that kind; do not treat it as a handle for an arbitrary earlier dialog. For a reusable dialog component, use `modal.open(Component, props, options)` instead.

## Application responsibilities

- Replace the local mutation with authorized persistence, handle failures, and keep pending state until work completes. A confirmation is not validation or authorization.
- The recipe supplies dialog naming and persistent status text, but **does not implement focus trapping, initial focus, focus restoration, or a body scroll lock**. Implement these before using it as a production modal. The renderer does not supply them automatically.
- Popup content owns keyboard dismissal and focus. Capture the actual anchor element before awaiting; an event's `currentTarget` is only available during dispatch.
- Modal, Drawer, and Popup close on route navigation; Toast survives. Do not infer that closing cancels an in-flight application request.
- Toast has no built-in live-region role. Keep important feedback accessible independently; toast actions dismiss immediately without awaiting async callbacks.
- Tooltip has no focus trigger or automatic accessible description association. Keep essential instructions visible without hover.
