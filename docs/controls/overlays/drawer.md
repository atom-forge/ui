# Drawer

A slide-in panel anchored to the left or right edge of the screen. Opened imperatively via `getDrawerManager()`. Supports async resolution — `open()` returns a Promise that resolves when the drawer closes.

## Import

```sveltehtml
import { getDrawerManager } from '@atom-forge/ui';
```

`AtomForge` automatically provides the drawer manager and renders the overlay. No manual setup is needed.

---

## DrawerManager API

Obtain the manager anywhere inside the `<AtomForge>` tree:

```ts
const drawer = getDrawerManager();
```

### `drawer.open(component, props?, options?)`

Opens a drawer and returns a `Promise<T>` that resolves when `drawer.close(result)` is called.

| Parameter | Type | Description |
|-----------|------|-------------|
| `component` | `Component` | Svelte component to render inside the drawer. |
| `props` | `object` | Props passed to the component. |
| `options` | `DrawerOptions` | Position, size, closable, key. |

### `drawer.close(result?)`

Closes the topmost drawer and resolves its promise with `result`.

---

## DrawerOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `'left' \| 'right'` | `'right'` | Which edge the drawer slides from. |
| `size` | `'normal' \| 'compact' \| 'small'` | `'normal'` | Panel width. |
| `closable` | `boolean` | `true` | Whether clicking the backdrop closes the drawer. |
| `key` | `string` | — | Prevents opening another drawer with the same key while one is already active. |

### Size reference

| Size | Width |
|------|-------|
| `small` | `w-80` (320px) |
| `compact` | `w-96` (384px) |
| `normal` | `w-128` (512px) |

---

## Usage

```sveltehtml
<script>
  import MyPanel from './MyPanel.svelte';
  const drawer = getDrawerManager();

  async function openPanel() {
    const result = await drawer.open(MyPanel, { title: 'Settings' }, {
      position: 'right',
      size: 'normal',
    });
    console.log('Drawer closed with:', result);
  }
</script>

<Button label="Open Drawer" onclick={openPanel}/>
```

### Inside the drawer component

```sveltehtml
<script>
  const drawer = getDrawerManager();
</script>

<div class="p-6 flex flex-col h-full">
  <h2>Settings</h2>
  <div class="grow">...</div>
  <Button label="Save" onclick={() => drawer.close('saved')}/>
</div>
```

---

## Stacking

Drawer and Modal share one internal overlay stack and one renderer. A modal opened after a drawer, or a drawer opened after a modal, is rendered above the earlier overlay automatically. Popup and Toast stay outside this stack and remain on their fixed always-topmost tier.

Every drawer has its own full-screen click-catcher. A single visible backdrop layer sits directly below the topmost overlay; overlay click-catchers stay transparent so backdrop color does not compound and the active overlay remains visually clear.

## Backdrop styling

The visible backdrop uses the overridable `.overlay-backdrop` class from the library theme. Consumers can override that class in their own stylesheet loaded after `@atom-forge/ui`:

```css
@layer components {
  .overlay-backdrop {
    @apply bg-black/30 dark:bg-black/40;
  }
}
```

CSS cascades per property. If a future override needs to remove a backdrop-related declaration such as blur, the override must provide a competing declaration for that property. The default drawer backdrop does not use `backdrop-filter`.
