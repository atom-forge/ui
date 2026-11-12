# MeterGroup és MeterGroupLegend

Szegmentált vízszintes (vagy függőleges) sáv, amely egy egészen belüli arányokat mutat. Minden szegmens egy kategória, a mérete az értékéhez igazodik. A `MeterGroupLegend` komponens ugyanannak az adathalmaznak a címkéit és értékeit jeleníti meg.

## Import

```ts
import { MeterGroup, MeterGroupLegend } from '@atom-forge/ui';
```

## MeterGroup

### Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `items` | `MeterItem[]` | kötelező | A megjelenítendő szegmensek. |
| `max` | `number` | az értékek összege | A 100%-nak megfelelő összérték. Ha nagyobb az összegnél, a maradék semleges kitöltéssel jelenik meg. |
| `vertical` | `boolean` | — | Függőlegesen jeleníti meg a sávot. A magasságot `class`-szal állítsd; a méretpropok a szélességet szabályozzák. |
| `compact` | `boolean` | — | Kompakt méret, vékonyabb sáv. |
| `small` | `boolean` | — | Kis méret, a legvékonyabb sáv. |
| `segment` | `Snippet<[MeterItem]>` | — | Belső tartalom szegmensenként (például tooltip). |
| `onsegmentclick` | `(item: MeterItem) => void` | — | Szegmensre kattintáskor hívódik. |
| `segmentClass` | `string` | — | További osztályok minden szegmenselemen. |
| `class` | `string` | — | Osztályok a gyökérelemen (magassághoz, lekerekítéshez). |

### MeterItem típus

```ts
type MeterItem = {
  id: string;
  label: string;
  value: number;
  color: string; // any valid CSS color
};
```

### Méretek

| Méret | Vízszintes (magasság) | Függőleges (szélesség) |
|------|---------------------|------------------|
| normal (alapértelmezett) | `h-4` | `w-4` |
| compact | `h-3` | `w-3` |
| small | `h-2` | `w-2` |

Tetszőleges mérethez írd felül `class`-szal.

### Akadálymentesség

A gyökér div `role="meter"` szerepet kap `aria-valuemin`, `aria-valuemax` és `aria-valuenow` attribútumokkal. További attribútumok (például `aria-label`) közvetlenül propként átadhatók.

## MeterGroupLegend

### Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `items` | `MeterItem[]` | kötelező | Ugyanaz a tömb, mint a MeterGroupnál. |
| `vertical` | `boolean` | — | Egymás alá rendezi az elemeket, az értékeket jobbra tolja. |
| `compact` | `boolean` | — | Kompakt méret, kisebb szöveg és színminta. |
| `small` | `boolean` | — | Kis méret, a legkisebb szöveg és színminta. |
| `showValues` | `boolean` | `true` | Megjeleníti a számértékeket a címkék mellett. |
| `item` | `Snippet<[MeterItem]>` | — | A teljes listaelemet lecseréli. |
| `value` | `Snippet<[MeterItem]>` | — | Csak az érték részt cseréli le. |
| `onitemclick` | `(item: MeterItem) => void` | — | Jelmagyarázat-elemre kattintáskor hívódik. |
| `itemClass` | `string` | — | Osztályok minden `<li>` elemen. |
| `swatchClass` | `string` | — | Osztályok a színmintán. |
| `labelClass` | `string` | — | Osztályok a címke szövegén. |
| `valueClass` | `string` | — | Osztályok az érték szövegén. |
| `class` | `string` | — | Osztályok a gyökér `<ul>` elemen. |

## Példa

```sveltehtml
<script lang="ts">
  import { MeterGroup, MeterGroupLegend } from '@atom-forge/ui';

  const items = [
    { id: 'docs', label: 'Documents', value: 25, color: '#3b82f6' },
    { id: 'photos', label: 'Photos', value: 40, color: '#10b981' },
    { id: 'apps', label: 'Apps', value: 15, color: '#f59e0b' },
  ];
</script>

<!-- Horizontal -->
<MeterGroup {items} class="h-4" />
<MeterGroupLegend {items} />

<!-- Vertical -->
<MeterGroup {items} vertical class="h-40" />
<MeterGroupLegend {items} vertical />

<!-- Sizes -->
<MeterGroup {items} compact />
<MeterGroupLegend {items} compact />
```

## Mikor használd

Egy összeghez való hozzájárulások megjelenítésére, a címkékhez és értékekhez kísérő jelmagyarázattal.

## Alternatívák

Egyetlen készültségi mutatóhoz a [ProgressBar](../forms/progress-bar.md) vagy a [ProgressRing](progress-ring.md), tengelyekhez és több sorozathoz a [Charts](charts.md) való.

## Beállítás és korlátok

Ugyanazokat az elemeket add át a sávnak és a jelmagyarázatnak; nincs közös context vagy binding, ami szinkronban tartaná őket. Nemnegatív értékeket adj, és legalább az összegükkel egyenlő maxot. A szegmensek flex-súlya az értékekből és az esetleges maradékból adódik; kisebb max nem vágja le a szegmenseket a maxra, és ellentmondásossá teheti a meter ARIA-összértékeit. Függőleges sávnál adj meg magasságot. A méret- és irányfüggő stílus inicializáláskor rögzül. A kattintási callbackek div/li elemeken futnak, billentyűzetes aktiválás nélkül; egyedi interaktív tartalomnál a billentyűzetes viselkedésről neked kell gondoskodnod. Tetszőleges attribútumokat (például aria-label) csak a MeterGroup továbbít, a jelmagyarázat nem.
