# DatePicker

Egyetlen dátum kiválasztására szolgáló űrlapvezérlő, újrahasznosítható dátumválasztó törzs- és popover-rétegekre építve. Támogatja a min/max határokat, a letiltott dátumokat, a hét kezdőnapjának beállítását, az aszinkron popover-megerősítést és a törölhető kijelölést.

## Importálás

```ts
import { DatePicker, DatePickerBody, DatePopover } from '@atom-forge/ui';
```

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `Date \| null` | `null` | Bindolható kiválasztott dátum. |
| `format` | `(date: Date) => string` | en-US rövid | Egyedi dátumformázó. |
| `placeholder` | `string` | `'Select date'` | A szöveg, amely akkor látszik, ha nincs kiválasztott dátum. |
| `disabled` | `boolean` | `false` | Letiltja a dátumválasztót. |
| `clearable` | `boolean` | `false` | × gombot mutat a kijelölés törléséhez. |
| `min` | `Date` | — | A legkorábbi választható dátum (beleértve). |
| `max` | `Date` | — | A legkésőbbi választható dátum (beleértve). |
| `weekStart` | `0 \| 1` | `1` | A hét első napja. `0` = vasárnap, `1` = hétfő. |
| `disabledDates` | `Date[]` | — | Letiltandó konkrét dátumok. |
| `disabledDays` | `number[]` | — | Letiltandó napok a héten. A `[0, 6]` a hétvégét tiltja le. |
| `compact` | `boolean` | — | Kompakt méret — `h-8`. Kizárja a `small`-t. |
| `small` | `boolean` | — | Kis méret — `h-6`. Kizárja a `compact`-ot. |
| `class` | `string` | — | További CSS-osztályok a trigger elemre. |

## Kapcsolódó komponensek

| Komponens | Leírás |
|-----------|-------------|
| `DatePickerBody` | Naptártörzs trigger és overlay nélkül. |
| `DatePopover` | A `DatePickerBody` köré rendezett, horgonyzott popover teljes szélességű megerősítő lábléccel. |
| `DatePicker` | Űrlapvezérlő, amely belül a `DatePopover`-t használja. |

## A popover működése

- A popoverek külső kattintásra és Escape-re bezáródnak.
- A megerősítés kifejezetten a teljes szélességű lábléc gombjával történik.
- A megerősítő gomb alapértelmezett felirata `OK`; a lokalizálásához add meg a `confirmLabel`-t.
- Az `onconfirm` lehet aszinkron; amíg függőben van, a lábléc betöltési állapotot mutat.

## Használat

```sveltehtml
<DatePicker bind:value={myDate} clearable />
```

### Korlátozásokkal

```sveltehtml
<script lang="ts">
  const today = new Date();
</script>

<DatePicker bind:value={date} min={today} disabledDays={[0, 6]} />
```

### Egyedi formátum

```sveltehtml
<DatePicker bind:value={date} format={d => d.toLocaleDateString('en-GB')} />
```

### Műveleti popover

```sveltehtml
<DatePopover value={date} confirmLabel="Save" onconfirm={saveDate}>
  {#snippet trigger(open, isOpen)}
    <Button secondary outline label="Choose date" onclick={open} aria-expanded={isOpen} />
  {/snippet}
</DatePopover>
```

## Mikor használd

Nullázható helyi naptári dátumhoz, asztali naptárral és érintőképernyőn natív választóval.

## Alternatívák

Helyi dátumhoz és időponthoz használd a [DateTimePicker](date-time-picker.md)-t, csak időt tartalmazó szöveghez a [TimePicker](time-picker.md)-t. Popup context nélküli, beágyazott naptárhoz használd a DatePickerBody-t.

## Beállítás és működés

A DatePickert és a DatePopovert a `Root` alatt rendereld, hogy legyen popup context — érintőképernyős eszközökön is. `Date | null` értéket bindolj. Asztali gépen a kijelölés az OK-ig csak piszkozat; a megszakítás nem véglegesíti. Durva mutatós (coarse pointer) eszközön a natív input azonnal ír, és nem a megerősítő callback folyamatát használja. A naptár korlátozásai szűkítik a választható napokat, de a kívülről beállított értékeket nem validálják. A natív input csak a min/max értéket kapja meg, a disabledDates-t és a disabledDays-t nem. A dátumok helyi naptári mezőket használnak; a formázás nem változtat a tároláson vagy az időzónán.
