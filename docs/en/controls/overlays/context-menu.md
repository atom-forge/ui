# ContextMenu

A popup menu built from a declarative config array. Supports icons, separators, warning styles, submenus, and programmatic resolution via the popup manager.

## Import

```ts
import { ContextMenu, getPopupManager } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Description |
|------|------|-------------|
| `config` | `ContextMenuItemConfig[]` | Array of menu item definitions. |

---

## Item Config Types

Each item in the `config` array is one of:

### Separator

```ts
const separator = { separator: true } as const;
```

Renders a horizontal divider.

### Base item fields (shared)

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Item text. |
| `icon` | `IconDefinition` | Optional leading icon. |
| `centered` | `boolean` | Centers the item's content. Items are left-aligned by default. |
| `warning` | `boolean` | Renders the label in `text-error`. |
| `disabled` | `boolean` | Greys out and disables the item. |
| `chevron` | `boolean` | Forces a chevron icon on the right (auto-shown for submenus). |

### OnclickItem

```ts
type OnclickItem = {
  label: string;
  onclick: (event: MouseEvent, manager: PopupManager) => void;
};
```

### SubmenuItem

```ts
type SubmenuItem = { label: string; submenu: ContextMenuItemConfig[] };
```

Opens a nested `ContextMenu` aligned to the side on click.

### ResolverItem

```ts
type ResolverItem = { label: string; resolveWith: any };
```

Closes the popup chain and resolves the awaited promise with `resolveWith`.

---

## Usage

```sveltehtml
<script lang="ts">
  const popupManager = getPopupManager();

  async function open(event: MouseEvent) {
    const result = await popupManager.open.component(ContextMenu, {
      config: [
        { label: 'Edit', icon: IconEdit, onclick: () => edit() },
        { label: 'Duplicate', onclick: () => duplicate() },
        { separator: true },
        { label: 'Delete', icon: IconTrash, warning: true, onclick: () => remove() },
      ]
    }, { pos: event });
  }
</script>

<button type="button" oncontextmenu={(event) => { event.preventDefault(); open(event); }}>Right-click me</button>
```

### With submenu

```ts
const moveMenuItem = {
  label: 'Move to',
  submenu: [
    { label: 'Folder A', onclick: () => moveTo('a') },
    { label: 'Folder B', onclick: () => moveTo('b') },
  ]
};
```

### With resolver (for use inside a popup)

```ts
const confirmationItems = [
  { label: 'Confirm', resolveWith: true },
  { label: 'Cancel', resolveWith: false },
];
```

### Centered item

```ts
const emptyItem = { label: 'No results', centered: true, disabled: true, resolveWith: null };
```

## When to use

Use for declarative action menus and nested submenus opened at a cursor or element.

## Alternatives

Use [Select](../forms/select.md) for a selected value, [Popup](popup.md) for arbitrary anchored content, or [Modal](modal.md) for blocking confirmation.

## Setup and limitations

Open under Root with getPopupManager during component initialization. For a right-click menu call event.preventDefault() and use `{ pos: event }`; `{ anchor: event }` positions at currentTarget instead. Onclick items do not automatically dismiss: call manager.closeRoot() or resolveRoot(result) in the action. Resolver items resolve the root chain, but `resolveWith: undefined` is not handled by the selection branch; use an explicit result or closeRoot. Submenus open on click. There is no full menu-role/arrow-key navigation contract or generic Escape listener in ContextMenu; do not assume native menu accessibility.
