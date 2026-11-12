# Űrlapok összeállítása

Ezt a receptet akkor használd, ha a feladat egy szerkeszthető rekordot kér labelekkel, hibaüzenetekkel és mentés művelettel. Az űrlap állapota és az üzleti szabályok a felhasználó alkalmazásban maradjanak; a vezérlők a megjelenítést és az interakciót adják.

## Vezérlők választása feladat szerint

| Feladat | Összeállítás | Döntés |
|---|---|---|
| Rövid szöveg vagy jelszó | [Field](../controls/forms/field.md) + [Input](../controls/forms/input.md) | Stringeket bindolj; numerikus input módban is stringet kapsz vissza. |
| Hosszabb szöveg | Field + [Textarea](../controls/forms/textarea.md) | Többsoros tartalomhoz. |
| Egy választás | [NativeSelect](../controls/forms/native-select.md), [Select](../controls/forms/select.md) vagy [Radio](../controls/forms/radio.md) | Natív az egyszerű opciókhoz; Select kereséshez/egyedi rendereléshez; Radio a látható választásokhoz. |
| Több választás | [MultiSelect](../controls/forms/multi-select.md) vagy [Checkbox](../controls/forms/checkbox.md) | Azonosítók, illetve egymástól függetlenül látható választások. |
| Logikai beállítás | [Switch](../controls/forms/switch.md) | Boolean értéket bindolj. |
| Dátum/idő | [DatePicker](../controls/forms/date-picker.md), [TimePicker](../controls/forms/time-picker.md), [DateTimePicker](../controls/forms/date-time-picker.md) | Mielőtt megtervezed a payloadot, nézd meg az egyes vezérlők értékformátumát. |
| Egymáshoz igazított vízszintes mezők | FieldGroup + vízszintes Field + FieldSpan | Csak elrendezés, nem űrlapállapot-provider. |

## Beállítás

Svelte 5 runes-t használj SvelteKit-alkalmazásban. A Tailwind 4 és a téma betöltéséhez, valamint a könyvtár `dist` mappájának szkenneléséhez kövesd az [Első lépések](getting-started.md#css-beállítása) leírását. A CSS-t a gyökér layoutban importáld, az oldalakat pedig `Root` alatt rendereld (a popup-alapú választóknak ez kell). Ne adj át nem dokumentált `dark`/`light` propokat a Rootnak; a jelenlegi forrás a `children` és a `manageBodyStyle` propot teszi elérhetővé.

## Recept: megjelenítendő név szerkesztése

Teljes oldalkomponens, az alkalmazás Rootja alatt renderelve. A példa helyben validál és helyi pillanatképet rögzít; nem állítja, hogy szerverre mentene.

```sveltehtml
<script lang="ts">
  import { Button, Field, Input } from '@atom-forge/ui';

  let name = $state('');
  let submitted = $state(false);
  let savedName = $state<string | undefined>();
  const error = $derived(submitted && !name.trim() ? 'Enter a display name.' : undefined);

  function submit(event: SubmitEvent) {
    event.preventDefault();
    submitted = true;
    if (!name.trim()) return;
    savedName = name.trim();
  }
</script>

<form onsubmit={submit} novalidate class="flex flex-col gap-4 max-w-md">
  <Field label="Display name" required error={error}>
    <Input name="displayName" bind:value={name} required invalid={!!error}/>
  </Field>
  <Button type="submit" label="Save locally"/>
  <p role="status">{savedName === undefined ? '' : `Local snapshot: ${savedName}`}</p>
</form>
```

A Field maga köti be az akadálymentességi attribútumokat: a label nevet ad az Inputnak, a hibaszöveget `aria-describedby` kapcsolja hozzá, az Input pedig `aria-invalid`-ot kap, amíg hiba látszik. Az `invalid` csak a hibastílust adja hozzá. A `novalidate` lehetővé teszi, hogy a natív kötelezőmező-blokkolás helyett a bemutatott alkalmazásszabály fusson.

## Az alkalmazás feladatai

- A teljes validáció, a szerveroldali validáció, a szerializáció, a perzisztencia, a jogosultságok és a mentési hibák kezelése. A Field kötelező jelölője és az Input `invalid` stílusa ezeket a szabályokat nem valósítja meg.
- Aszinkron mentésnél tartsd nyilván a függőben lévő/hibás állapotot, előzd meg a duplikált kéréseket, és használd a [Button](../controls/general/button.md) `loading`/`disabled` propját; sikert csak akkor jelezz, ha a mentés tényleg sikerült.
- A numerikus stringeket kifejezetten konvertáld. A Select ID-típusai legyenek egységesek (a `string` és a `number` nem felcserélhető); a Selectnek nincs publikus `onchange` propja.
- A reset/dirty állapot, a fókusz a hibás mezőkre, valamint a natív űrlapintegráció azoknál a vezérlőknél, amelyek nem adják tovább az űrlapattribútumokat.
- Aszinkron opcióknál a forrásban valósítsd meg a throttlingot, a hibakezelést és az elavult válaszok elleni védelmet; ezek nem egy űrlapmotor funkciói.
