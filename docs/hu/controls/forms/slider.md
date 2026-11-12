# Slider / Range

`Slider` — egy csúszka egyetlen skalárértékhez. `Range` — két csúszka egy `[min, max]` intervallumhoz. Mindkettő ugyanazt a megjelenési és méret-API-t használja.

## Importálás

```ts
import { Slider, Range } from '@atom-forge/ui';
```

---

## Slider propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `number` | `50` | Bindolható aktuális érték. Mountkor `[min, max]` tartományba szorítja. |
| `min` | `number` | `0` | Minimális érték. |
| `max` | `number` | `100` | Maximális érték. |
| `step` | `number` | `1` | Lépésköz. |
| `disabled` | `boolean` | — | Letiltja az interakciót. |
| `drawStops` | `boolean` | — | Minden lépésnél osztásjelet rajzol. |
| `compact` | `boolean` | — | Kompakt sávméret. Kizárja a `small`-t. |
| `small` | `boolean` | — | Kis sávméret. Kizárja a `compact`-ot. |
| `showValue` | `boolean \| (value: number) => string` | — | Húzás közben egy buborékban mutatja az aktuális értéket a fogantyú fölött. Mértékegységhez adj át formázót, pl. `v => v + ' %'`. |
| `class` | `string` | — | További Tailwind osztályok. |

---

## Range propok

Ugyanazok, mint a Slidernél, továbbá:

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `[number, number]` | `[25, 75]` | Bindolható, kétértékű intervallum. |
| `distance` | `{ min?: number; max?: number }` | — | Minimális és/vagy maximális távolságot kényszerít ki a két csúszka között. |

---

## Használat

```sveltehtml
<script lang="ts">
  let vol   = $state(60);
  let range = $state<[number, number]>([20, 80]);
</script>

<!-- Slider -->
<Slider bind:value={vol}/>
<Slider bind:value={vol} min={0} max={200} step={10}/>
<Slider bind:value={vol} drawStops compact/>

<!-- Range -->
<Range bind:value={range}/>
<Range bind:value={range} distance={{ min: 10, max: 50 }}/>

<!-- showValue -->
<Slider bind:value={vol} showValue/>
<Slider bind:value={vol} showValue={v => v + ' %'}/>
<Range bind:value={range} showValue={v => v + ' kg'}/>
```

## Mikor használd

A Slidert korlátos skalárértékhez, a Range-et húzással állítható, kétértékű intervallumhoz használd.

## Alternatívák

Ha pontos szám begépelésére van szükség, használd az [Input](input.md)-ot. Csak olvasható haladáshoz a [ProgressBar](progress-bar.md)-t.

## Beállítás és működés

Számot vagy explicit módon típusozott `[number, number]` tuple-t bindolj. A kezdőértékeket a komponens inicializálásakor szorítja tartományba (konzolhibával), külső értékadáskor nem normalizálja folyamatosan. Adj meg `max > min` értéket, pozitív `step`-et és teljesíthető távolság-megkötéseket. A Range húzás közben rendezi az értékeket, és a távolság betartatásához eltolhatja a másik csúszkát; a kezdő- és külső értékeknél a távolságot nem validálja. A méret az inicializáláskor rögzül. Az osztásjelek elmaradnak, ha a lépések száma eléri a 100-at. Egyik wrapper sem ad change/commit callbacket; élő frissítéshez használd a kötést, és ne feltételezz elengedéskori mentési szerződést.
