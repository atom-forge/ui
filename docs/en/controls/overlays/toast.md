# Toast

Lightweight notification toasts stacked in a fixed overlay. Opened imperatively via `getToastManager()`. Auto-dismiss after a configurable duration.

## Import

```ts
import { getToastManager } from '@atom-forge/ui';
```

`Root` automatically provides the toast manager and renders the overlay. No manual setup is needed.

---

## ToastManager API

Obtain the manager anywhere inside the `<Root>` tree:

```ts
const toast = getToastManager();
```

### `toast.show(message, options?)`

Shows a toast and returns its `id` string. Auto-dismisses after `duration` ms (default 3000).

### `toast.dismiss(id)`

Manually removes a toast by its id.

---

## ToastOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Sets the accent bar color and default icon. |
| `duration` | `number` | `3000` | Auto-dismiss delay in ms. `0` = never auto-dismiss. |
| `closable` | `boolean` | `true` | Shows a close button. |
| `icon` | `IconDefinition` | — | Overrides the default type icon. |
| `action` | `{ label: string; callback: () => void }` | — | Adds an action button inside the toast. |

---

## Usage

```sveltehtml
<script lang="ts">
  const toast = getToastManager();
</script>

<Button label="Info"    onclick={() => toast.show('File saved.')}/>
<Button label="Success" onclick={() => toast.show('Upload complete!', { type: 'success' })}/>
<Button label="Warning" onclick={() => toast.show('Low disk space.', { type: 'warning' })}/>
<Button label="Error"   onclick={() => toast.show('Connection failed.', { type: 'error' })}/>
```

### Persistent with action

```ts
toast.show('New version available.', {
  type: 'info',
  duration: 0,
  action: {
    label: 'Update',
    callback: () => triggerUpdate(),
  },
});
```

### Manual dismiss

```ts
const id = toast.show('Processing...', { duration: 0, closable: false });
await doWork();
toast.dismiss(id);
```

## When to use

Use for non-blocking feedback such as completion, warning, or recoverable errors.

## Alternatives

Use [Field](../forms/field.md) for persistent validation next to a control or [Modal](modal.md) when the user must explicitly decide before continuing.

## Setup and limitations

Root creates the toast manager and renders ToastContainer. Obtain it in a descendant component’s initialization. Show returns an ID immediately, not a completion promise; dismiss(id) is safe after an earlier auto-dismiss. Duration 0 is persistent; other values schedule a timeout, with no hover pause. An action callback runs and the toast is dismissed immediately without awaiting async work. Use showCustom(component, props, options) for custom content; custom components own their own dismissal UI. Toasts survive route navigation. The standard renderer has no alert/status live-region role, so provide accessible persistent feedback separately when needed.
