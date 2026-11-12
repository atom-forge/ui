# Input

Stílusos szöveges beviteli mező többféle típussal, mérettel, ikonokkal, prefix/suffix slotokkal és jelszó-láthatósági kapcsolóval.

## Importálás

```ts
import { Input } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `string` | `''` | Bindolható mezőérték. |
| `type` | `'text' \| 'integer' \| 'float' \| 'password'` | `'text'` | A mező típusa. Az `integer` és a `float` automatikusan eltávolítja az érvénytelen karaktereket. |
| `placeholder` | `string` | — | Placeholder szöveg. |
| `disabled` | `boolean` | — | Letiltja a mezőt. |
| `invalid` | `boolean` | — | Destructive színű keretet és szöveget ad. |
| `monospace` | `boolean` | — | Monospace betűtípust használ. |
| `icon` | `IconDefinition` | — | A mezőn belül bal oldalt megjelenő ikon. |
| `prefix` | `Snippet \| string` | — | Bal oldali slot (jobb oldali elválasztó kerettel). |
| `suffix` | `Snippet \| string` | — | Jobb oldali slot (bal oldali elválasztó kerettel). |
| `compact` | `boolean` | — | Kompakt méret (h-8, text-xs). Kizárja a `small`-t. |
| `small` | `boolean` | — | Kis méret (h-6). Kizárja a `compact`-ot. |
| `class` | `string` | — | További Tailwind osztályok a wrapperen, `twMerge`-dzsel összefésülve. |

---

## Méretek

| Méret | Magasság | Betűméret |
|------|--------|------|
| normál | `h-10` | `text-sm` |
| `compact` | `h-8` | `text-xs` |
| `small` | `h-6` | `text-[12px]` |

---

## Használat

```sveltehtml
<script lang="ts">
  import { Input } from '@atom-forge/ui';
  import { Search as IconSearch } from 'lucide-svelte';

  let name = $state('');
  let age = $state('');
  let pass = $state('');
  let amount = $state('');
  let url = $state('');
  let email = $state('');
  let q = $state('');
</script>

<!-- Basic -->
<Input bind:value={name} placeholder="Full name"/>

<!-- Numeric -->
<Input bind:value={age} type="integer" placeholder="Age"/>

<!-- With icon -->
<Input bind:value={name} icon={IconSearch} placeholder="Search..."/>

<!-- Password -->
<Input bind:value={pass} type="password" placeholder="Password"/>

<!-- Prefix / suffix string -->
<Input bind:value={amount} prefix="$" suffix=".00"/>

<!-- Prefix / suffix snippet -->
<Input bind:value={url}>
  {#snippet prefix()}
    <span class="text-muted-contrast text-xs">https://</span>
  {/snippet}
</Input>

<!-- Invalid state -->
<Input bind:value={email} invalid placeholder="Invalid email"/>

<!-- Sizes -->
<Input bind:value={q} compact placeholder="Compact"/>
<Input bind:value={q} small placeholder="Small"/>
```

---

## Használat ButtonBarban

```sveltehtml
<ButtonBar class="flex w-full">
  <Input bind:value={query} class="flex-1" placeholder="Search..."/>
  <Button label="Go" icon={IconSearch}/>
</ButtonBar>
```

## Mikor használd

Rövid szöveghez, jelszóhoz, vagy nemnegatív egész/tizedes számot tartalmazó szöveghez, előtaggal/utótaggal.

## Alternatívák

Többsoros szöveghez használd a [Textarea](textarea.md)-t, fix hosszúságú kódokhoz a [CodeInput](code-input.md)-ot, korlátos számértékek állításához pedig a [Slider](slider.md)-t.

## Beállítás és működés

Szöveget bindolj, numerikus módokban is. Bevitelkor lefut a formázás, megtörténik a kötés értékadása, majd a megadott `oninput` megkapja a natív eseményt. Integer módban minden törlődik a számjegyeken kívül; float módban egy tizedespont megengedett, de előjel, kitevő vagy területi beállítás szerinti tizedesjel nem. A külső értékeket nem normalizálja automatikusan. A további attribútumok a belső inputra kerülnek; a `class` a wrappert formázza. Az `invalid` csak vizuális: a validációt és az akadálymentes hibaattribútumokat magad add meg. Az exportált `focus()` metódus `bind:this`-szel érhető el; a méret az inicializáláskor rögzül.
