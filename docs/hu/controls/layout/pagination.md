# Pagination

Lapozó vezérlő. Megjeleníti az első és utolsó oldalt, az aktuális körüli szomszédos oldalakat, a kihagyott tartományokat pedig `…` jelzi. A tartománylogika teljes egészében belső.

## Importálás

```ts
import { Pagination } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `page` | `number` | — | Aktuális oldal (1-től számozva). |
| `total` | `number` | — | Az oldalak teljes száma. |
| `onchange` | `(page: number) => void` | — | Akkor hívódik, amikor a felhasználó új oldalt választ. |
| `siblings` | `number` | `1` | Az aktuális oldal két oldalán megjelenő oldalak száma. |
| `compact` | `boolean` | `false` | Gombonként h-8 w-8. |
| `small` | `boolean` | `false` | Gombonként h-6 w-6. |
| `class` | `string` | — | További Tailwind-osztályok a `<nav>` wrapperen. |

---

## Használat

```sveltehtml
<script lang="ts">
  let page = $state(1);
</script>

<Pagination {page} total={20} onchange={p => page = p}/>

<!-- Wider sibling range -->
<Pagination {page} total={20} siblings={2} onchange={p => page = p}/>

<!-- Compact -->
<Pagination {page} total={20} compact onchange={p => page = p}/>
```

### Tartományszámítás

| Feltétel | Megjelenítés |
|-----------|----------|
| `page` az elején | `1 2 3 … N` |
| `page` középen | `1 … 4 5 6 … N` |
| `page` a végén | `1 … N-2 N-1 N` |
| Minden oldal elfér (≤ `2*siblings + 3`) | Nincs ellipszis |

## Mikor használd

Számozott navigációhoz, ha az oldalak teljes száma ismert.

## Alternatívák

Sok oldalon való végigpörgetéshez a [PaginationSlider](pagination-slider.md) való; az oldalszám helyett elemszámot és oldalméretet vár.

## Beállítás és korlátok

A Pagination kontrollált: add át az 1-től számozott `page`-et, és frissítsd a kötelező `onchange(page)`-ben. Nem bindol és nem módosítja a page-et, és csak akkor hívja a handlert, ha egy másik, 1…total közötti oldalt választanak. Az adatlekérés, az URL-szinkronizálás és a betöltési állapotok a hívó dolgai. Szűrőváltás után normalizáld a page-et; a megadott oldalakat és totalt nem korlátozza. `total <= 1` esetén is megjelenik egy 1-es gomb. Legfeljebb egy méret propot válassz.
