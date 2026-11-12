# Field

Wrapper, amely egy űrlapvezérlőt címkével, súgószöveggel és hibaüzenettel párosít. A `FieldGroup`-pal több vízszintes mezőt igazíthatsz kétoszlopos rácsba, a `FieldSpan`-nel pedig bármelyik elem kiterjedhet a teljes szélességre.

## Importálás

```ts
import { Field, FieldGroup, FieldSpan } from '@atom-forge/ui';
```

---

## Field propok

| Prop           | Csoport    | Típus                        | Alapérték    | Leírás                                                                                              |
|----------------|------------|------------------------------|--------------|-----------------------------------------------------------------------------------------------------|
| `label`        | Tartalom   | `string`                     | —            | A vezérlő fölött (vagy mellett) megjelenő címke.                                                    |
| `info`         | Tartalom   | `string`                     | —            | Jobbra igazított tájékoztató szöveg a címkével egy sorban.                                          |
| `hint`         | Tartalom   | `string`                     | —            | A vezérlő alatt megjelenő súgószöveg.                                                               |
| `error`        | Tartalom   | `string`                     | —            | A vezérlő alatt megjelenő hibaüzenet. Elsőbbséget élvez a `hint`-tel szemben.                        |
| `required`     | Tartalom   | `boolean`                    | `false`      | Piros `*`-ot fűz a címkéhez.                                                                        |
| `optional`     | Tartalom   | `boolean`                    | `false`      | `(optional)` jelvényt fűz a címkéhez.                                                               |
| `for`          | Tartalom   | `string`                     | —            | Explicit `<label for>` cél. Ha elhagyod, a Field automatikusan az első vezérlőjéhez köti a címkét.  |
| `layout`       | Elrendezés | `'vertical' \| 'horizontal'` | `'vertical'` | Függőlegesen a címke a vezérlő fölé kerül. Vízszintesen két rácscellát renderel a `FieldGroup`-on belüli használathoz. |
| `labelSnippet` | Snippetek  | `Snippet`                    | —            | Felülírja a `label`-t. Gazdag címketartalomhoz (ikonok, jelvények stb.).                            |
| `hintSnippet`  | Snippetek  | `Snippet`                    | —            | Felülírja a `hint`-et.                                                                              |
| `errorSnippet` | Snippetek  | `Snippet`                    | —            | Felülírja az `error`-t.                                                                             |
| `action`       | Snippetek  | `Snippet`                    | —            | A címkesorban jobbra igazítva jelenik meg (pl. egy „Elfelejtetted?” link).                          |
| `class`        | Stílus     | `string`                     | —            | További Tailwind osztályok a wrapper elemen.                                                        |

---

## FieldGroup propok

| Prop         | Típus    | Alapérték | Leírás                                                                                   |
|--------------|----------|----------|------------------------------------------------------------------------------------------|
| `labelWidth` | `string` | `'auto'` | A címkeoszlop szélessége. Bármilyen CSS-érték: `"150px"`, `"30%"`. Alapértelmezés szerint `max-content`. |
| `class`      | `string` | —        | További Tailwind osztályok a rácskonténeren.                                             |

---

## FieldSpan

Nincsenek propjai. Bármilyen tartalmat egy `col-span-2` divbe csomagol, így az egy `FieldGroup`-on belül mindkét oszlopon átnyúlik (pl. egy `<hr>`, egy szakaszcím vagy egy teljes szélességű gombsor).

---

## Használat

### Alap (függőleges)

```sveltehtml
<Field label="Email address" info="Required" hint="We'll never share your email." required>
  <Input bind:value={email} placeholder="you@example.com"/>
</Field>

<Field label="Full name" optional>
  <Input bind:value={name}/>
</Field>

<Field label="Accept terms" error={!agreed ? 'You must accept the terms.' : undefined}>
  <Switch bind:value={agreed} label="I agree to the terms and conditions"/>
</Field>
```

### Vízszintes elrendezés FieldGrouppal

```sveltehtml
<FieldGroup labelWidth="120px">
  <Field label="First name" layout="horizontal" required>
    <Input bind:value={first}/>
  </Field>

  <Field label="Last name" layout="horizontal">
    <Input bind:value={last}/>
  </Field>

  <FieldSpan>
    <hr class="border-frame"/>
  </FieldSpan>

  <Field label="Agree" layout="horizontal">
    <Switch bind:value={agreed} label="I accept the terms"/>
  </Field>
</FieldGroup>
```

### Felülírás snippetekkel

```sveltehtml
<Field required {labelSnippet} {action} {errorSnippet}>
  <Input bind:value={password} type="password"/>
</Field>

{#snippet labelSnippet()}
  <span class="flex items-center gap-1.5 text-sm font-medium">
    <IconLock size={14}/> Password
  </span>
{/snippet}

{#snippet action()}
  <a href="/forgot" class="text-xs text-accent hover:underline">Forgot?</a>
{/snippet}

{#snippet errorSnippet()}
  {#if weak}Password is too short.{/if}
{/snippet}
```

---

## Megjegyzések

- Az `error` elsőbbséget élvez a `hint`-tel szemben — ha mindkettő meg van adva, csak a hiba látszik.
- `layout="horizontal"` esetén a `Field` két rácsgyereket renderel (címkecella + vezérlőcella), amelyek beilleszkednek a `FieldGroup` kétoszlopos rácsába.
- A `FieldSpan`-nek csak `FieldGroup`-on belül van értelme.

## Mikor használd

Ha egy űrlapvezérlő köré címkét, kiegészítő szöveget és hibamegjelenítést szeretnél összeállítani.

## Alternatívák

Használd a vezérlő saját címkéjét, ha nincs szükség külön súgó/hiba elrendezésre. A FieldGroup igazított vízszintes mezőkhöz való, nem űrlapállapot-provider.

## Beállítás és működés

A Field a `<label>`-jét a benne renderelt első űrlapvezérlőhöz köti: generál egy ID-t, a vezérlő (`Input`, `Textarea`, `NativeSelect`, `Select`, `MultiSelect`, `DatePicker`, `DateTimePicker`, `TimePicker`, `ColorPicker`, `TagEditor`, `Switch`) ezt a fókuszálható elemére teszi, a gombszerű triggerek pedig `aria-labelledby`-val is hivatkoznak a címkére. A képernyőolvasók a címkét a vezérlő neveként olvassák fel, a tesztek pedig `getByLabelText`-tel kérdezhetik le a vezérlőt. Az `Input`-on beállított `id` megmarad, és a címke azt követi. Ugyanabban a Fieldben a további vezérlők nincsenek hozzákötve. A súgó- vagy hibaszöveg `aria-describedby`-val kapcsolódik ugyanahhoz a vezérlőhöz, és amíg hiba látszik, a vezérlő `aria-invalid="true"`-t kap (a gombszerű triggerek, például a Select és a dátum-/időválasztók csak a leírást kapják meg, mert az `aria-invalid` gombokon nem érvényes). Az `Input`-on beállított `aria-describedby` megmarad, és kiegészül. A `for` megadásával kikapcsolhatod ezt, és magad kötheted be az ID-t és az ARIA-attribútumokat. Egyedi vezérlők a `field.useFieldControl()`-lal (az `@atom-forge/ui` exportálja) csatlakozhatnak a mechanizmushoz, a komponens inicializálása közben meghívva.

A Field nem köt értékeket, és nem állítja be a gyerek `invalid` stílusát vagy `required` attribútumait. A kötelező/opcionális jelölők csak megjelenítési célúak. Az `errorSnippet` akkor is elsőbbséget élvez a súgószöveggel szemben, ha nem renderel szöveget. Egyedi címke-snippetnek magának kell gondoskodnia az akadálymentes címke-hozzárendelésről.
