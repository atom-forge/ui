# Diagramok (Chart.js)

Canvas-alapú diagramkomponensek a [Chart.js](https://www.chartjs.org/) felett. Mindegyik automatikusan az aktív témához (világos/sötét) igazítja a rácsvonalak és a szöveges címkék színét.

## Import

```ts
import { LineChart, CjsBarChart, PieChart, DoughnutChart, ScatterChart, BubbleChart, RadarChart } from '@atom-forge/ui';
```

> **Megjegyzés:** a `CjsBarChart` a Chart.js-es oszlopdiagram. A Diagrams szekcióban lévő, csak CSS-t használó `BarChart` külön komponens marad.

---

## Színpaletta

A sorozatok színeit automatikusan a beépített palettából kapják. Az első szín megegyezik az accent tokennel.

```ts
import { CHART_PALETTE, seriesColor } from '@atom-forge/ui';
// seriesColor(index, optionalOverride) → string
```

---

## LineChart

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `labels` | `string[]` | — | Az X tengely kategóriacímkéi. |
| `datasets` | `LineDataset[]` | — | A sorozatok adatai. |
| `smooth` | `boolean` | `false` | Bézier-görbés simítás (tension 0.4). |
| `options` | `ChartOptions<'line'>` | `{}` | Kiskapu a Chart.js beállításaihoz. |
| `chart` | `Chart` (bindable) | — | A mögöttes Chart.js példány. |
| `class` | `string` | — | További osztályok a canvas elemen. |

### LineDataset

| Mező | Típus | Leírás |
|-------|------|-------------|
| `label` | `string` | A jelmagyarázatban megjelenő sorozatnév. |
| `data` | `number[]` | Címkénként egy érték. |
| `color` | `string` | Felülírja az automatikusan kiosztott sorozatszínt. |
| `fill` | `boolean` | Kitölti a vonal alatti területet (területdiagram). |

```sveltehtml
<LineChart
  labels={['Jan', 'Feb', 'Mar']}
  datasets={[
    { label: 'Revenue', data: [12000, 19000, 15000] },
    { label: 'Expenses', data: [8000, 11000, 9000] },
  ]}
/>

<!-- Smooth area chart -->
<LineChart
  labels={['Mon', 'Tue', 'Wed']}
  smooth
  datasets={[{ label: 'Visitors', data: [420, 380, 510], fill: true }]}
/>
```

---

## CjsBarChart

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `labels` | `string[]` | — | Kategóriacímkék. |
| `datasets` | `BarDataset[]` | — | A sorozatok adatai. |
| `stacked` | `boolean` | `false` | Csoportosítás helyett halmozza az oszlopokat. |
| `horizontal` | `boolean` | `false` | Megfordítja a tengelyeket (vízszintes oszlopok). |
| `options` | `ChartOptions<'bar'>` | `{}` | Kiskapu a Chart.js beállításaihoz. |
| `chart` | `Chart` (bindable) | — | A mögöttes Chart.js példány. |
| `class` | `string` | — | További osztályok a canvas elemen. |

### BarDataset

| Mező | Típus | Leírás |
|-------|------|-------------|
| `label` | `string` | Sorozatnév. |
| `data` | `number[]` | Kategóriacímkénként egy érték. |
| `color` | `string` | Felülírja az automatikusan kiosztott sorozatszínt. |

```sveltehtml
<!-- Grouped (default) -->
<CjsBarChart
  labels={['Q1', 'Q2', 'Q3', 'Q4']}
  datasets={[
    { label: 'Product A', data: [4200, 5800, 4900, 6700] },
    { label: 'Product B', data: [3100, 4200, 5100, 4800] },
  ]}
/>

<!-- Stacked -->
<CjsBarChart labels={['Design', 'Eng']} stacked datasets={[{ label: 'Hours', data: [20, 40] }]} />

<!-- Horizontal -->
<CjsBarChart labels={['CSS', 'TS', 'Svelte']} horizontal datasets={[{ label: 'Score', data: [30, 50, 70] }]} />
```

---

## PieChart

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `labels` | `string[]` | — | Szeletcímkék. |
| `data` | `number[]` | — | Címkénként egy érték. |
| `colors` | `string[]` | — | Opcionális színfelülírás szeletenként. |
| `options` | `ChartOptions<'pie'>` | `{}` | Kiskapu a Chart.js beállításaihoz. |
| `chart` | `Chart` (bindable) | — | A mögöttes Chart.js példány. |

```sveltehtml
<PieChart
  labels={['Direct', 'Social', 'Email']}
  data={[35, 25, 18]}
/>
```

---

## DoughnutChart

Ugyanaz, mint a `PieChart`, egy további `cutout` proppal.

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `labels` | `string[]` | — | Szeletcímkék. |
| `data` | `number[]` | — | Címkénként egy érték. |
| `colors` | `string[]` | — | Opcionális színfelülírások. |
| `cutout` | `string \| number` | `'60%'` | A belső lyuk mérete százalékos stringként vagy pixelben megadott számként. |
| `options` | `ChartOptions<'doughnut'>` | `{}` | Kiskapu a Chart.js beállításaihoz. |
| `chart` | `Chart` (bindable) | — | A mögöttes Chart.js példány. |

```sveltehtml
<DoughnutChart
  labels={['Frontend', 'Backend', 'DevOps']}
  data={[40, 30, 18]}
  cutout="65%"
/>
```

---

## ScatterChart

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `datasets` | `ScatterDataset[]` | — | A sorozatok adatai. |
| `options` | `ChartOptions<'scatter'>` | `{}` | Kiskapu a Chart.js beállításaihoz. |
| `chart` | `Chart` (bindable) | — | A mögöttes Chart.js példány. |

### ScatterDataset

| Mező | Típus | Leírás |
|-------|------|-------------|
| `label` | `string` | Sorozatnév. |
| `data` | `{ x: number; y: number }[]` | Adatpontok. |
| `color` | `string` | Felülírja az automatikusan kiosztott sorozatszínt. |

```sveltehtml
<ScatterChart
  datasets={[
    { label: 'Group A', data: [{ x: 2, y: 4 }, { x: 5, y: 8 }] },
    { label: 'Group B', data: [{ x: 1, y: 9 }, { x: 4, y: 3 }] },
  ]}
/>
```

---

## BubbleChart

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `datasets` | `BubbleDataset[]` | — | A sorozatok adatai. |
| `options` | `ChartOptions<'bubble'>` | `{}` | Kiskapu a Chart.js beállításaihoz. |
| `chart` | `Chart` (bindable) | — | A mögöttes Chart.js példány. |

### BubbleDataset

| Mező | Típus | Leírás |
|-------|------|-------------|
| `label` | `string` | Sorozatnév. |
| `data` | `{ x: number; y: number; r: number }[]` | Adatpontok. Az `r` a buborék sugara pixelben. |
| `color` | `string` | Felülírja az automatikusan kiosztott sorozatszínt. |

```sveltehtml
<BubbleChart
  datasets={[
    { label: 'Products', data: [{ x: 10, y: 20, r: 8 }, { x: 30, y: 40, r: 14 }] },
  ]}
/>
```

---

## RadarChart

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `labels` | `string[]` | — | A radar körüli tengelycímkék. |
| `datasets` | `RadarDataset[]` | — | A sorozatok adatai. |
| `options` | `ChartOptions<'radar'>` | `{}` | Kiskapu a Chart.js beállításaihoz. |
| `chart` | `Chart` (bindable) | — | A mögöttes Chart.js példány. |

### RadarDataset

| Mező | Típus | Leírás |
|-------|------|-------------|
| `label` | `string` | Sorozatnév. |
| `data` | `number[]` | Tengelycímkénként egy érték. |
| `color` | `string` | Felülírja az automatikusan kiosztott sorozatszínt. |
| `fill` | `boolean` | Kitölti a sokszög területét. Alapértéke `true`. |

```sveltehtml
<RadarChart
  labels={['Speed', 'Strength', 'Stamina', 'Agility']}
  datasets={[
    { label: 'Warrior', data: [60, 90, 70, 55] },
    { label: 'Mage', data: [50, 30, 55, 65] },
  ]}
/>
```

---

## Programozott hozzáférés

A nyers Chart.js példányt a `chart` prop bindolásával éred el:

```sveltehtml
<script lang="ts">
  import type { Chart } from 'chart.js';
  let chartInstance = $state<Chart | undefined>();
</script>

<LineChart labels={['Jan', 'Feb']} datasets={[{ label: 'Revenue', data: [12, 19] }]} bind:chart={chartInstance} />

<button type="button" onclick={() => chartInstance?.reset()}>Reset animation</button>
```

---

## Alacsony szintű alap

A `ChartBase` közvetlenül egy teljes `ChartConfiguration` objektumot fogad. Akkor hasznos, ha egyik magas szintű wrapper sem felel meg:

```ts
import { ChartBase } from '@atom-forge/ui';
import type { ChartConfiguration } from 'chart.js';

const config: ChartConfiguration = {
  type: 'line',
  data: { labels: ['Jan', 'Feb'], datasets: [{ label: 'Revenue', data: [12, 19] }] },
  options: { responsive: true },
};
```

```sveltehtml
<ChartBase {config} />
```

## Mikor használd

Trendekhez a LineChart, kategóriák összehasonlításához a CjsBarChart, egy egész részeihez a Pie/Doughnut, numerikus koordinátákhoz a Scatter/Bubble, összevethető többtengelyes profilokhoz a Radar való.

## Alternatívák

Egyszerű DOM-os oszlopokhoz a [BarChart](bar-chart.md), mátrixhoz a [Heatmap](heatmap.md), ha pedig a pontos értékek a fontosak, a [Table](table.md) való.

## Beállítás és korlátok

Nincs szükség Root manager contextre. A wrapperek CSS-ből származtatják a témázott beállításokat, és figyelik a dokumentumgyökér class/data-theme változásait. A canvas példány kliensoldali effectben jön létre, és cleanupkor megsemmisül; a `bind:chart` inicializálás előtt és cleanup után undefined. A config frissítése lecseréli az adatokat és a beállításokat, majd update-et hív; a ChartBase nem hozza létre újra a példányt, ha a config.type változik, ezért diagramtípus-váltáshoz mountold újra. A címkék és az adatok hossza egyezzen. Testreszabásra az options prop szolgál a Chart.js-en keresztül; pluginek nem települnek automatikusan. A canvas kimenetnek nincs beépített szöveges adategyenértéke, és általános attribútum-továbbítás sincs; az akadálymentes címkéket és adatokat rajta kívül add meg. Több wrapper hex alfa-utótagot fűz a dataset-színekhez (például a Line/Radar kitöltéseknél és a Pie/Doughnut szeleteknél), ezért színfelülíráshoz hex színt használj, ne tetszőleges CSS-színszintaxist.
