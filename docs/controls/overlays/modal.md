# Modal

An imperative modal system. Open any Svelte component as a stacked modal dialog via `getModalManager()`. `open()` returns a Promise that resolves when the modal closes.

## Import

```sveltehtml
import { getModalManager } from '@atom-forge/ui';
```

`AtomForge` automatically provides the modal manager and renders the shared Modal/Drawer overlay container. No manual setup is needed.

---

## ModalManager API

Obtain the manager anywhere inside the `<AtomForge>` tree:

```ts
const modal = getModalManager();
```

### `modal.open(component, props?, options?)`

Opens a component as a modal. Returns `Promise<any>` that resolves with the value passed to `modal.close()`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `component` | `Component` | Svelte component to render. |
| `props` | `object` | Props passed to the component. |
| `options` | `ModalOptions \| string` | Optional behavior. A string is treated as a deduplication `key` for backwards compatibility. |

### `modal.openSnippet(snippet, props?)`

Opens a Svelte snippet as a modal.

### `modal.close(result?)`

Closes the topmost modal and resolves its promise with `result`.

### `modal.resolve(result?)`

Alias for `close`.

---

## ModalOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `closable` | `boolean` | `true` | Whether backdrop clicks and Escape can close the modal. Programmatic `close()` still works. |
| `key` | `string` | — | Prevents opening another modal with the same key while one is already active. |

---

## Usage

```sveltehtml
<script>
  import ConfirmDialog from './ConfirmDialog.svelte';
  const modal = getModalManager();

  async function deleteItem() {
    const confirmed = await modal.open(ConfirmDialog, {
      message: 'Delete this item?'
    });
    if (confirmed) await doDelete();
  }
</script>

<Button label="Delete" destructive onclick={deleteItem}/>
```

### Inside the modal component

```sveltehtml
<script>
  let { message } = $props();
  const modal = getModalManager();
</script>

<Card class="p-6 flex flex-col gap-4 w-80">
  <p>{message}</p>
  <div class="flex gap-2 justify-end">
    <Button ghost label="Cancel" onclick={() => modal.close(false)}/>
    <Button destructive label="Delete" onclick={() => modal.close(true)}/>
  </div>
</Card>
```

### Open a snippet

```sveltehtml
<script>
  const modal = getModalManager();
</script>

{#snippet confirmSnippet()}
  <Card class="p-6">
    <p>Are you sure?</p>
    <Button onclick={() => modal.close(true)}>Yes</Button>
  </Card>
{/snippet}

<Button onclick={() => modal.openSnippet(confirmSnippet)}>Open</Button>
```

---

## Stacking

Modals stack — each `open()` call adds a layer. `close()` always removes the topmost modal. Use this to build multi-step flows.

Modal and Drawer share one internal overlay stack and one renderer. A drawer opened after a modal, or a modal opened after a drawer, is rendered above the earlier overlay automatically. Popup and Toast stay outside this stack and remain on their fixed always-topmost tier.

Every modal has its own full-screen click-catcher. A single visible backdrop layer sits directly below the topmost overlay; overlay click-catchers stay transparent so backdrop color does not compound and the active overlay remains visually clear.

## Navigation

Route navigation closes all active Modal and Drawer overlays and resolves their pending promises with `undefined`. This cleanup ignores `closable: false`, because `closable` only controls user dismissal, not route lifecycle cleanup. Toasts remain visible across navigation.

## Backdrop styling

The visible backdrop uses the overridable `.overlay-backdrop` class from the library theme. Consumers can override that class in their own stylesheet loaded after `@atom-forge/ui`:

```css
@layer components {
  .overlay-backdrop {
    @apply bg-black/30 dark:bg-black/40;
  }
}
```

CSS cascades per property. If a future override needs to remove a backdrop-related declaration such as blur, the override must provide a competing declaration for that property. The default modal backdrop does not use `backdrop-filter`.
