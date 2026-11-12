# Overlay-folyamatok összeállítása

Az overlayt a feladat interakciós szerződése alapján válaszd, ne a megjelenése szerint. Felhasználói műveletből nyisd meg, ahol indokolt, várd meg (await) a döntést, és csak utána hajtsd végre az alkalmazásműveletet.

## Választás feladat szerint

| Feladat | Vezérlő/API | Szerződés |
|---|---|---|
| Blokkoló művelet megerősítése | [Modal](../controls/overlays/modal.md) manager | Egy komponens vagy snippet eredményét várod meg. |
| Megtekintés/szerkesztés a képernyő széléről | [Drawer](../controls/overlays/drawer.md) manager | A befejezést várod meg; a modallal közös overlay-stacket használ. |
| Horgonyzott, átmeneti tartalom | [Popup](../controls/overlays/popup.md) manager | Adj meg elem/esemény horgonyt vagy kurzorpozíciót. |
| Konfigurált helyi műveletek | [ContextMenu](../controls/overlays/context-menu.md) | Saját menü kitalálása helyett a konfigurációs API-ját használd. |
| Nem blokkoló visszajelzés a befejezésről | [Toast](../controls/overlays/toast.md) manager | A `show` azonnal egy ID-t ad vissza, nem promise-t. |
| Kiegészítő súgó hoverre | [Tooltip](../controls/overlays/tooltip.md) | Nem helyettesíti a nélkülözhetetlen labeleket vagy a billentyűzettel elérhető súgót. |
| Bindolt fókuszmódú nézet | [Zen](../controls/overlays/zen.md) | Modal-eredmények helyett a kívülről vezérelt állapotát használd. |

## Beállítás

Töltsd be a Tailwind 4-et és a könyvtár témáját, a `dist` szkenneléssel együtt, ahogy az [Első lépések](getting-started.md#css-beállítása) leírja. Importáld ezt a stíluslapot, és egyszer add meg a Rootot:

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

A Root hozza létre a managereket, a containereket és a portal célpontot. A managereket egy **leszármazott komponens** inicializálásakor kérd le — ne abban a layout scriptben, amelyik a Rootot rendereli, és ne eseménykezelőn belül.

## Recept: törlés megerősítése, majd értesítés

Teljes gyerek oldalkomponens. A törlés csak a helyi állapotot módosítja. A snippet miatt nincs szükség egy nem definiált külső dialóguskomponensre.

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

Csak a `true` engedélyezi a helyi módosítást. A háttérre kattintásos/Escape-es bezárás, a navigáció vagy a duplikált kulcs miatti elnyomás `undefined`-dal is feloldódhat. A `modal.close` az adott fajtájú utolsó modalt célozza; ne kezeld egy tetszőleges korábbi dialógus handle-jeként. Újrafelhasználható dialóguskomponenshez inkább a `modal.open(Component, props, options)` formát használd.

## Lebegő elemek modalban vagy drawerben

A modalok és drawerek z-index szerint egymásra rakott, rögzített rétegek. Egy `<body>`-hoz fűzött, alacsonyabb z-indexű egyedi lebegő elem (lenyíló lista, eszköztár, menü) a nyitott modal mögé kerül. Az exportált `portal` actionnel mozgasd át abba a lebegő rétegbe, amelyet a Root a modalok és drawerek fölé renderel:

```sveltehtml
<script lang="ts">
  import { portal } from '@atom-forge/ui';
  let { open, x, y }: { open: boolean; x: number; y: number } = $props();
</script>

{#if open}
  <div use:portal class="fixed rounded-surface border border-frame bg-surface p-2 shadow-lg" style:left="{x}px" style:top="{y}px">
    Menu content
  </div>
{/if}
```

- A `portal(node, target?)` a node-ot a lebegő réteghez fűzi, vagy a `target`-hez (CSS szelektor vagy elem). Root nélkül, vagy ha a célpont hiányzik, a `document.body`-ra esik vissza. A node az elem megsemmisülésekor eltávolításra kerül.
- Rétegrend: modalok és drawerek < a lebegő réteg (Tooltip és a portalozott elemeid) < a Popup managerrel nyitott popupok. Egy portalozott menüből nyitott popup ezért a menü fölött jelenik meg.
- A `portal`-t olyan elemekhez válaszd, amelyek maguk pozicionálják magukat és nyitva maradnak (a kijelölést követő eszköztár, gépelés közben nyitott lenyíló lista). A [Popup](../controls/overlays/popup.md) managert egyszeri popuphoz válaszd, amely megnyitáskor horgonyzódik, bármilyen külső kattintásra bezárul, és egy válasszal oldódik fel.

### Escape modalban vagy drawerben

Az Escape a legfelső bezárható modalt vagy drawert zárja be, hacsak egy elem már le nem kezelte `event.preventDefault()`-tal. A modal a `window`-n figyel, ezért annak a kezelőnek, amelyik nyitva akarja tartani, előbb kell lefutnia: tedd magára az elemre vagy a `document`-re, ne a `window`-ra, és hívd meg a `preventDefault()`-ot, amikor a saját lenyíló listádat vagy menüdet zárja be. Az a lebegő elem, amelyiknek egy nyitott Zen fölött is nyernie kell, a capture fázisban figyeljen (`<svelte:document onkeydowncapture>`), ahogy a beépített pickerek, a Select, a MultiSelect és a TagEditor teszik; a Zen a `document`-en, bubble fázisban figyel, és figyelmen kívül hagyja a már lekezelt Escape-et.

## Az alkalmazás feladatai

- A helyi módosítást cseréld jogosultsághoz kötött perzisztenciára, kezeld a hibákat, és tartsd fenn a függőben lévő állapotot, amíg a munka be nem fejeződik. A megerősítés nem validáció és nem jogosultságellenőrzés.
- A recept ad nevet a dialógusnak és tartós státuszszöveget, de **nem valósít meg fókuszcsapdát, kezdeti fókuszt, fókusz-visszaállítást és a body görgetésének zárolását**. Ezeket valósítsd meg, mielőtt éles modalként használnád. A renderer ezeket nem adja automatikusan.
- A popup tartalma felel a billentyűzetes bezárásért és a fókuszért. Az await előtt rögzítsd a tényleges horgonyelemet; egy esemény `currentTarget`-je csak a dispatch alatt érhető el.
- A Modal, a Drawer és a Popup route-navigációkor bezárul; a Toast megmarad. Ne következtess arra, hogy a bezárás megszakít egy folyamatban lévő alkalmazáskérést.
- A Toastnak nincs beépített live-region szerepe. A fontos visszajelzést tedd tőle függetlenül is akadálymentessé; a toast műveletei azonnal bezárják az értesítést, nem várják meg az aszinkron callbackeket.
- A Tooltipnek nincs fókuszra aktiválódó triggere, és nem társít automatikusan akadálymentes leírást. A nélkülözhetetlen utasításokat hover nélkül is tartsd láthatóan.
