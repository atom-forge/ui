# ContextMenu

Deklaratív konfigurációs tömbből felépülő popup menü. Támogatja az ikonokat, az elválasztókat, a figyelmeztető stílust, az almenüket és a popup manageren keresztüli programozott feloldást.

## Importálás

```ts
import { ContextMenu, getPopupManager } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Leírás |
|------|------|-------------|
| `config` | `ContextMenuItemConfig[]` | A menüelemek definícióinak tömbje. |

---

## Elemkonfiguráció típusai

A `config` tömb minden eleme a következők egyike:

### Separator

```ts
const separator = { separator: true } as const;
```

Vízszintes elválasztóvonalat jelenít meg.

### Alap elemmezők (közösek)

| Mező | Típus | Leírás |
|-------|------|-------------|
| `label` | `string` | Az elem szövege. |
| `icon` | `IconDefinition` | Opcionális ikon az elem elején. |
| `centered` | `boolean` | Középre igazítja az elem tartalmát. Alapértelmezésben az elemek balra igazítottak. |
| `warning` | `boolean` | A címkét `text-error` színnel jeleníti meg. |
| `disabled` | `boolean` | Kiszürkíti és letiltja az elemet. |
| `chevron` | `boolean` | Jobb oldali chevron ikont kényszerít (almenüknél automatikusan megjelenik). |

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

Kattintásra oldalra igazított, beágyazott `ContextMenu`-t nyit.

### ResolverItem

```ts
type ResolverItem = { label: string; resolveWith: any };
```

Bezárja a popup-láncot, és a várakozó promise-t a `resolveWith` értékkel oldja fel.

---

## Használat

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

### Almenüvel

```ts
const moveMenuItem = {
  label: 'Move to',
  submenu: [
    { label: 'Folder A', onclick: () => moveTo('a') },
    { label: 'Folder B', onclick: () => moveTo('b') },
  ]
};
```

### Resolverrel (popupon belüli használathoz)

```ts
const confirmationItems = [
  { label: 'Confirm', resolveWith: true },
  { label: 'Cancel', resolveWith: false },
];
```

### Középre igazított elem

```ts
const emptyItem = { label: 'No results', centered: true, disabled: true, resolveWith: null };
```

## Mikor használd

Deklaratív akciómenükhöz és beágyazott almenükhöz, amelyek a kurzornál vagy egy elemnél nyílnak.

## Alternatívák

Kiválasztott értékhez a [Select](../forms/select.md), tetszőleges, horgonyzott tartalomhoz a [Popup](popup.md), blokkoló megerősítéshez a [Modal](modal.md) való.

## Beállítás és korlátok

Root alatt nyisd meg, a getPopupManagert a komponens inicializálásakor kérve le. Jobbklikk-menünél hívd meg az event.preventDefault()-ot, és használd a `{ pos: event }`-et; az `{ anchor: event }` ehelyett a currentTargethez pozicionál. Az onclick elemek nem zárják be automatikusan a menüt: az akcióban hívd meg a manager.closeRoot()-ot vagy a resolveRoot(result)-ot. A resolver elemek a gyökérláncot oldják fel, de a `resolveWith: undefined` esetet a kiválasztási ág nem kezeli; használj explicit eredményt vagy closeRootot. Az almenük kattintásra nyílnak. A ContextMenu nem ad teljes menu-role/nyílbillentyűs navigációs szerződést, és nincs általános Escape-figyelője; ne feltételezz natív menü-akadálymentességet.
