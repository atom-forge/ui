# Progress Ring

Kör alakú, SVG-alapú folyamatjelző. Egy gyűrűt vagy több koncentrikus gyűrűt is tud. A `value` változásakor a folyamatív CSS `stroke-dashoffset` transitionnel, simán animál.

## Import

```ts
import { ProgressRing } from '@atom-forge/ui';
```

## Propok

### Egy gyűrű

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `number` | `0` | Az aktuális érték. |
| `max` | `number` | `100` | A maximális érték. A százalék = `value / max × 100`. Az érték a [0, max] tartományba szorul. |
| `color` | `string` | `var(--color-accent)` | A folyamatív színe. Többgyűrűs módban tartalékszínként is szolgál. |
| `label` | `string` | `${Math.round(pct)}%` | Középső szöveg. Ha `children` snippetet adsz, figyelmen kívül marad. |
| `labelClass` | `string` | — | További osztályok az alapértelmezett címkén. |

### Több gyűrű

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `rings` | `RingDef[]` | — | Gyűrűdefiníciók tömbje. Mindegyik: `{ value, max?, color? }`. Koncentrikusan rajzolódnak, a legkülső az első. |
| `gap` | `number` | `4` | A koncentrikus gyűrűk közötti rés pixelben. |

### Elrendezés

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `size` | `number` | `120` | Külső átmérő pixelben. |
| `strokeWidth` | `number` | `12` | Mindkét ív vastagsága pixelben. |
| `trackColor` | `string` | `var(--color-secondary)` | A háttérsáv színe. |
| `children` | `Snippet` | — | Egyedi középső tartalom. Felülírja az alapértelmezett címkét. Nincs paramétere, közvetlenül a helyi state-et használd. |
| `class` | `string` | — | Osztályok a gyökérelemen. |

## Típusok

```ts
type RingDef = {
  value: number;
  max?: number;    // defaults to 100
  color?: string;  // falls back to the `color` prop
};
```

## Akadálymentesség

Gyökérelem: `role="progressbar"`, `aria-valuemin=0`, `aria-valuemax={max}`, `aria-valuenow={clampedValue}` (csak egygyűrűs módban). Tetszőleges attribútumokat nem továbbít. A mutatókat a komponensen kívüli akadálymentes szöveggel írd le.

## SVG-belsők

Az `i` indexű gyűrűre:
- `radius = (size - strokeWidth) / 2 - i * (strokeWidth + gap)`
- `circumference = 2π × radius`
- `stroke-dashoffset = circumference × (1 - percentage / 100)`
- −90°-kal elforgatva, hogy az ívek felül kezdődjenek.

## Példák

```sveltehtml
<script lang="ts">
  import { ProgressRing } from '@atom-forge/ui';
  let value = $state(65);
</script>

<!-- Default percentage label -->
<ProgressRing {value} />

<!-- Custom center content (no params — use local state) -->
<ProgressRing {value} color="#10b981">
  {#snippet children()}
    <span class="text-xl font-bold">{Math.round(value)}%</span>
  {/snippet}
</ProgressRing>

<!-- Multi-ring (Activity Rings style) -->
<ProgressRing
  size={160}
  strokeWidth={14}
  gap={6}
  rings={[
    { value: 78, color: '#ef4444' },
    { value: 52, color: '#10b981' },
    { value: 90, color: '#3b82f6' },
  ]}
/>
```

## Mikor használd

Kompakt, kör alakú készültségi mutatóhoz vagy egymással összefüggő mutatók koncentrikus megjelenítéséhez.

## Alternatívák

Lineáris folyamathoz a [ProgressBar](../forms/progress-bar.md), egy összeghez való hozzájárulásokhoz a [MeterGroup](meter-group.md) való.

## Beállítás és korlátok

Az értékek vizuálisan a tartományba szorulnak, de a hívó state-jébe nem íródnak vissza; max <= 0 esetén üres ív jelenik meg. A rings mód felülírja a skalár value/max értéket, és elnyomja az alapértelmezett középső címkét. Úgy válaszd meg a size/strokeWidth/gap értékeket, hogy minden sugár pozitív maradjon. Nincs határozatlan (indeterminate) mód és befejezési callback. A többgyűrűs ARIA nem teszi elérhetővé az egyes értékeket. A komponens nem továbbít tetszőleges attribútumokat, így a közvetlenül átadott aria-label nem címkézi fel a gyökerét; az akadálymentes szöveget a vizualizáción kívül add meg.
