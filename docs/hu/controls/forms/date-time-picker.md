# DateTimePicker

Kombinált dátum- és időválasztó űrlapvezérlő. Belül a `DateTimePopover`-t használja, és helyi JavaScript `Date | null` értéket ad vissza.

## Importálás

```ts
import { DateTimePicker, DateTimePickerBody, DateTimePopover } from '@atom-forge/ui';
```

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `Date \| null` | `null` | Bindolható kiválasztott dátum és idő. |
| `format` | `(date: Date) => string` | en-US dátum/idő | Egyedi megjelenítési formázó. |
| `placeholder` | `string` | `'Select date and time'` | A szöveg, amely akkor látszik, ha nincs kiválasztott érték. |
| `disabled` | `boolean` | `false` | Letiltja a választót. |
| `clearable` | `boolean` | `false` | Törlés gombot mutat. |
| `min` | `Date` | — | A legkorábbi választható dátum (beleértve). |
| `max` | `Date` | — | A legkésőbbi választható dátum (beleértve). |
| `seconds` | `boolean` | `false` | Engedélyezi a másodperceket a kiválasztott időben. |
| `round` | `false \| 0 \| 5 \| 10 \| 15 \| 20 \| 30 \| number[]` | `false` | Kerekíti vagy adott értékekhez igazítja a perceket. |
| `compact` | `boolean` | `false` | Kompakt méret. Kizárja a `small`-t. |
| `small` | `boolean` | `false` | Kis méret. Kizárja a `compact`-ot. |
| `class` | `string` | — | További CSS-osztályok a trigger elemre. |

## Kapcsolódó komponensek

| Komponens | Leírás |
|-----------|-------------|
| `DateTimePickerBody` | Kombinált dátum- és időtörzs trigger és overlay nélkül. |
| `DateTimePopover` | A `DateTimePickerBody` köré rendezett, horgonyzott popover teljes szélességű megerősítő lábléccel. |
| `DateTimePicker` | Űrlapvezérlő, amely belül a `DateTimePopover`-t használja. |

## A popover működése

- A popoverek külső kattintásra és Escape-re bezáródnak.
- A megerősítés kifejezetten a teljes szélességű lábléc gombjával történik.
- A megerősítő gomb alapértelmezett felirata `OK`; a lokalizálásához add meg a `confirmLabel`-t.
- Az `onconfirm` lehet aszinkron; amíg függőben van, a lábléc betöltési állapotot mutat.
- Ha dátumot választasz az idő módosítása nélkül, az időrész alapértéke helyi idő szerinti éjfél.

## Használat

```sveltehtml
<DateTimePicker bind:value={startsAt} min={new Date()} round={5} clearable />
```

### Műveleti popover

```sveltehtml
<DateTimePopover value={startsAt} confirmLabel="Save" onconfirm={saveStartsAt}>
  {#snippet trigger(open, isOpen)}
    <Button secondary outline label="Choose date and time" onclick={open} aria-expanded={isOpen} />
  {/snippet}
</DateTimePopover>
```

## Mikor használd

Nullázható helyi dátumhoz és időhöz; nem csak dátumot tartalmazó értékhez, és nem időzóna-tudatos ütemezési modellhez.

## Alternatívák

Naptári dátumhoz használd a [DatePicker](date-picker.md)-t, független időszöveghez a [TimePicker](time-picker.md)-t. A DateTimePickerBody beágyazott összeállításhoz használható.

## Beállítás és működés

A DateTimePickert és a DateTimePopovert a `Root` alatt rendereld. `Date | null` értéket bindolj; asztali gépen a szerkesztés csak az OK után véglegesedik, durva mutatós (coarse pointer) eszközön viszont a `datetime-local` azonnal ír. Az asztali naptár a min/max értéket napi határként kezeli, és nem korlátozza pontos időbélyegekre az időválasztót. A natív input időbélyeg-alapú min/max értéket kap, de a `round`-ot nem alkalmazza. A pontos határokat és az időzóna-átváltást az alkalmazásban validáld. Időzóna-választás és tartomány mód nincs. Az alapértelmezett formázás akkor is elhagyja a másodperceket, ha a `seconds` be van kapcsolva; a megjelenítésükhöz adj meg `format`-ot.
