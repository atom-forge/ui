# BarChart

Reszponzív oszlopdiagram egyértékű, többsorozatos csoportosított és halmozott elrendezéssel. Hoverre lebegő tooltipet mutat.

## Import

```ts
import { BarChart } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `data` | `ChartData[]` | — | A diagram adatai. Minden elem egy oszlopcsoport. |
| `series` | `Series[]` | — | Sorozat-metaadatok (név, szín) a tooltiphez és az alapértékekhez. |
| `variant` | `'grouped' \| 'stacked'` | `'grouped'` | Hogyan jelenjenek meg a több szegmensből álló oszlopok. |
| `showInfo` | `boolean` | `true` | Megjelenjen-e a hover tooltip. |
| `class` | `string` | — | További Tailwind osztályok. |

---

## Típusok

```ts
type ChartData = {
  label: string;       // X-axis label
  value?: number;      // Single-series shorthand
  values?: ChartSegment[];  // Multi-series
};

type ChartSegment = {
  value: number;
  color?: string;   // CSS color string
  label?: string;
};

type Series = {
  name: string;   // Shown in tooltip
  color: string;  // CSS color (e.g. 'var(--color-accent)')
};
```

---

## Használat

### Egy sorozat

```sveltehtml
<BarChart
  data={[
    { label: 'Jan', value: 40 },
    { label: 'Feb', value: 75 },
    { label: 'Mar', value: 55 },
  ]}
  series={[{ name: 'Value', color: 'var(--color-accent)' }]}
  class="h-48"
/>
```

### Több sorozat, csoportosítva

```sveltehtml
<BarChart
  data={[
    { label: 'Q1', values: [{ value: 40 }, { value: 60 }] },
    { label: 'Q2', values: [{ value: 55 }, { value: 80 }] },
  ]}
  series={[
    { name: 'Sales', color: 'var(--color-accent)' },
    { name: 'Target', color: 'var(--color-secondary)' },
  ]}
  class="h-48"
/>
```

### Halmozott

```sveltehtml
<BarChart
  variant="stacked"
  data={[{ label: 'Q1', values: [{ value: 40 }, { value: 60 }] }]}
  series={[
    { name: 'Sales', color: 'var(--color-accent)' },
    { name: 'Target', color: 'var(--color-secondary)' },
  ]}
  class="h-64"
/>
```

## Mikor használd

Nemnegatív értékek könnyűsúlyú, DOM-alapú oszlopos megjelenítésére, csoportosítva vagy halmozva.

## Alternatívák

Chart.js tengelyekhez és beállításokhoz a [CjsBarChart](charts.md#cjsbarchart), egy egészen belüli arányokhoz a [MeterGroup](meter-group.md) való.

## Beállítás és korlátok

Adj használható magasságot, és érvényes CSS-színeket a szegmens- vagy sorozatszíneken keresztül. Az egyedi `value` elsőbbséget élvez a `values`-szal szemben. Az oszlopmagasságot a legnagyobb értékkel vagy a legnagyobb halmozott összeggel osztja el; csupa nulla adatnál nullával oszt, negatív értékeket pedig ez az alap elrendezés nem támogat. Adj pozitív maximumú adatot, ne számíts üres vagy nullás állapotú diagramra. Nincs szükség Root- vagy popup-providerre: a tooltip helyi DOM-tartalom, és az egér távozása után 200 ms-mal eltűnik. Nincsenek tengelyek, billentyűzetes tooltipek, kiválasztási események vagy akadálymentes adattáblás tartalék; a szöveges adatot külön állítsd össze.
