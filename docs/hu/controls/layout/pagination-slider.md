# Pagination Slider

Slider alapú lapozó. A felhasználó a csúszka húzásával vagy az előző/következő gombokkal lapoz. Nagy adathalmazokhoz való, ahol természetesebb végigpörgetni az oldalakat, mint számozott gombokra kattintani.

A komponens kezeli a belső állapotot és a debounce-olt kimenetet — a bindolt `page` csak kb. 150 ms-mal azután frissül, hogy a felhasználó abbahagyta a húzást, a csúszka pozíciója viszont végig folyamatos.

## Importálás

```ts
import { PaginationSlider } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `page` | `number` | `1` | Aktuális oldal (1-től számozva). Kétirányú bindinghoz használd a `bind:page`-et. |
| `total` | `number` | — | Az elemek teljes száma. |
| `pageSize` | `number` | — | Elemek száma oldalanként. Oldalak száma = `⌈total / pageSize⌉`. |
| `compact` | `boolean` | — | Kompakt méret. Kizárja a `small`-t. |
| `small` | `boolean` | — | Kis méret. Kizárja a `compact`-ot. |
| `class` | `string` | — | További Tailwind-osztályok a wrapperen. |

---

## Használat

```sveltehtml
<script lang="ts">
  let page = $state(1);
  const total    = 500;
  const pageSize = 25;

  const totalPages = $derived(Math.ceil(total / pageSize));
  const start      = $derived((page - 1) * pageSize + 1);
  const end        = $derived(Math.min(page * pageSize, total));
</script>

<PaginationSlider bind:page {total} {pageSize}/>
<p>{page}/{totalPages} · {start}–{end} of {total}</p>

<!-- Compact -->
<PaginationSlider bind:page {total} {pageSize} compact/>
```

### Megjegyzések

- A kiírás (pl. `3/20 · 51–75 of 500`) szándékosan **nincs** beépítve a komponensbe — számold ki és jelenítsd meg magad, a saját elrendezésedhez igazítva.
- Ha a `page`-et kívülről állítod vissza (pl. szűrő- vagy mappaváltáskor), a slider azonnal követi.

## Mikor használd

Sok oldalon való végigpörgetéshez, amikor a közeli számozott gombok kevésbé hasznosak.

## Alternatívák

Explicit, számozott oldalakhoz a [Pagination](pagination.md) való; annak ne ennek a komponensnek az elemszámát add át.

## Beállítás és korlátok

Az 1-től számozott `page`-et bindold. Az oldalak száma `max(1, ceil(total / pageSize))`; pozitív pageSize-t és nemnegatív totalt adj meg. A húzás és az előző/következő gombok is 150 ms-os debounce után véglegesítenek, nem azonnal, és nem kizárólag a pointer felengedésekor. A külső oldalváltás effecten keresztül frissíti a belső pozíciót, de nem törli a függőben lévő véglegesítést, így egy korábbi felhasználói érték felülírhatja a visszaállítást. A total változása után a page nem korlátozódik automatikusan. A kiírást és az adatlekérést a véglegesített page állapotból származtasd.
