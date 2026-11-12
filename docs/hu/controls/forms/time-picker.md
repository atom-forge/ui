# TimePicker

Időválasztó űrlapvezérlő, újrahasznosítható időválasztó törzs- és popover-rétegekre építve. Megtartja a nyilvános `string | null` értékformát, durva mutatós (coarse pointer) eszközökön pedig a natív időmezőre vált.

## Importálás

```ts
import { TimePicker, TimePickerBody, TimePopover } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `string \| null` | `null` | Bindolható időérték. Formátuma `"HH:MM"`, vagy `"HH:MM:SS"`, ha a `seconds` be van kapcsolva. |
| `seconds` | `boolean` | `false` | Engedélyezi a másodperceket. Az érték formátumát `"HH:MM:SS"`-re változtatja. |
| `placeholder` | `string` | `'Select time'` | A szöveg, amely akkor látszik, ha nincs kiválasztott idő. |
| `disabled` | `boolean` | `false` | Letiltja a választót. |
| `clearable` | `boolean` | `false` | × gombot mutat a kiválasztott idő törléséhez. |
| `round` | `false \| 0 \| 5 \| 10 \| 15 \| 20 \| 30 \| number[]` | `false` | A legközelebbi intervallumra kerekít. `0` = legközelebbi egész óra, `5`–`30` = legközelebbi N perc, `number[]` = a lista legközelebbi értékéhez igazít (pl. `[0, 15, 30, 45]`). |
| `compact` | `boolean` | `false` | Kompakt méret — `h-8`. Kizárja a `small`-t. |
| `small` | `boolean` | `false` | Kis méret — `h-6`. Kizárja a `compact`-ot. |
| `class` | `string` | — | További CSS-osztályok a trigger elemre. |

## Kapcsolódó komponensek

| Komponens | Leírás |
|-----------|-------------|
| `TimePickerBody` | Időválasztó (spinner) törzs trigger és overlay nélkül. |
| `TimePopover` | A `TimePickerBody` köré rendezett, horgonyzott popover teljes szélességű megerősítő lábléccel. |
| `TimePicker` | Űrlapvezérlő, amely belül a `TimePopover`-t használja. |

## Működés

- Asztali, finom mutatós eszközökön a könyvtár saját popovere nyílik meg.
- Durva mutatós (coarse pointer) eszközökön a rejtett natív `<input type="time">` működik.
- A popoverek külső kattintásra és Escape-re bezáródnak.
- A megerősítés kifejezetten a teljes szélességű lábléc gombjával történik.
- A megerősítő gomb alapértelmezett felirata `OK`; a lokalizálásához add meg a `confirmLabel`-t.
- A `TimePopover` `onconfirm`-ja lehet aszinkron; amíg függőben van, a lábléc betöltési állapotot mutat.
- Null érték esetén a popover alapértéke `00:00` vagy `00:00:00`, így az éjfél szerkesztés nélkül is megerősíthető.
- A `TimePickerBody` a vizuális címkéket rejtve tartja, az `Hours`, `Minutes` és `Seconds` feliratokat akadálymentes címkékként adja meg.

---

## Használat

```sveltehtml
<!-- Basic -->
<TimePicker bind:value clearable/>

<!-- With seconds -->
<TimePicker bind:value seconds clearable/>

<!-- Sizes -->
<TimePicker bind:value compact/>
<TimePicker bind:value small/>

<!-- Disabled -->
<TimePicker value="09:00" disabled/>

<!-- Rounding -->
<TimePicker bind:value round={0}/>       <!-- nearest hour: 09:23 → 09:00 -->
<TimePicker bind:value round={10}/>      <!-- nearest 10 min: 09:23 → 09:20 -->
<TimePicker bind:value round={15}/>      <!-- nearest 15 min: 09:08 → 09:15 -->
<TimePicker bind:value round={30}/>      <!-- nearest 30 min -->

<!-- Snap to list: nearest of 0, 15, 30, 45 -->
<TimePicker bind:value round={[0, 15, 30, 45]}/>

<!-- Custom list: 10, 30, 50 minutes -->
<TimePicker bind:value round={[10, 30, 50]}/>
```

### Műveleti popover

```sveltehtml
<TimePopover value={time} round={5} confirmLabel="Save" onconfirm={saveTime}>
  {#snippet trigger(open, isOpen)}
    <Button secondary outline label="Choose time" onclick={open} aria-expanded={isOpen} />
  {/snippet}
</TimePopover>
```

## Mikor használd

Nullázható, napon belüli időpontot tartalmazó szöveghez, dátum és időzóna nélkül.

## Alternatívák

Használd a [DateTimePicker](date-time-picker.md)-t, ha a dátumnak és az időnek együtt kell mozognia. A TimePickerBody popup nélküli, beágyazott spinnereket ad.

## Beállítás és működés

A TimePickert és a TimePopovert a `Root` alatt rendereld. `string | null` értéket bindolj, ne Date-et. Asztali gépen a piszkozat az OK-ra véglegesedik; durva mutatós eszközön a natív változások azonnal véglegesednek. A natív kerekítés a legközelebbi, teljes percszámban mért intervallumot használja, az asztali spinner opciói viszont a kiválasztott órán belül korlátozzák a perceket; ne feltételezd, hogy a kerekítés mindkét esetben ugyanúgy működik. A külső értékeket nem kerekíti automatikusan. Tömbös kerekítéshez nem üres, érvényes perclistát adj meg. Nincsenek min/max idő propok, időzóna-kezelés vagy nyilvános change callbackek a választón.
