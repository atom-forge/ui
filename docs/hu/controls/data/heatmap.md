# Heatmap

SVG-alapú hőtérkép kétdimenziós adathalmazok színskálás megjelenítésére. Tipikus felhasználás: aktivitási naptárak, korrelációs mátrixok, napszak szerinti minták, pontszámrácsok.

A `viewBox` révén teljesen reszponzív, a rácscímkék és a jelmagyarázat színét pedig az aktív témához (világos/sötét) igazítja.

## Import

```ts
import { Heatmap, type HeatmapData, type HeatmapCell } from '@atom-forge/ui';
```

---

## Adatszerkezet

```ts
type HeatmapData = {
  xLabels: string[];   // column headers
  yLabels: string[];   // row headers
  values: number[][];  // values[y][x] — row-major order
};
```

A `values` tömbnek `yLabels.length` sora legyen, mindegyikben `xLabels.length` elemmel. A minimumot és a maximumot automatikusan számolja.

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `data` | `HeatmapData` | — | Kötelező. Tengelycímkék és cellaértékek. |
| `colors` | `string[]` | `['#f0f0f0', '#22c55e']` | Hex színskála; 2 vagy több színpont esetén interpolál. Lineárisan interpolál a minimumtól a maximumig. |
| `showLegend` | `boolean` | `false` | Megjeleníti a színsávos jelmagyarázatot a rács alatt. |
| `legendTitle` | `string` | `''` | A jelmagyarázat sávja fölött megjelenő felirat. |
| `cellSize` | `number` | `16` | Cellaméret SVG-egységben. |
| `labelColor` | `string` | — | Felülírja a tengelycímkék szövegszínét. |
| `labelBg` | `string` | — | Opcionális háttérszín a tengelycímkékhez. |
| `cellPadding` | `number` | `2` | A cellák közötti rés (SVG-egység). |
| `cellBorderRadius` | `number` | `2` | A cellák sarokkerekítése (SVG-egység). |
| `showRowLabels` | `boolean` | `true` | Megjeleníti bal oldalt az Y tengely sorcímkéit. |
| `showColLabels` | `boolean \| 'vertical'` | `false` | `false` = rejtett, `true` = vízszintes, `'vertical'` = 90°-kal elforgatott. |
| `class` | `string` | — | További osztályok a gyökér `<svg>` elemen. |
| `cellClass` | `string` | — | További osztályok minden cella `<rect>` elemén. |
| `oncellClick` | `(detail: HeatmapCell) => void` | — | Cellára kattintáskor vagy billentyűzetes aktiváláskor fut le. |
| `oncellHover` | `(detail: HeatmapCell) => void` | — | Akkor fut le, amikor az egér egy cellára ér. |

---

## Snippetek

| Név | Paraméterek | Leírás |
|------|--------|-------------|
| `tooltip` | `HeatmapCell` | Egyedi tooltip. Ha elhagyod, egy alapértelmezett kártya jelenik meg. |

### HeatmapCell

```ts
type HeatmapCell = {
  xLabel: string;
  yLabel: string;
  value: number;
  x: number;   // column index
  y: number;   // row index
};
```

---

## Billentyűzet és akadálymentesség

- Minden cellán `tabindex="0"` és `aria-label="{xLabel}, {yLabel}: {value}"` van.
- A fókuszált cella accent színű körvonalat kap.
- Az `Enter` / `Space` meghívja az `oncellClick`-et.

---

## Használat

```sveltehtml
<script lang="ts">
  const data = {
    xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    yLabels: ['Morning', 'Midday', 'Afternoon', 'Evening'],
    values: [
      [5, 10, 8, 12, 15, 2, 1],
      [15, 25, 20, 30, 35, 10, 5],
      [20, 30, 28, 35, 40, 15, 8],
      [8, 12, 10, 15, 18, 25, 22],
    ],
  };
</script>

<!-- Default green scale -->
<Heatmap {data} legendTitle="Activity" />

<!-- Multi-stop diverging scale -->
<Heatmap {data} colors={['#fef9c3', '#ca8a04', '#7c2d12']} legendTitle="Score" />

<!-- Custom tooltip + click handler -->
<Heatmap {data} oncellClick={(d) => console.log(d)}>
  {#snippet tooltip(cell)}
    <div class="bg-surface border border-frame rounded-lg px-3 py-2 text-sm shadow-lg">
      <div class="font-semibold">{cell.yLabel}, {cell.xLabel}</div>
      <div class="text-accent">{cell.value}</div>
    </div>
  {/snippet}
</Heatmap>
```

## Mikor használd

Sorfolytonos numerikus mátrixokhoz, ahol a szín aktivitási vagy intenzitási mintákat tesz láthatóvá.

## Alternatívák

Sorozatokat és tengelyeket ábrázoló diagramokhoz a [Charts](charts.md), pontos szöveges összevetéshez a [Table](table.md) való.

## Beállítás és korlátok

Véges értékeket adj, amelyek mindkét címketömbhöz igazodnak; a hiányzó cellák nullaként jelennek meg, a minimum és a maximum viszont csak a megadott értékekből számolódik. Ha a minimum és a maximum egyenlő, a cellák a skála közepére kerülnek. A színinterpoláció 3 vagy 6 jegyű hex színt értelmez, CSS-változót vagy névvel megadott színt nem. A jelmagyarázat és az oszlopcímkék alapból ki vannak kapcsolva. A hover callbackek az egér belépésekor futnak, kilépéskor nem adnak értéket. A tooltip helyben pozicionált tartalom, így nincs szükség Rootra; egérrel vezérelt, nem fókusszal. Minden cella tabbal elérhető, Enter/Space aktiválással, de nincs nyilas rácsnavigáció vagy virtualizáció; nagy mátrixoknál rengeteg tab-megálló keletkezik.
