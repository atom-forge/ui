# Code Input

Szegmentált beviteli mező fix hosszúságú kódokhoz — OTP-khez, PIN-kódokhoz, licenckulcsokhoz, aktiváló kódokhoz. Vizuálisan karakterenkénti dobozokat jelenít meg, alatta viszont egyetlen rejtett `<input>` dolgozik az akadálymentesség és a natív beillesztés kedvéért.

## Importálás

```ts
import { CodeInput } from '@atom-forge/ui';
```

---

## Propok

| Prop           | Típus                                                                          | Alapérték | Leírás                                                                                                                                                                                   |
|----------------|--------------------------------------------------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `value`        | `string`                                                                       | `''`    | Bindolható. Csak a **szerkeszthető** részt tartalmazza — a prefix karakterei nincsenek benne.                                                                                            |
| `layout`       | `number \| number[]`                                                           | `6`     | Szám esetén ennyi doboz jön létre. Tömb esetén (pl. `[4, 4, 4]`) a `separator`-ral elválasztott csoportok.                                                                               |
| `separator`    | `string`                                                                       | `'-'`   | A csoportok közé renderelt karakter, ha a `layout` tömb.                                                                                                                                 |
| `prefix`       | `string`                                                                       | `''`    | Előre kitöltött, csak olvasható karakterek az elején. A prefix dobozai halványak és nem interaktívak. A `value` csak a szerkeszthető részt tartalmazza. Beillesztéskor a prefix automatikusan levágódik, ha szerepel. |
| `characterSet` | `'any' \| 'numeric' \| 'alpha' \| 'alphanumeric' \| (char: string) => boolean` | `'any'` | Korlátozza az elfogadott karaktereket. Teljesen egyedi validációhoz adj át függvényt.                                                                                                    |
| `placeholder`  | `string`                                                                       | `''`    | Az üres, szerkeszthető dobozokban megjelenő karakter.                                                                                                                                    |
| `uppercase`    | `boolean`                                                                      | `false` | Bevitelkor és beillesztéskor minden karaktert nagybetűssé alakít. A `prefix`-et is normalizálja.                                                                                         |
| `disabled`     | `boolean`                                                                      | `false` | Letiltja a teljes mezőt.                                                                                                                                                                 |
| `compact`      | `boolean`                                                                      | —       | Kompakt méret (`w-8 h-10`). Kizárja a `small`-t.                                                                                                                                         |
| `small`        | `boolean`                                                                      | —       | Kis méret (`w-6 h-8`). Kizárja a `compact`-ot.                                                                                                                                           |
| `onComplete`   | `(value: string) => void`                                                      | —       | Akkor hívódik meg, amikor egy belső szerkesztés vagy beillesztés után minden **szerkeszthető** doboz ki van töltve. Csak a szerkeszthető részt kapja meg.                                 |

---

## Billentyűzet

| Billentyű       | Művelet                                                               |
|-----------------|-----------------------------------------------------------------------|
| `0–9 / A–Z / …` | Karakter beírása, továbblépés a következő dobozra                     |
| `ArrowRight`    | Fókusz a következő dobozra                                            |
| `ArrowLeft`     | Fókusz az előző dobozra                                               |
| `Backspace`     | Törli az aktuális dobozt; ha már üres, törli az előzőt és visszalép   |
| `Delete`        | Ugyanaz, mint a Backspace                                             |

---

## Beillesztés

A beillesztett szöveg az aktuális pozíciótól kezdve tölti ki a szerkeszthető dobozokat. Csak a `characterSet` által elfogadott karakterek kerülnek be — a többit csendben kihagyja. Ha a beillesztett szöveg a `prefix`-szel kezdődik, kitöltés előtt automatikusan levágja. Az `onComplete` lefut, ha végül minden szerkeszthető doboz kitöltött.

---

## Használat

### OTP — 6 számjegyű

```sveltehtml

<script lang="ts">
	let otp = $state('');
</script>

<CodeInput
	bind:value={otp}
	layout={6}
	characterSet="numeric"
	placeholder="·"
	onComplete={(v) => console.log('Completed code:', v)}
/>
```

### Licenckulcs — csoportosított elrendezés

```sveltehtml

<CodeInput
	bind:value={key}
	layout={[4, 4, 4, 4]}
	separator="-"
	characterSet="alphanumeric"
	uppercase
	placeholder="·"
/>
<!-- renders: XXXX - XXXX - XXXX - XXXX -->
```

### Prefix — SMS-ben kapott ellenőrző kód

```sveltehtml
<!-- layout [3,3], first group is the read-only prefix "ABC" -->
<CodeInput
	bind:value={code}
	layout={[3, 3]}
	separator="-"
	characterSet="numeric"
	prefix="ABC"
	placeholder="·"
/>
<!-- renders: ABC - ··· -->
<!-- value contains only the 3 editable digits -->
```

### Egyedi karakterkészlet — csak hexa

```sveltehtml

<script lang="ts">
	const isHex = (char: string) => /^[0-9a-fA-F]$/.test(char);
</script>

<CodeInput
	bind:value={hex}
	layout={6}
	characterSet={isHex}
	uppercase
	placeholder="0"
/>
```

### Méretek

```sveltehtml

<CodeInput bind:value={a} layout={4} characterSet="numeric"/>          <!-- normal (default) -->
<CodeInput bind:value={b} layout={4} characterSet="numeric" compact/>  <!-- compact -->
<CodeInput bind:value={c} layout={4} characterSet="numeric" small/>    <!-- small -->
```

### Field wrapperrel

```sveltehtml

<Field label="Verification code">
	<CodeInput bind:value={code} layout={6} characterSet="numeric"/>
</Field>
```

---

## Megjegyzések

- Egyetlen rejtett `<input>` kezeli az összes böngészőeseményt (fókusz, billentyűzet, beillesztés, `autocomplete="one-time-code"` a mobilos SMS OTP automatikus kitöltéséhez). A `maxlength` értéke csak a szerkeszthető hossz (teljes hossz − prefix hossza).
- A látható dobozok tisztán megjelenítési célúak — bármelyik szerkeszthető dobozra kattintva a rejtett input kap fókuszt, és a belső kurzor arra a pozícióra ugrik. A prefix dobozai nem kattinthatók.
- Ha nincs `placeholder` megadva, az aktív üres dobozban villogó accent színű kurzor látszik.
- Az `uppercase` a begépelt és a beillesztett szöveget is normalizálja, a `prefix`-szel együtt.
- Az `onComplete` minden teljes kitöltéskor lefut — beillesztéskor is —, és csak a szerkeszthető részt kapja meg (prefix nélkül).
- A `value` sosem tartalmazza a prefix karaktereit. A teljes kódhoz fűzd össze kézzel: `` `${prefix}${value}` ``.

## Mikor használd

Fix hosszúságú karakterkódhoz, opcionális csak olvasható prefixszel és csoportosítással.

## Alternatívák

Változó hosszúságú szöveghez vagy numerikus szöveghez használd az [Input](input.md)-ot. A CodeInput nem maszkolt jelszómező.

## Beállítás és működés

Csak a szerkeszthető szöveget bindold. Az elrendezést, a prefix dobozait és a méretet az inicializáláskor rögzíti; a módosításukhoz mountold újra. Az `onComplete` akkor fut le, amikor belső szerkesztés vagy beillesztés után minden szerkeszthető doboz ki van töltve — akkor is, ha egy már teljes kódban cserélsz le egy karaktert; külső értékadás nem hívja meg. UI callbackként kezeld, ne a kód érvényességének bizonyítékaként vagy egyszeri beküldési eseményként. **Jelenlegi korlátok:** a rejtett input `tabindex="-1"`-et kap, és nincs `oninput` kezelője; ne számíts arra, hogy a szokásos Tab-navigáció működik, vagy hogy a mobilos automatikus kitöltés/bevitel frissíti a kötést. A további attribútumok a külső divre kerülnek, nem a rejtett inputra. A beépített alpha/alphanumeric validáció csak ASCII karaktereket ismer.
