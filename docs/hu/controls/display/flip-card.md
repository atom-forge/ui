# FlipCard

Elő- és hátoldallal rendelkező, 3D-ben megforduló kártya. Hover, kattintás és kézi indítási módot tud, valamint opcionális, az egeret követő döntési és fényerő-effektust.

## Import

```ts
import { FlipCard } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `front` | `Snippet<[() => void]>` | — | Az előlap tartalma. Egy `flip()` függvényt kap. Kizárja a `children`-t. |
| `children` | `Snippet<[() => void]>` | — | A `front` aliasa. |
| `back` | `Snippet<[() => void]>` | — | A hátlap tartalma. Egy `flip()` függvényt kap. |
| `flipped` | `boolean` | `false` | Bindolható forgatási állapot. |
| `trigger` | `'hover' \| 'click' \| 'manual'` | `'hover'` | Mi indítja a forgatást. A `'manual'` értékkel kívülről vezérelheted a `flipped`-et. |
| `follow` | `Follow` | — | Az egeret követő döntési és fényerő-effektus. |
| `class` | `string` | — | További Tailwind osztályok a wrapperen. |

### Follow típus

```ts
type Follow = {
  tilt?: number;           // Max tilt in degrees
  brightness?: number | { day?: number; night?: number };
};
```

---

## Használat

### Forgatás hoverre

```sveltehtml
<div class="h-48 w-36">
  <FlipCard>
    {#snippet front(flip)}
      <Card class="h-full flex items-center justify-center">Front</Card>
    {/snippet}
    {#snippet back(flip)}
      <Card class="h-full flex items-center justify-center">Back</Card>
    {/snippet}
  </FlipCard>
</div>
```

### Forgatás kattintásra

```sveltehtml
<FlipCard trigger="click">
  {#snippet front(flip)}...{/snippet}
  {#snippet back(flip)}...{/snippet}
</FlipCard>
```

### Kézi vezérlés

```sveltehtml
<script lang="ts">
  let flipped = $state(false);
</script>

<FlipCard trigger="manual" bind:flipped>
  {#snippet front(flip)}
    <button onclick={() => flipped = true}>Show back</button>
  {/snippet}
  {#snippet back(flip)}
    <button onclick={() => flipped = false}>Show front</button>
  {/snippet}
</FlipCard>
```

### Egérkövető döntés

```sveltehtml
<FlipCard follow={{ tilt: 10, brightness: { day: 0.15, night: 0.2 } }}>
  ...
</FlipCard>
```

---

## Megjegyzések

- A wrapper a 3D-effektushoz `perspective: 1000px`-et használ.
- Mindkét oldal `backface-hidden`, így mindig csak az aktív oldal látszik.
- A `FlipCard` kitölti a szülőjét (`h-full w-full`), ezért mindig méretezett konténerbe tedd.

## Mikor használd

Szándékosan kétoldalas megjelenítéshez, látványos forgatási átmenettel.

## Alternatívák

Statikus felülethez a [Card](card.md), 3D-effektus nélküli tartalom-kinyitáshoz az [Accordion](../layout/accordion.md) való.

## Beállítás és működés

`Root` alatt renderelj: a komponens `follow` nélkül is olvassa a téma contextet. Adj méretezett szülőt, a `front` / `children` közül pontosan egyet, és opcionálisan `back`-et. Külső vezérléshez bindold a `flipped`-et. Hover módban belépéskor és kilépéskor is vált, nem abszolút állapotot állít be. Kattintás módban az oldalak tartalmára leadott kattintások is felbuborékolnak; ha az oldalakon műveletek vannak, inkább a manual módot válaszd. Nincs beépített billentyűzetes forgatás, oldalak közötti fókuszkezelés vagy reduced-motion kapcsoló.
