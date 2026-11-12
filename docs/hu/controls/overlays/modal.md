# Modal

Imperatív modal rendszer. Bármely Svelte-komponenst egymásra rétegezhető modal dialógusként nyithatsz meg a `getModalManager()`-rel. Az `open()` egy Promise-t ad vissza, amely a modal bezárásakor oldódik fel.

## Importálás

```ts
import { getModalManager } from '@atom-forge/ui';
```

A `Root` automatikusan biztosítja a modal managert, és megjeleníti a közös Modal/Drawer overlay-konténert. Kézi beállítás nem kell.

---

## ModalManager API

A managert a `<Root>` fán belül bárhol lekérheted:

```ts
const modal = getModalManager();
```

### `modal.open(component, props?, options?)`

Modalként nyit meg egy komponenst. `Promise<any>`-t ad vissza, amely a `modal.close()`-nak átadott értékkel oldódik fel.

| Paraméter | Típus | Leírás |
|-----------|------|-------------|
| `component` | `Component` | A megjelenítendő Svelte-komponens. |
| `props` | `object` | A komponensnek átadott propok. |
| `options` | `ModalOptions \| string` | Opcionális viselkedés. A visszafelé kompatibilitás miatt egy string deduplikációs `key`-ként értelmeződik. |

### `modal.openSnippet(snippet, props?, options?)`

Egy Svelte-snippetet nyit meg modalként.

### `modal.close(result?)`

Bezárja a legutóbb megnyitott modalt, és a promise-át a `result` értékkel oldja fel.

### `modal.resolve(result?)`

A `close` aliasa.

---

## ModalOptions

| Opció | Típus | Alapérték | Leírás |
|--------|------|---------|-------------|
| `closable` | `boolean` | `true` | Bezárhatja-e a modalt a backdropra kattintás és az Escape. Az Escape-et figyelmen kívül hagyja, ha egy belső elem már kezelte (`event.preventDefault()`). A programozott `close()` ettől függetlenül működik. |
| `key` | `string` | — | Megakadályozza, hogy azonos kulccsal még egy modal nyíljon, amíg az egyik aktív. |

---

## Használat

```sveltehtml
<script lang="ts">
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

### A modal komponensen belül

```sveltehtml
<script lang="ts">
  let { message }: { message: string } = $props();
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

### Snippet megnyitása

```sveltehtml
<script lang="ts">
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

## Egymásra rétegzés

A modalok egymásra rétegződnek — minden `open()` hívás új réteget ad hozzá. A `close()` a legutóbb megnyitott modalt távolítja el, akkor is, ha egy drawer van fölötte. Ezzel többlépéses folyamatokat építhetsz.

A Modal és a Drawer egy közös belső overlay-stacket és egy közös renderert használ. A modal után nyitott drawer, vagy a drawer után nyitott modal automatikusan a korábbi overlay fölött jelenik meg. A Popup és a Toast ezen a stacken kívül marad, a saját, mindig legfelső rétegükön.

Minden modalnak saját, teljes képernyős kattintásfogója van. Egyetlen látható backdrop-réteg ül közvetlenül a legfelső overlay alatt; az overlayek kattintásfogói átlátszók maradnak, így a backdrop színe nem adódik össze, és az aktív overlay vizuálisan tiszta marad.

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

A CSS tulajdonságonként kaszkádol. Ha egy későbbi felülírásnak el kell távolítania egy backdrophoz kapcsolódó deklarációt, például a blurt, ugyanarra a tulajdonságra kell versengő deklarációt adnia. Az alapértelmezett modal-backdrop nem használ `backdrop-filter`-t.

## Mikor használd

Blokkoló megerősítéshez vagy feladathoz, tetszőleges komponens- vagy snippet-tartalommal.

## Alternatívák

Szélső panelhez a [Drawer](drawer.md), horgonyzott, átmeneti tartalomhoz a [Popup](popup.md), kívülről bindolt fókuszmódhoz a [Zen](zen.md) való.

## Beállítás és korlátok

Csomagold az alkalmazást Rootba, amely inicializálja a managereket és a közös renderert. A getModalManagert egy leszármazott komponens inicializálásakor hívd, ne egy context nélküli, tetszőleges segédfüggvényből. Az eredményért várd meg az opent, és számolj azzal, hogy bezáráskor/navigációkor/deduplikációkor undefined jön. Duplikált kulcsnál az új hívás azonnal undefined-dal oldódik fel; nem a meglévő promise-t adja vissza. A close az adott fajta legutóbb megnyitott modalját célozza, akkor is, ha egy drawer van fölötte; a felhasználói bezárás csak az összes közül legfelső, bezárható overlayt érinti. A renderer nem ad dialógusnevet, fókuszcsapdát, automatikus fókusz-visszaállítást vagy globális body overflow-zárolást: a szükséges dialógusszemantikát és fókuszkezelést a tartalomban valósítsd meg.
