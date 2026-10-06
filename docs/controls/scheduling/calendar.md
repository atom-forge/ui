# Calendar

Month grid for date-based, single-day and multi-day events, with drag/move, resize, and optional creation callbacks.

## Import

```ts
import { Calendar, calendar, type CalendarTypes } from '@atom-forge/ui';
```

## When to use

Use for an all-day month schedule whose event dates are owned by the application.

## Alternatives

Use [Organizer](./organizer.md) for its separate scheduling model, [GanttChart](./gantt.md) for tasks/dependencies, or [ResourceManager](./resource-manager.md) for resource allocations.

## Setup

Apply [Getting Started](../../guides/getting-started.md) CSS. Use local date strings in `YYYY-MM-DD` format and a zero-based `month`. No Calendar-specific external provider is required.

## Minimal example

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

## Behavior

End dates are inclusive. Moves preserve the start/end day difference. Resizes preview locally and report dates on mouse release. Event arrays are not mutated by those callbacks: apply updates yourself as above. `viewOnly` prevents move, resize, and creation, but event click callbacks remain available. Individual `readOnly` events cannot be moved/resized. Rest-day styling is independent from permission to place events on those dates. With `wrapMultiDay={false}`, an event is omitted from later weeks when its start is before that week.

## API

| Prop | Type | Default |
|---|---|---|
| `year`, `month` | `number`, bindable | Current local year/month (month 0–11) |
| `events` | `CalendarTypes.CalendarEvent[]` | `[]` |
| `viewOnly` | `boolean` | `false` |
| `workdays` | `string` of weekday digits, Sunday `0` | `'12345'` |
| `extraRest` | `CalendarTypes.RestDayEntry[]` | `[]` |
| `extraWork` | `string[]` | `[]` |
| `firstDayOfWeek` | `0 \| 1` | `1` (Monday) |
| `wrapMultiDay` | `boolean` | `true` |
| `allowCreate` | `boolean` | `false` |
| `onEventMove`, `onEventResize` | `(id: string, newStart: string, newEnd: string) => void` | — |
| `onEventCreate` | `(date: string) => void` | — |
| `onEventClick` | `(id: string) => void` | — |
| `class` | `string` | `''` |

`CalendarEvent` requires `id`, `startDate`, `endDate`, `title` strings; optional `subtitle`, `icon` (source types it as `any` for a Lucide component), `color`, `class`, and `readOnly`. `CalendarEventColor` is `'blue' | 'green' | 'red' | 'orange' | 'purple' | 'teal' | 'yellow'`. `RestDayEntry` is a date string or `{ date: string; name?: string }`. `EventSlot` has `event`, `startCol`, `endCol` (1–7), `lane` (zero-based), `isStart`, and `isEnd`.

### Public `calendar` utilities

| Function | Result |
|---|---|
| `parseDate(s: string)` / `formatDate(d: Date)` | Local `Date` / `YYYY-MM-DD` string. |
| `addDays(dateStr: string, days: number)` | Date string. |
| `dayDiff(startStr: string, endStr: string)` | Rounded day difference. |
| `todayStr()` | Today's local date string. |
| `getCalendarWeeks(year: number, month: number, firstDayOfWeek: 0 \| 1)` | `string[][]` of full seven-day weeks. |
| `isRestDay(dateStr, workdays, extraRest, extraWork)` | Boolean; `extraWork` overrides extra rest and weekday rules. |
| `getHolidayName(dateStr: string, extraRest: RestDayEntry[])` | `string \| undefined`. |
| `computeWeekSlots(weekDays: string[], events: CalendarEvent[], wrapMultiDay: boolean, resizePreview?)` | `EventSlot[]`; preview is `{ id: string; newStartDate?: string; newEndDate?: string }`. |
| `getDayNames(firstDayOfWeek: 0 \| 1)` | English day names. |
| `getMonthName(year: number, month: number)` | English month/year label. |

Utility type names above are members of `CalendarTypes`.

## Limitations

No time-of-day, recurrence, server persistence, date validation, or built-in month navigation UI is exposed by `Calendar`. Change `year`/`month` from your application. Date calculations use local dates, not a timezone-aware scheduling model. Browser pointer/drag APIs implement move/resize; do not assume equivalent keyboard editing.

Source: `src/lib/controls/scheduling/calendar/{index.ts,types.ts,utils.ts,Calendar.svelte,CalendarGrid.svelte,EventBar.svelte}`.
