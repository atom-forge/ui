# Calendar

Havi naptárrács dátumalapú, egy- és többnapos eseményekhez, áthúzással, átméretezéssel és opcionális létrehozási callbackekkel.

## Importálás

```ts
import { Calendar, calendar, type CalendarTypes } from '@atom-forge/ui';
```

## Mikor használd

Egész napos események havi beosztásához, ahol az események dátumait az alkalmazás kezeli.

## Alternatívák

Az eltérő, egységalapú ütemezési modellhez (idővonalak, erőforrás-sorok) az [Organizer](./organizer.md)-t használd.

## Beállítás

Alkalmazd a [Első lépések](../../guides/getting-started.md) CSS-ét. Helyi, `YYYY-MM-DD` formátumú dátumstringeket és nulla alapú `month`-ot használj. Calendar-specifikus külső providerre nincs szükség.

## Minimális példa

```sveltehtml
<script lang="ts">
  import { Calendar, type CalendarTypes } from '@atom-forge/ui';
  let events = $state<CalendarTypes.CalendarEvent[]>([
    { id: 'review', title: 'Review', startDate: '2026-10-06', endDate: '2026-10-07', color: 'blue' }
  ]);
  function updateDates(id: string, startDate: string, endDate: string) {
    events = events.map(event => event.id === id ? { ...event, startDate, endDate } : event);
  }
</script>

<Calendar year={2026} month={9} {events}
  onEventMove={updateDates} onEventResize={updateDates}/>
```

## Működés

A záródátum inkluzív. Áthelyezéskor a kezdő- és zárónap közötti különbség megmarad. Átméretezéskor a komponens helyben mutat előnézetet, a dátumokat pedig az egérgomb felengedésekor jelzi. Ezek a callbackek nem módosítják az eseménytömböt: a frissítést neked kell elvégezned, ahogy fent. A `viewOnly` letiltja az áthelyezést, átméretezést és létrehozást, de az eseményre kattintás callbackjei továbbra is működnek. Az egyenként `readOnly` események nem helyezhetők át és nem méretezhetők át. A pihenőnapok stílusa független attól, hogy ezekre a napokra tehetsz-e eseményt. `wrapMultiDay={false}` esetén egy esemény nem jelenik meg a későbbi heteken, ha az adott hét előtt kezdődik.

## API

| Prop | Típus | Alapértelmezés |
|---|---|---|
| `year`, `month` | `number`, bindolható | Az aktuális helyi év/hónap (hónap 0–11) |
| `events` | `CalendarTypes.CalendarEvent[]` | `[]` |
| `viewOnly` | `boolean` | `false` |
| `workdays` | a hét napjainak számjegyeiből álló `string`, vasárnap `0` | `'12345'` |
| `extraRest` | `CalendarTypes.RestDayEntry[]` | `[]` |
| `extraWork` | `string[]` | `[]` |
| `firstDayOfWeek` | `0 \| 1` | `1` (hétfő) |
| `wrapMultiDay` | `boolean` | `true` |
| `allowCreate` | `boolean` | `false` |
| `onEventMove`, `onEventResize` | `(id: string, newStart: string, newEnd: string) => void` | — |
| `onEventCreate` | `(date: string) => void` | — |
| `onEventClick` | `(id: string) => void` | — |
| `class` | `string` | `''` |

A `CalendarEvent` kötelező string mezői: `id`, `startDate`, `endDate`, `title`; opcionális: `subtitle`, `icon` (a forrás `any`-ként típusozza, Lucide komponenshez), `color`, `class` és `readOnly`. A `CalendarEventColor` értéke `'blue' | 'green' | 'red' | 'orange' | 'purple' | 'teal' | 'yellow'`. A `RestDayEntry` dátumstring vagy `{ date: string; name?: string }`. Az `EventSlot` mezői: `event`, `startCol`, `endCol` (1–7), `lane` (nulla alapú), `isStart` és `isEnd`.

### Publikus `calendar` segédfüggvények

| Függvény | Eredmény |
|---|---|
| `parseDate(s: string)` / `formatDate(d: Date)` | Helyi `Date` / `YYYY-MM-DD` string. |
| `addDays(dateStr: string, days: number)` | Dátumstring. |
| `dayDiff(startStr: string, endStr: string)` | Kerekített napkülönbség. |
| `todayStr()` | A mai helyi dátum stringként. |
| `getCalendarWeeks(year: number, month: number, firstDayOfWeek: 0 \| 1)` | Teljes, hétnapos hetek `string[][]` formában. |
| `isRestDay(dateStr, workdays, extraRest, extraWork)` | Boolean; az `extraWork` felülírja az extra pihenőnapokat és a hétköznap-szabályokat. |
| `getHolidayName(dateStr: string, extraRest: RestDayEntry[])` | `string \| undefined`. |
| `computeWeekSlots(weekDays: string[], events: CalendarEvent[], wrapMultiDay: boolean, resizePreview?)` | `EventSlot[]`; az előnézet alakja `{ id: string; newStartDate?: string; newEndDate?: string }`. |
| `getDayNames(firstDayOfWeek: 0 \| 1)` | Angol napnevek. |
| `getMonthName(year: number, month: number)` | Angol hónap/év felirat. |

A fenti segédtípusnevek a `CalendarTypes` tagjai.

## Korlátok

A `Calendar` nem kezel napszakot/időpontot, ismétlődést, szerveroldali perzisztenciát, dátumvalidációt, és nincs beépített hónapléptető felülete. A `year`/`month` értékét az alkalmazásodból változtasd. A dátumszámítások helyi dátumokkal dolgoznak, nem időzóna-tudatos ütemezési modellel. Az áthelyezést és átméretezést böngészős pointer/drag API-k valósítják meg; ne feltételezz ezzel egyenértékű billentyűzetes szerkesztést.

Forrás: `src/lib/controls/scheduling/calendar/{index.ts,types.ts,utils.ts,Calendar.svelte,CalendarGrid.svelte,EventBar.svelte}`.
