# ProgressBar

Vízszintes folyamatjelző accent színű kitöltéssel, csíkos textúrával és sima szélesség-animációval.

## Importálás

```ts
import { ProgressBar } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `number` | `0` | Az aktuális haladás értéke. |
| `max` | `number` | `100` | A maximális érték. Százalék = `value / max * 100`. |
| `compact` | `boolean` | — | Közepes sávmagasság (`h-2.5`). Kizárja a `small`-t. |
| `small` | `boolean` | — | Vékony sávmagasság (`h-1.5`). Kizárja a `compact`-ot. |
| `class` | `string` | — | További Tailwind osztályok a sávon, `twMerge`-dzsel összefésülve. |

---

## Méretek

| Méret | Sávmagasság |
|------|-------------|
| normál | `h-4` |
| `compact` | `h-2.5` |
| `small` | `h-1.5` |

---

## Használat

```sveltehtml
<ProgressBar value={65}/>
<ProgressBar value={3} max={10}/>
<ProgressBar value={40} compact/>
<ProgressBar value={80} small/>

<!-- Animated -->
<script lang="ts">
  import { onMount } from 'svelte';
  let progress = $state(0);
  onMount(() => {
    const timer = setInterval(() => { if (progress < 100) progress++ }, 50);
    return () => clearInterval(timer);
  });
</script>
<ProgressBar value={progress} />
```

## Mikor használd

Csak olvasható, ismert maximumhoz mért, determinált haladás megjelenítésére.

## Alternatívák

Kompakt, kör alakú folyamatjelzéshez használd a [ProgressRing](../data/progress-ring.md)-et, részarányokhoz a [MeterGroup](../data/meter-group.md)-ot, felhasználói bevitelhez a [Slider](slider.md)-t.

## Beállítás és működés

A százalék `value / max * 100`, ha `max > 0`, egyébként nulla. Az értékeket nem szorítja tartományba; a tartományt a hívó oldalon validáld. Nincs indeterminate mód, kötés vagy befejezési esemény. A gyökérelem `role="none"`-t és csak egy százalékos title-t kap, progressbar ARIA-szemantikát nem; az akadálymentes haladásszöveget külön add meg. A méret és a wrapper osztályai az inicializáláskor rögzülnek.
