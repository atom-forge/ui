# Tooltip

Hoverre megjelenő tooltip, amely követi a kurzort, és beállítható késleltetés után jelenik meg. Portálba renderelődik, hogy ne vágódjon le.

## Importálás

```ts
import { Tooltip } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `label` | `string` | — | A tooltipben megjelenő szöveg. A `label` vagy a `content` egyike kötelező. |
| `content` | `Snippet` | — | A tooltipen belül megjelenő egyedi snippet. Elsőbbséget élvez a `label`-lel szemben. |
| `children` | `Snippet` | — | Az elem, amelyhez a tooltip tartozik. |
| `delay` | `number` | `1000` | Késleltetés ms-ban, mielőtt hoverre megjelenik a tooltip. |
| `immediate` | `boolean` | `false` | A `delay={0}` rövidítése — a tooltip hoverre azonnal megjelenik. |
| `inverted` | `boolean` | `false` | Fordított stílus: sötét háttér, világos szöveg. |
| `fixed` | `boolean` | `false` | A kurzor követése helyett a kiváltó elemhez horgonyozza a tooltipet. |
| `class` | `string` | — | További Tailwind-osztályok a kiváltó wrapperen (`inline-block`). |

---

## Működés

- A tooltip `delay` ms után jelenik meg, miután a kurzor belépett a kiváltó területre.
- Az egér elhagyásakor azonnal eltűnik.
- A pozíció a kurzor koordinátáiból számolódik, és átfordul, hogy a viewporton belül maradjon.
- `fixed` esetén a pozíció a kiváltó elem bounding rectjéből számolódik, és egérmozgásra nem frissül.
- Az exportált [`portal`](../../guides/overlays.md#lebegő-elemek-modalban-vagy-drawerben) actionnel a `Root` lebegő rétegébe renderelődik, így az overflow konténerek nem vágják le, és a modalok és drawerek fölött marad.

---

## Használat

```sveltehtml
<!-- Basic -->
<Tooltip label="Save document">
  <Button icon={IconSave}/>
</Tooltip>

<!-- Inverted style -->
<Tooltip label="Dark tooltip" inverted>
  <Button label="Hover me"/>
</Tooltip>

<!-- Rich content via snippet -->
<Tooltip>
  {#snippet content()}
    <div class="flex flex-col gap-1">
      <p class="font-semibold">Alice Johnson</p>
      <p class="text-muted-contrast">alice@example.com</p>
    </div>
  {/snippet}
  <Button label="Rich tooltip"/>
</Tooltip>

<!-- Custom delay -->
<Tooltip label="This field is required" delay={300}>
  <Input bind:value={name} invalid placeholder="Name"/>
</Tooltip>

<!-- Instant tooltip -->
<Tooltip label="Copy to clipboard" immediate>
  <button>Copy</button>
</Tooltip>

<!-- Fixed — anchored to element, not cursor -->
<Tooltip label="Anchored tooltip" fixed>
  <Button label="Fixed"/>
</Tooltip>
```

## Mikor használd

Kiegészítő hover-szöveghez, nem olyan információhoz, amely a feladat elvégzéséhez szükséges.

## Alternatívák

Mindig elérhető segítséghez a [Field](../forms/field.md) hintjei, interaktív tartalomhoz a [Popup](popup.md) való.

## Beállítás és korlátok

Nem kell popup manager context. A Root adja az előnyben részesített portálcélt; nélküle a tooltip a document.body-ra esik vissza. A content elsőbbséget élvez a labellel szemben. Az egér elhagyása törli a késleltetést és elrejti a tooltipet; fixed módban a pozíció megjelenéskor számolódik, nem követi folyamatosan az elem görgetését és átméretezését. A pozicionálás viewport-heurisztikát használ, nem mért ütközéskerülést tetszőleges tooltipméretekhez. Nincs fókuszra megjelenés, Escape-kezelés, tooltip szerep vagy automatikus aria-describedby kapcsolat. A lényeges segítség és az akciók címkéi hover nélkül is legyenek elérhetők.
