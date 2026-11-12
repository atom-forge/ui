# NativeSelect

Stílusos wrapper a natív `<select>` elem körül. Ugyanazokat a méretvariánsokat támogatja, mint a többi űrlapvezérlő, és van opcionális keret nélküli módja.

## Importálás

```ts
import { NativeSelect } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `options` | `{ value: any; label: string }[]` | — | A renderelendő opciók listája. |
| `value` | `any` | — | Bindolható kiválasztott érték. |
| `placeholder` | `string` | `'Select an option'` | A szöveg, amely akkor látszik, ha nincs kiválasztva semmi. Az üres állapot opciója rejtve van a natív opciólistában. |
| `disabled` | `boolean` | — | Letiltja a selectet. |
| `borderless` | `boolean` | — | Eltávolítja a keretet, és átlátszóvá teszi a hátteret. |
| `compact` | `boolean` | — | Kompakt méret (h-8, text-xs). Kizárja a `small`-t. |
| `small` | `boolean` | — | Kis méret (h-6, text-xs). Kizárja a `compact`-ot. |

---

## Méretek

| Méret | Magasság | Betűméret |
|------|--------|------|
| normál | `h-10` | `text-sm` |
| `compact` | `h-8` | `text-xs` |
| `small` | `h-6` | `text-xs` |

---

## Használat

```sveltehtml
<script lang="ts">
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];
  let selected = $state();
</script>

<NativeSelect {options} bind:value={selected}/>
<NativeSelect {options} bind:value={selected} compact/>
<NativeSelect {options} bind:value={selected} placeholder="Choose one..."/>
<NativeSelect {options} bind:value={selected} borderless/>
<NativeSelect {options} bind:value={selected} disabled/>
```

## Mikor használd

Egyszerű, egyválasztós listához a böngésző natív menüjével, popup provider nélkül.

## Alternatívák

Kereséshez, aszinkron opciókhoz vagy egyedi opció-rendereléshez használd a [Select](select.md)-et; egyszerre látható választási lehetőségekhez a [Radio](radio.md)-t.

## Beállítás és működés

A `value`-t az alkalmazás állapotához bindold. Az interakciót a ráhelyezett natív select kezeli, a kiválasztott opciót pedig egy külön címke mutatja. A megjelenítéshez a keresés laza egyenlőséget (`==`) használ, a Select szigorú egyenlőségével szemben; kerüld a többértelmű, vegyes ID-típusokat. A placeholder le van tiltva, így a felhasználók a menüből nem tudnak visszatérni hozzá. Nincs keresés, egyedi opció-snippet, többes kijelölés, általános attribútum-továbbítás vagy nyilvános change callback.
