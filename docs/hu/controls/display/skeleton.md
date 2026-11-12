# Skeleton

Dekoratív betöltési helykitöltők alakzatokhoz és szövegsorokhoz.

## Import

```ts
import { Skeleton } from '@atom-forge/ui';
```

## Mikor használd

Betöltés közben, ha a tartalom vizuális helyének lefoglalása megőrzi az elrendezés folytonosságát.

## Alternatívák

Határozatlan ideig tartó tevékenységhez az exportált `Spinner`, mérhető előrehaladáshoz a [ProgressBar](../forms/progress-bar.md) való.

## Beállítás

Használd a könyvtár CSS-beállítását a [Első lépések](../../guides/getting-started.md) szerint. Nincs szükség providerre. Az alakzat-helykitöltőknek `class`-szal adj explicit méretet.

## Minimális példa

```sveltehtml
<script lang="ts">
  import { Skeleton } from '@atom-forge/ui';
</script>

<section aria-busy="true" aria-label="Loading profile">
  <Skeleton circle class="h-12 w-12"/>
  <Skeleton rect class="h-32 w-full"/>
  <Skeleton length={[100, 80, 60]} class="mt-3"/>
</section>
```

## Működés

Minden helykitöltő `aria-hidden="true"`. Az animáció alapból be van kapcsolva. A szövegsorok `h-4` magasak, `gap-2` választja el őket, a szélességük százalékos. A `length={true}` egyetlen 100%-os sort ad. A `length={false}` nem hoz létre szövegsort, hanem alakzat-renderelésre esik vissza.

## API

| Prop | Típus | Alapérték | Leírás |
|---|---|---|---|
| `circle` | `true` | — | Kör alakzat. |
| `rect` | `true` | — | Lekerekített téglalap alakzat. |
| `length` | `boolean \| number \| number[]` | — | Szövegsor mód; a számok százalékos szélességek. |
| `animated` | `boolean` | `true` | Bekapcsolja a shimmer osztályt. |
| `icon` | `IconDefinition` | — | Középre igazított ikon, csak alakzat módban. |
| `class` | Közös `ClassProp` | — | Méret és stílus; sor módban a wrapperre kerül. |

A publikus props típus XOR-t használ: pontosan egy módot válassz (`circle`, `rect` vagy `length`), ne kombináld őket.

## Korlátok

Nincs betöltési állapot, helyettesítő tartalom, státuszbejelentés vagy adatbetöltési logika. Az alkalmazásnak kell eltávolítania a helykitöltőket, amikor kész, és akadálymentesen jeleznie a betöltési állapotot. A szélességértékeket közvetlenül, tartományba szorítás nélkül használja. Alakzat módban nincs saját magasság vagy szélesség.

Forrás: `src/lib/controls/display/skeleton/Skeleton.svelte` és `index.ts`.
