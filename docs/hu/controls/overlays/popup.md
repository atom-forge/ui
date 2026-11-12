# Popup

Lebegő overlay rendszer horgonyzott, ideiglenes tartalomhoz — context menükhöz, dropdownokhoz, almenükhöz, tooltipekhez. Támogatja a kurzorhoz és elemhez horgonyzást, a viewport-negyed alapú pozicionálást, a promise alapú eredményeket és az egymásba ágyazott popup-hierarchiákat. A pozicionálás nem méri a popup méretét, és nem garantálja, hogy ütközés nélkül elfér a viewportban.

---

## Importálás

```ts
import { Root, PopupContainer, createPopupManager, getPopupManager } from '@atom-forge/ui';
```

## Komponensek és exportok

| Export | Leírás |
|--------|-------------|
| `PopupContainer` | Megjeleníti az aktív popupot. Helyezz el egyet globálisan (ezt a `Root` elintézi), vagy csomagolj be vele tartalmat egy hatókörhöz kötött gyerek managerhez. |
| `createPopupManager()` | Létrehoz egy `PopupManager`-t, és regisztrálja a Svelte contextben. A `Root` automatikusan meghívja. |
| `getPopupManager()` | Visszaadja a Svelte contextből a legközelebbi `PopupManager`-t. |
| `PopupManager` | A popup állapotát, a megnyitást, a bezárást és a feloldást kezelő osztály. |

---

## Beállítás

A globális beállítást a `Root` automatikusan elvégzi — kézi konfiguráció nem kell.

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

Kézi beállítás (`Root` nélkül):

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

Svelte-snippetet megjelenítő popupot nyit.

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

Svelte-komponenst megjelenítő popupot nyit. Akkor hasznos, ha a popup külön fájlban van definiálva.

```ts
import MyDropdown from './MyDropdown.svelte';
popupManager.open.component(MyDropdown, { items }, { anchor: event, align: 'left' });
```

Mindkét metódus `Promise<any>`-t ad vissza. Az explicit `resolve()` lezárja az aktuális/függő tartalmat, az elfogadott `close()` pedig `undefined`-dal zárja le az aktív popupot; ne feltételezd, hogy minden csere vagy átfedő megnyitás lezárja a korábbi promise-okat (lásd a korlátokat lent). A `ref` az opcionális negyedik argumentum, nem pozicionálási tulajdonság; egyező aktív ref esetén a meglévő promise-t kapod vissza.

---

## Bezárás és feloldás

| Metódus | Leírás |
|--------|-------------|
| `close()` | Ütemezi az aktív popup bezárását `undefined`-dal; a megnyitási védelem alatt figyelmen kívül marad, és nem törli a függő megnyitást. |
| `resolve(value?)` | Bezárja a popupot, és a promise-t a `value` értékkel oldja fel. |
| `closeRoot()` | Meghívja a gyökér manager késleltetett `close()`-át; a hatókörhöz kötött gyerek promise-okat nem zárja le explicit módon. |
| `resolveRoot(value?)` | Beágyazott popupoknál a gyökér manager promise-át oldja fel a `value` értékkel. |

```sveltehtml
<!-- Inside a popup snippet -->
<Button label="Confirm" onclick={() => popupManager.resolve('confirmed')}/>
<Button label="Cancel" ghost onclick={() => popupManager.close()}/>
```

### Eredmények megvárása

```ts
const result = await popupManager.open.snippet(myPopup, {}, { anchor: event });
if (result === 'confirmed') { /* handle */ }
```

## Navigáció

Ha a Root telepítve van, route-navigációkor a `resolveRoot(undefined)` hívódik, amely törli a gyökér manager aktuális popupját és a nyilvántartott függő megnyitást. A hatókörhöz kötött gyerek promise-okat a gyökér manager nem zárja le explicit módon. Navigációkor a Modal és a Drawer overlayek is törlődnek; a Toast értesítések láthatók maradnak.

---

## Pozicionálási argumentumok

Az `open.snippet` / `open.component` harmadik paramétere szabályozza a pozicionálást.

| Tulajdonság | Típus | Alapérték | Leírás |
|----------|------|---------|-------------|
| `pos` | `{ clientX, clientY }` | — | A kurzorhoz pozicionálja a popupot. Kizárja az `anchor`-t. |
| `anchor` | `Element \| MouseEvent` | — | Egy DOM-elemhez képest pozicionálja a popupot. `MouseEvent` átadásakor annak `currentTarget`-jét használja. |
| `align` | `'auto' \| 'left' \| 'right' \| 'both' \| 'side'` | `'auto'` | Vízszintes igazítás. Lásd lent. |
| `offset` | `number` | `4` | Horgonyzott popup távolsága; `0` esetén `4`-re esik vissza. Kurzoros pozicionálásnál mindig `4`. |

### Igazítási módok

| Érték | Működés |
|-------|----------|
| `auto` | Balra igazít, ha a horgony a képernyő bal felén van, egyébként jobbra. |
| `left` | A popup bal szélét a horgony bal széléhez igazítja. |
| `right` | A popup jobb szélét a horgony jobb széléhez igazítja. |
| `both` | A popup felveszi a horgony szélességét (min-width). Teljes szélességű dropdownokhoz ideális. |
| `side` | A horgonytól jobbra vagy balra nyílik, annak felső vagy alsó széléhez igazítva. Almenükhöz használatos. |

Nem `side` igazításnál a függőleges pozíció automatikus: lefelé nyílik, ha a horgony közepe a viewport felső felében van, egyébként felfelé. A `side` a horgony felső vagy alsó széléhez igazít. Egyik mód sem méri a popup méretét a kilógás megelőzésére.

---

## Beágyazott popupok

Csomagold a popup tartalmát `<PopupContainer>`-be, hogy elszigetelt gyerek managert hozz létre. A gyerek manager önállóan nyithat saját popupokat. A `resolveRoot()`-tal egy eredményt továbbíthatsz a gyökér promise-ig.

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

A szülő komponensben importáld a `NestedMenu`-t, és gyökér popup-tartalomként jelenítsd meg a `<PopupContainer><NestedMenu/></PopupContainer>`-t. A külön gyerekkomponens szükséges: egy snippet lexikális contextje nem válik a hatókörhöz kötött konténer contextjévé, a `getPopupManager()`-t pedig nem szabad template-renderelés közben hívni.

Az almenü megnyitási hívásában a `ref` paraméter a meglévő aktív popup promise-át használja újra, ahelyett, hogy újranyitná.

---

## Felépítés

```
Root
  └── createPopupManager()          → root PopupManager in context
       └── PopupContainer (global)  → renders root popup

Inside a popup snippet:
  PopupContainer (scoped)
    └── createPopupManager(parent)  → child PopupManager in context
         └── PopupContainer         → renders child popup
```

- A gyökér `PopupContainer` a `window` click/contextmenu eseményeire figyel, hogy bezárja a popupot.
- Minden hatókörhöz kötött `PopupContainer` saját figyelőt ad hozzá, így a gyerek popupon belüli kattintás nem buborékol fel a szülő bezárásáig (a popup elemen a kattintás terjedése le van állítva).
- Az `ignoreClose` és egy 100 ms-os timeout megakadályozza, hogy ugyanaz a kattintás azonnal visszavonja a megnyitást.
- Amíg egy horgonyzott popup nyitva van, a pozíció minden animációs képkockában újraszámolódik, így helyesen követi a görgetést és az átméretezést.

## Mikor használd

Horgonyzott, átmeneti tartalomhoz, dropdownokhoz vagy beágyazott menükhöz promise alapú eredményekkel.

## Alternatívák

Csak hoverre megjelenő magyarázatokhoz a [Tooltip](tooltip.md), konfigurált akciókhoz a [ContextMenu](context-menu.md), blokkoló feladathoz a [Modal](modal.md) való.

## Beállítás és korlátok

A Root létrehozza a globális managert és konténert. A kézi providereket komponens-inicializáláskor kell létrehozni, és a fogyasztóknak a leszármazottjaiknak kell lenniük. A hatókörhöz kötött PopupContainer gyerek contextet hoz létre; ezt a gyerek managert egy a konténer alatt inicializált komponensben kérd le, ne egy kívül elkapott managert használj újra. Egy manager egyetlen aktív popupot tart, nem általános stacket. Kerüld az átfedő megnyitásokat: egy új megnyitás ütemezi a cserét anélkül, hogy megbízhatóan lezárná az előző aktív promise-t, és a timer lefutása előtti ismételt megnyitások felülírhatják a függő resolvert. Ne számíts arra, hogy a csere befejezi a korábbi awaiteket. A ref-et negyedik open argumentumként add át; az ismételt, egyező ref a meglévő promise-t adja vissza. A `close()` késleltetett, és a megnyitás utáni első 100 ms-ban figyelmen kívül marad; a `resolve()` azonnal feloldja az aktuális/függő tartalmat. Nincs általános Escape-kezelő vagy fókuszcsapda: a billentyűzetes bezárás és a fókusz a popup tartalmának a dolga. Ha a popup tartalma Escape-re bezárul, hívja meg az event.preventDefault()-ot, és a documenten vagy a saját elemén figyeljen, ne a windowon, hogy egy befoglaló modal vagy drawer nyitva maradjon; a beépített pickerek és dropdownok így működnek. Ha eseményhorgonyt használsz, az await előtt ments el egy valódi elemet, mert a currentTarget csak az esemény kiküldése alatt érhető el.
