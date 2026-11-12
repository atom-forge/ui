# Carousel

Vízszintesen görgethető diakonténer scroll-snappel, opcionális nyilas navigációval és egy kísérő `CarouselIndicator` komponenssel a pontos navigációhoz. A kettő egy közös `bind:currentIndex`-en keresztül szinkronizál.

## Import

```ts
import { Carousel, CarouselIndicator } from '@atom-forge/ui';
```

## Komponensek

- **`Carousel`** — görgethető diakonténer
- **`CarouselIndicator`** — pontjelző, `bind:currentIndex`-szel szinkronizálva

## Carousel propok

| Prop           | Típus                                     | Alapérték | Leírás |
|----------------|-------------------------------------------|---------|-------------|
| `items`        | `T[]`                                     | `[]`    | A diák adatai, a `children` snippet kapja meg őket. |
| `currentIndex` | `number` (bindable)                       | `0`     | Az aktív dia indexe. |
| `showArrows`   | `boolean`                                 | `true`  | Megjeleníti a beépített előző/következő nyílgombokat. |
| `loop`         | `boolean`                                 | `false` | Az utolsó dia után az elsőre ugrik vissza. |
| `showcase`     | `number \| [number, number]`              | —       | Automatikus léptetés késleltetése másodpercben. Tuple esetén minden diához véletlenszerű késleltetést választ a két érték között. |
| `children`     | `Snippet<[{ item: T; index: number }]>`   | —       | (Kötelező) Az egyes diákat rendereli. |
| `class`        | `string`                                  | —       | További Tailwind osztályok a gyökérelemen. |

## A Carousel exportált metódusai

| Metódus         | Leírás |
|-----------------|-------------|
| `next()`        | A következő diára lép (figyelembe veszi a `loop`-ot). |
| `prev()`        | Az előző diára lép (figyelembe veszi a `loop`-ot). |
| `goTo(index)`   | Egy adott indexű diára ugrik. |

## CarouselIndicator propok

| Prop           | Típus               | Alapérték | Leírás |
|----------------|---------------------|---------|-------------|
| `total`        | `number`            | `0`     | A pontok száma, egyezzen az `items.length`-szel. |
| `currentIndex` | `number` (bindable) | `0`     | Az aktív pont indexe. |
| `class`        | `string`            | —       | További Tailwind osztályok a konténeren. |

## Használat

```sveltehtml
<script lang="ts">
    import { Carousel, CarouselIndicator } from '@atom-forge/ui';

    const slides = [
        { id: 1, title: 'First' },
        { id: 2, title: 'Second' },
        { id: 3, title: 'Third' },
    ];

    let currentIndex = $state(0);
    let carousel: { prev(): void; next(): void; goTo(i: number): void };
</script>

<Carousel bind:this={carousel} items={slides} bind:currentIndex loop class="rounded-xl">
    {#snippet children(slide)}
        {@const s = slide.item}
        <div class="h-48 flex items-center justify-center bg-canvas">
            <p>{s.title}</p>
        </div>
    {/snippet}
</Carousel>

<CarouselIndicator total={slides.length} bind:currentIndex />
```

### Showcase mód

A `showcase` proppal a diák automatikusan léptethetők. Az érték azt adja meg, mennyi ideig látszik egy dia:

```sveltehtml
<Carousel items={slides} showcase={4}>
    {#snippet children(slide)}
        <!-- slide content -->
    {/snippet}
</Carousel>

<Carousel items={slides} showcase={[4, 6]}>
    {#snippet children(slide)}
        <!-- slide content -->
    {/snippet}
</Carousel>
```

Amikor a carousel az utolsó diához ér, showcase módban visszalép az elsőre. Kézi navigáció, az indikátor változása vagy felhasználói görgetés után az időzítő újraindul.

## Működés

- **Görgetés → index**: egy `onscroll` kezelő (100 ms-os debounce-szal) a `scrollLeft` alapján kiszámolja az aktuális diát, és frissíti a `currentIndex`-et.
- **Index → görgetés**: egy `$effect` meghívja a `scrollTo`-t, valahányszor a `currentIndex` kívülről változik (például indikátorra kattintáskor vagy `goTo()` hívásakor). A kézi görgetést egy `userScrolling` flag védi, hogy a kettő ne zavarja egymást.
- **Showcase**: ha a `showcase` be van állítva, egy timeout a beállított késleltetés után lépteti a `currentIndex`-et. A `[min, max]` minden diához új véletlen késleltetést választ.
- **Snap**: a `snap-x snap-mandatory`, a diákon pedig a `snap-center` pixelpontos igazítást biztosít minden görgetési mozdulat után.

## Mikor használd

Teljes szélességű diákhoz, amelyek között görgetéssel, nyilakkal vagy indikátorral lehet navigálni.

## Alternatívák

Egymást követő diák helyett explicit címkével ellátott tartalompanelekhez a [Tabs](../layout/tabs.md) való.

## Beállítás és működés

Ugyanazt a `$state` indexet bindold a Carouselhez és a CarouselIndicatorhoz; nincs közös context provider. A `total` mindig egyezzen az `items.length`-szel. A kívülről beállított indexet nem szorítja tartományba; a `goTo()` csak a saját bemenetét. Üres elemlistán ne hívj navigációs metódust. A showcase a `loop`-tól függetlenül körbefordul, és nincs beépített hoverre szüneteltetés vagy szünet vezérlő; ha kell, adj a felhasználónak módot a kikapcsolására.
