# Drawer

A képernyő bármelyik széléhez rögzített, beúszó panel. Imperatívan, a `getDrawerManager()`-rel nyitod meg. Támogatja az aszinkron feloldást — az `open()` egy Promise-t ad vissza, amely a drawer bezárásakor oldódik fel.

## Importálás

```ts
import { getDrawerManager } from '@atom-forge/ui';
```

A `Root` automatikusan biztosítja a drawer managert, és megjeleníti az overlayt. Kézi beállítás nem kell.

---

## DrawerManager API

A managert a `<Root>` fán belül bárhol lekérheted:

```ts
const drawer = getDrawerManager();
```

### `drawer.open(component, props?, options?)`

Megnyit egy drawert, és egy `Promise<T>`-t ad vissza, amely a `drawer.close(result)` hívásakor oldódik fel.

| Paraméter | Típus | Leírás |
|-----------|------|-------------|
| `component` | `Component` | A drawerben megjelenítendő Svelte-komponens. |
| `props` | `object` | A komponensnek átadott propok. |
| `options` | `DrawerOptions` | Pozíció, méret, class, closable, key. |

### `drawer.close(result?)`

Bezárja a legutóbb megnyitott drawert, és a promise-át a `result` értékkel oldja fel.

---

## DrawerOptions

| Opció | Típus | Alapérték | Leírás |
|--------|------|---------|-------------|
| `position` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Melyik szélről úszik be a drawer. |
| `size` | `'normal' \| 'compact' \| 'small'` | `'normal'` | Bal/jobb drawernél a panel szélessége, felső/alsó drawernél a magassága. |
| `class` | `string` | — | A drawer panelre fésült további Tailwind-osztályok. Felülírhatják az alapértelmezett szélességet vagy magasságot. |
| `closable` | `boolean` | `true` | Bezárja-e a drawert a backdropra kattintás és az Escape. Az Escape-et figyelmen kívül hagyja, ha egy belső elem már kezelte (`event.preventDefault()`). |
| `key` | `string` | — | Megakadályozza, hogy azonos kulccsal még egy drawer nyíljon, amíg az egyik aktív. |

### Méretek

| Méret | Bal/jobb szélesség | Felső/alsó magasság |
|------|------------------|-------------------|
| `small` | `w-80` (320px) | `h-48` (192px) |
| `compact` | `w-96` (384px) | `h-64` (256px) |
| `normal` | `w-128` (512px) | `h-96` (384px) |

A `class` az alapértelmezett panelosztályok után fésülődik be, így a méret-utilityk felülírhatják a nevesített méretet:

```ts
drawer.open(MyPanel, {}, {
  position: 'bottom',
  size: 'compact',
  class: 'h-19',
});
```

---

## Használat

```sveltehtml
<script lang="ts">
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

### A drawer komponensen belül

```sveltehtml
<script lang="ts">
  const drawer = getDrawerManager();
</script>

<div class="p-6 flex flex-col h-full">
  <h2>Settings</h2>
  <div class="grow">...</div>
  <Button label="Save" onclick={() => drawer.close('saved')}/>
</div>
```

---

## Egymásra rétegzés

A Drawer és a Modal egy közös belső overlay-stacket és egy közös renderert használ. A drawer után nyitott modal, vagy a modal után nyitott drawer automatikusan a korábbi overlay fölött jelenik meg. A Popup és a Toast ezen a stacken kívül marad, a saját, mindig legfelső rétegükön.

Minden drawernek saját, teljes képernyős kattintásfogója van. Egyetlen látható backdrop-réteg ül közvetlenül a legfelső overlay alatt; az overlayek kattintásfogói átlátszók maradnak, így a backdrop színe nem adódik össze, és az aktív overlay vizuálisan tiszta marad.

## Navigáció

Route-navigációkor minden aktív Modal és Drawer overlay bezárul, a függő promise-aik pedig `undefined`-dal oldódnak fel. Ez a takarítás figyelmen kívül hagyja a `closable: false`-t, mert a `closable` csak a felhasználói bezárást szabályozza, a route életciklusához kötött takarítást nem. A toastok navigáció után is láthatók maradnak.

## Backdrop stílusa

A látható backdrop a könyvtár témájának felülírható `.overlay-backdrop` osztályát használja. Ezt az osztályt az `@atom-forge/ui` után betöltött saját stíluslapodban felülírhatod:

```css
@layer components {
  .overlay-backdrop {
    @apply bg-black/30 dark:bg-black/40;
  }
}
```

A CSS tulajdonságonként kaszkádol. Ha egy későbbi felülírásnak el kell távolítania egy backdrophoz kapcsolódó deklarációt, például a blurt, ugyanarra a tulajdonságra kell versengő deklarációt adnia. Az alapértelmezett drawer-backdrop nem használ `backdrop-filter`-t.

## Mikor használd

Szélhez rögzített inspectorhoz, beállításpanelhez vagy másodlagos feladathoz.

## Alternatívák

Középre igazított, blokkoló megerősítéshez a [Modal](modal.md), horgonyzott tartalomhoz a [Popup](popup.md), állandó panelhez a [Splitter](../layout/splitter.md) való.

## Beállítás és korlátok

Root alatt jelenítsd meg, és a getDrawerManagert egy leszármazott komponens inicializálásakor kérd le. A befejezést az open megvárásával kapd el; az undefined bezárást/navigációt vagy duplikált kulcs miatti elnyomást jelent. A kulcsok a drawereken belül deduplikálnak; egy egyező modal-kulcs külön kezelődik. A close az utolsó drawert célozza, nem feltétlenül az összes közül legfelső overlayt. A closable a backdropos és az Escape-es bezárást is szabályozza; a programozott close ettől függetlenül működik. A közös renderer nem ad fókuszcsapdát/fókusz-visszaállítást, akadálymentes dialógusnevet vagy globális body overflow-zárolást. Ha a munkafolyamat igényli, ezeket a panel tartalmában valósítsd meg.
