# Splitter

Átméretezhető, kétpaneles konténer. A két panelt húzható elválasztó választja el. Támogatja a függőleges (egymás melletti) és vízszintes (egymás alatti) elrendezést, az érintéses eseményeket és a billentyűzetes vezérlést.

## Importálás

```ts
import { Splitter } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | `vertical`: a panelek egymás mellett. `horizontal`: a panelek egymás alatt. |
| `initialSize` | `number` | `50` | Az első panel kezdeti mérete százalékban. Mountoláskor rögzül. |
| `minSize` | `number` | `10` | A panelek minimális mérete (százalék). Húzáskor és billentyűzetes átméretezéskor is érvényes. |
| `class` | `string` | — | További CSS-osztályok az elválasztó elemen. |
| `rootClass` | `string` | — | További CSS-osztályok a gyökér konténeren. |
| `onresize` | `(detail: { start: number; end: number }) => void` | — | Folyamatosan hívódik, amíg a felhasználó húzza az elválasztót. |
| `onresizeend` | `(detail: { start: number; end: number }) => void` | — | Egyszer hívódik, amikor a felhasználó elengedi az elválasztót. |

---

## Snippetek

| Név | Kötelező | Leírás |
|------|----------|-------------|
| `start` | Igen | Az első panel tartalma (függőlegesnél bal, vízszintesnél felső). |
| `end` | Igen | A második panel tartalma (függőlegesnél jobb, vízszintesnél alsó). |
| `divider` | Nem | Egyedi elválasztó fogantyú. Ha elhagyod, egy alapértelmezett vékony vonal jelenik meg. |

---

## Billentyűzet

Ha az elválasztón van a fókusz, a nyílbillentyűk lenyomásonként 1%-kal méreteznek. `Shift` lenyomva 10%-os lépésekben.

| Elrendezés | Csökkentés | Növelés |
|-------------|----------|----------|
| `vertical` | `←` | `→` |
| `horizontal` | `↑` | `↓` |

---

## Használat

```sveltehtml
<!-- Vertical (default) -->
<div class="h-64">
  <Splitter>
    {#snippet start()}
      <div class="p-4 h-full bg-canvas">Left</div>
    {/snippet}
    {#snippet end()}
      <div class="p-4 h-full">Right</div>
    {/snippet}
  </Splitter>
</div>

<!-- Horizontal, custom initial size -->
<div class="h-64">
  <Splitter orientation="horizontal" initialSize={35}>
    {#snippet start()}
      <div class="p-4">Top</div>
    {/snippet}
    {#snippet end()}
      <div class="p-4">Bottom</div>
    {/snippet}
  </Splitter>
</div>

<!-- Custom divider style + resize callback -->
<div class="h-64">
  <Splitter
    initialSize={30}
    minSize={20}
    class="w-2 bg-accent/10 hover:bg-accent/30 cursor-col-resize"
    onresizeend={(d) => console.log(d)}
  >
    {#snippet start()}
      <div class="p-4 h-full bg-canvas">Sidebar</div>
    {/snippet}
    {#snippet end()}
      <div class="p-4 h-full">Content</div>
    {/snippet}
  </Splitter>
</div>
```

## Mikor használd

Két egyszerre látható panelhez, amelyek közötti elválasztót a felhasználó mozgathatja.

## Alternatívák

Egymást kizáró panelekhez a [Tabs](tabs.md), méretezés helyett tartalom feltárásához az [Accordion](accordion.md) való.

## Beállítás és korlátok

Adj méretezett szülőt: a gyökér teljes magasságot használ. Az orientation neve az elválasztóra utal (`vertical` = bal/jobb). Az initialSize-t inicializáláskor egyszer korlátozza; nincs méret-binding vagy későbbi visszaállító prop. Megvalósítható minSize-t adj meg (0–50). Húzás közben resize, elengedéskor resizeend esemény jön; billentyűzetes átméretezésnél mindkét callback azonnal lefut. Ha meg kell őrizni a százalékokat, a resizeendből mentsd őket. Nincs beépített perzisztencia, letiltott mód vagy többpaneles API.
