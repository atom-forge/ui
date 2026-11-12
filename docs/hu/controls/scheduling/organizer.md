# Organizer

Egységekben dolgozó ütemezőfelület dashboardokhoz, naptárakhoz, tervezőkhöz és erőforrásrácsokhoz. Az elemeket `x`, `y`, `w` és `h` koordináták helyezik el, húzhatók és átméretezhetők, a komponens pedig rögzített fejléceket, sorcímkéket, egyedi cellákat, tiltott területeket és átfedéseket kezelő elrendezéseket is tud renderelni.

## Importálás

```ts
import { Organizer } from '@atom-forge/ui';
import type { OrganizerTypes } from '@atom-forge/ui';
```

## Propok

| Prop | Típus | Alapértelmezés | Leírás |
|------|------|---------|-------------|
| `items` | `OrganizerItem[]` | `[]` | Bindolható elemtömb. A húzás és átméretezés eredményéhez használd a `bind:items`-t. |
| `item` | `Snippet<[OrganizerItemRendered]>` | — | Kötelező elemrenderelő. Az elemet és a kiszámított renderelési metaadatokat kapja. |
| `cols` | `number` | `12` | A vízszintes egységek száma. |
| `rows` | `number` | — | A függőleges egységek száma. Ha elhagyod, a magasság az elemek kiterjedéséhez igazodik. |
| `rowHeight` | `number` | `50` | Egy függőleges egység magassága pixelben. |
| `draggable` | `boolean` | `true` | Bekapcsolja a húzással mozgatást. |
| `resizable` | `boolean \| 'vertical' \| 'horizontal'` | `true` | Bekapcsolja az átméretező fogantyúkat. Irányt megadva korlátozhatod az átméretezést. |
| `allowOverlap` | `boolean` | `false` | Megengedi, hogy az elemek az adatokban átfedjék egymást. Ha `false`, az érvénytelen ledobásokat elutasítja. |
| `overlapStrategy` | `OverlapStrategy` | `'compress'` | Meghatározza, hogyan renderelődnek az átfedő elemek. |
| `blocked` | `BlockedRegion[]` | `[]` | Olyan területek, amelyek elutasítják a ledobást, és tiltott háttérterületként renderelődnek. |
| `subdivisions` | `OrganizerSubdivisions` | `{}` | Egységalapú jelölőszabályok az x/y tengelyre. `minor`, `major` és `alternate` metaadatot ad a fejléc- és cellasnippeteknek. |
| `minColWidth` | `number` | `0` | Oszloponkénti minimális szélesség pixelben. Vízszintes görgetést tesz lehetővé, ha a rács szélesebb a containerénél. |
| `minW` | `number` | `1` | Az elem minimális szélessége egységben. |
| `maxW` | `number` | — | Az elem maximális szélessége egységben. |
| `minH` | `number` | `1` | Az elem minimális magassága egységben. |
| `maxH` | `number` | — | Az elem maximális magassága egységben. |
| `colHeader` | `Snippet<[OrganizerAxisMark]>` | — | Oszlopfejléc-renderelő. |
| `rowHeader` | `Snippet<[OrganizerAxisMark]>` | — | Sorfejléc-renderelő. |
| `rowHeaderWidth` | `number \| string` | — | Rögzített sorfejléc-szélesség. Akkor használd, ha a sorfejléc szélessége ne a tartalom méréséből adódjon. |
| `footer` | `Snippet` | — | Opcionális lábléc a görgethető rácstörzs alatt. |
| `cell` | `Snippet<[OrganizerCellMeta]>` | — | Háttércella-renderelő. |
| `class` | `string` | `''` | További osztályok a gyökérelemre. |

## Típusok

```ts
type OrganizerItem = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  [key: string]: any;
};

type OrganizerItemRendered = OrganizerItem & {
  _lane: number;
  _laneCount: number;
  _renderLeft: string;
  _renderWidth: string;
  _renderTop?: string;
  _renderHeight?: string;
};

type OverlapStrategy = 'compress' | 'expand' | 'calendar' | 'calendar-v';

type BlockedRegion = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type OrganizerSubdivision = {
  minorEvery?: number;
  majorEvery?: number;
  alternateEvery?: number;
  offset?: number;
};

type OrganizerSubdivisions = {
  x?: OrganizerSubdivision;
  y?: OrganizerSubdivision;
};

type OrganizerAxisMark = {
  index: number;
  minor: boolean;
  major: boolean;
  alternate: boolean;
};

type OrganizerCellMeta = {
  x: OrganizerAxisMark;
  y: OrganizerAxisMark;
};
```

## Alapvető használat

```sveltehtml
<script lang="ts">
  import { Organizer } from '@atom-forge/ui';
  import type { OrganizerTypes } from '@atom-forge/ui';

  let items = $state<OrganizerTypes.OrganizerItem[]>([
    { id: 'a', x: 0, y: 0, w: 3, h: 2, title: 'Widget A' },
    { id: 'b', x: 3, y: 1, w: 2, h: 3, title: 'Widget B' },
  ]);
</script>

<Organizer bind:items cols={6} rowHeight={48}>
  {#snippet item(entry)}
    <div class="h-full w-full rounded border border-frame bg-surface p-2">
      {entry.title}
    </div>
  {/snippet}
</Organizer>
```

## Rögzített fejlécek és lábléc

Az oszlop- és sorfejlécek a rács tartalmán kívül renderelődnek, és a törzs görgetési pozíciójához szinkronizálódnak. Ha azt szeretnéd, hogy a törzs görögjön, adj korlátozott magasságot az organizer gyökérelemének. Ha az oszlopoknak minimális vizuális szélesség és vízszintes görgetés kell, állítsd be a `minColWidth`-et.

```sveltehtml
<Organizer
  bind:items={events}
  cols={7}
  rows={144}
  rowHeight={8}
  minColWidth={180}
  rowHeaderWidth={64}
  class="h-[520px] rounded border border-frame bg-surface"
>
  {#snippet colHeader(x)}
    <div class="border-b border-r border-frame bg-surface px-3 py-2 text-center text-xs font-semibold">
      {days[x.index]}
    </div>
  {/snippet}

  {#snippet rowHeader(y)}
    <div class="h-full w-full border-r border-frame bg-surface">
      {#if y.major}
        <span class="block pr-2 pt-1 text-right text-xs text-muted-contrast">
          {timeLabel(y.index)}
        </span>
      {/if}
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="border-t border-frame bg-surface px-4 py-2 text-xs text-muted-contrast">
      {events.length} events
    </div>
  {/snippet}

  {#snippet item(event)}
    <div class="h-full w-full rounded border border-frame bg-control p-2">
      {event.title}
    </div>
  {/snippet}
</Organizer>
```

## Egységalapú felosztások

Az Organizernek nem kell tudnia percekről, dátumokról vagy erőforrásokról. Egységekben dolgozik. Egy naptárnál, ahol egy egység öt percnek felel meg:

| Jelentés | Szabály |
|---------|------|
| 5 perces illesztés | egy organizer-egység |
| 15 perces segédvonal | `minorEvery: 3` |
| Óránkénti felirat/segédvonal | `majorEvery: 12` |
| Óránként váltakozó háttér | `alternateEvery: 12` |

```sveltehtml
<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  const subdivisions = {
    y: {
      minorEvery: 3,
      majorEvery: 12,
      alternateEvery: 12,
    },
  };
</script>

<Organizer
  bind:items={events}
  rows={144}
  rowHeight={8}
  {subdivisions}
>
  {#snippet rowHeader(y)}
    <div class="h-full border-r border-frame bg-surface">
      {#if y.major}
        <span class="block pr-2 pt-1 text-right text-xs text-muted-contrast">
          {timeLabel(y.index)}
        </span>
      {/if}
    </div>
  {/snippet}

  {#snippet cell({ y })}
    <div
      class={twMerge(
        'h-full',
        y.alternate && 'bg-muted/20',
        y.major && y.index > 0 ? 'border-t border-frame' : y.minor && 'border-t border-frame/60',
      )}
    ></div>
  {/snippet}

  {#snippet item(event)}
    <div class="h-full w-full rounded border border-frame bg-control p-2">
      {event.title}
    </div>
  {/snippet}
</Organizer>
```

A felosztási szabályok tengelyfüggetlenek. Ugyanazzal a jelölőmodellel stílusozhatsz függőleges naptárakat, vízszintes idővonalakat vagy kétdimenziós erőforrásrácsokat.

## Átfedési stratégiák

### `compress`

Az alapértelmezett stratégia. Az elemek megtartják az adatokban szereplő pozíciójukat, és ott renderelődnek. Átfedés esetén a későbbi elemek vizuálisan a korábbiak fölé kerülhetnek.

### `calendar`

Naptárszerű, vízszintes sávos elrendezés az ugyanabban az oszlopban kezdődő, átfedő elemekhez. Az elemek megtartják eredeti `x`, `y`, `w` és `h` értéküket; a módosított vizuális sávot a `_renderLeft` és a `_renderWidth` adja meg.

### `calendar-v`

Függőleges sávos változat arra az esetre, ha az átfedéseket függőleges renderelési metaadatok oldják fel. A `_renderTop` és a `_renderHeight` mezőket tölti ki.

### `expand`

Későbbi működésnek fenntartva. Jelenleg nincs megvalósítva.

## Tiltott területek

A tiltott területek elutasítják a húzást és az átméretezést, ha a jelölt elem átfedné őket.

```sveltehtml
<script lang="ts">
  const blocked = [
    { x: 5, y: 0, w: 2, h: 24 },
    { x: 0, y: 132, w: 7, h: 12 },
  ];
</script>

<Organizer {blocked} bind:items cols={7} rows={144}>
  {#snippet item(event)}
    <div class="h-full w-full rounded border border-frame bg-control p-2">
      {event.title}
    </div>
  {/snippet}
</Organizer>
```

## Húzás és átméretezés

A húzás és az átméretezés organizer-egységekben történik. Ha egy egység öt perc, akkor egy elem egy sorral való elmozdítása öt perccel tolja el. Naptáreseményeknél, ahol az időtartam változik, de az oszlopszélesség maradjon fix, használd a `resizable="vertical"`-t.

```sveltehtml
<Organizer
  bind:items={events}
  cols={7}
  rows={144}
  rowHeight={8}
  resizable="vertical"
  minH={1}
  maxH={24}
>
  {#snippet item(event)}
    <div class="h-full w-full rounded border border-frame bg-control p-2">
      {event.title}
    </div>
  {/snippet}
</Organizer>
```

`allowOverlap={false}` esetén a másik elemmel ütköző ledobás vagy átméretezés megszakad. Ha az `allowOverlap` be van kapcsolva, kombináld `overlapStrategy="calendar"`-ral vagy egyedi elemstílussal, hogy az átfedések olvashatók legyenek.

## Görgetés

A natív görgetési pozíció a rácstörzsé. Az oszlop- és sorfejlécek külön rétegekben vannak, és vizuálisan a törzs görgetési pozíciójához szinkronizálódnak. Így a fejlécek rögzítve maradnak, miközben a vízszintes és függőleges görgetés is működik. A lábléc a görgethető törzsön kívül van, és rögzítve marad alatta.

Ha a sorcímkék keskenyek, vagy a sorfejléc abszolút pozicionált jelölőfeliratokat tartalmaz, a stabil sorfejléc-méretezéshez használd a `rowHeaderWidth`-et.

## Mikor használd

Egyedi, szerkeszthető rácshoz, amelynek pozíciói és időtartamai az alkalmazás által definiált egységekre képezhetők le.

## Alternatívák

Csak olvasható eseménytörténethez használd a [Timeline](../data/timeline.md)-t, csak sorrendet változtató húzáshoz a [Sortable](../data/sortable.md)-t. Az Organizernek magának nincs naptár-/dátum-domainmodellje.

## Beállítás és korlátok

Az elemeket egyedi string ID-kkal bindold; a dátumokat/erőforrásokat a komponensen kívül képezd le x/y/w/h értékekre. Egérmozgatás közben egy ghost látszik, és csak az érvényes mouseup commitol egy új elemtömböt; publikus change/resize callback nincs. A tiltott területek és az átfedés ellenőrzése a húzás/átméretezés jelöltjeire vonatkozik, a kívülről kapott adatokra nem. Pozitív cols/rowHeight értéket és megvalósítható méreteket adj meg. A fix rows a renderelt magasságot határozza meg, nem a maximális y-t, így egy elem a látható rácson túlra is mozgatható. A calendar/calendar-v stratégiák compressre esnek vissza, ha a resizable `true`; sávos elrendezéshez irányított átméretezést vagy `false`-t használj. Az expand jelenleg ugyanazt az alap-pozicionálást használja, mint a compress. Nincs érintéses vagy billentyűzetes húzás/átméretezés, időzóna-/dátumaritmetika, perzisztencia vagy virtualizáció; a háttércellák száma rows × cols arányban nő.
