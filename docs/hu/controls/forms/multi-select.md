# MultiSelect

Több elem kiválasztása egy listából. Minden kiválasztott opció `value` mezőjét tárolja, és az ember által olvasható `label`-t chipekként jeleníti meg. Statikus tömböket és aszinkron keresőfüggvényeket is támogat.

## Importálás

```ts
import { MultiSelect } from '@atom-forge/ui';
import type { SelectOption, SelectOptionsSource } from '@atom-forge/ui';
```

## Alap használat

```sveltehtml
<script lang="ts">
  import { MultiSelect } from '@atom-forge/ui';

  const options = [
    { value: 'hu', label: 'Hungary' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
  ];

  let value = $state<(string | number)[]>([]);
</script>

<MultiSelect {options} bind:value placeholder="Select countries..." />
```

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `(string \| number)[]` | `[]` | A kiválasztott értékek. Kétirányú kötéshez használd a `bind:value`-t. |
| `options` | `SelectOptionsSource` | — | Statikus tömb vagy aszinkron forrásobjektum `search` és `get` metódussal. |
| `placeholder` | `string` | `'Select...'` | Placeholder, amely akkor látszik, ha nincs kiválasztva semmi. |
| `disabled` | `boolean` | `false` | Letiltja a triggert. A chipek látszanak továbbra is. |
| `searchable` | `boolean` | `true` | Keresőmezőt mutat a lenyíló listában. |
| `button` | `SelectButtonTrigger` | — | A chipmező helyett egy Button komponenst renderel triggerként. |
| `hideKeyboardHints` | `boolean` | `false` | Elrejti a billentyűzetes navigáció tippsávját a lenyíló lista alján. |
| `clearable` | `boolean` | `false` | „Összes törlése” gombot mutat, ha vannak kiválasztott elemek. |
| `sortable` | `boolean` | `false` | Engedélyezi a chipek drag-and-drop átrendezését. |
| `max` | `number` | — | A legfeljebb kiválasztható elemek száma. A további opciók kiszürkülnek. |
| `compact` | `boolean` | — | Kompakt méret. Kizárja a `small`-t. |
| `small` | `boolean` | — | Kis méret. Kizárja a `compact`-ot. |
| `class` | `string` | — | További osztályok, amelyek a trigger elemre kerülnek. |

## Snippetek

### `chip` — egyedi chip renderelő

```sveltehtml
{#snippet chip(opt, remove)}
  <span>{opt.label} <button onclick={remove}>×</button></span>
{/snippet}
```

Paraméterei: `(opt: SelectOption, remove: () => void)`.

### `option` — egyedi listaelem-renderelő

```sveltehtml
{#snippet option(opt, isHighlighted)}
  <div class={isHighlighted ? 'bg-accent' : ''}>
    {opt.label}
  </div>
{/snippet}
```

Paraméterei: `(opt: SelectOption, isHighlighted: boolean)`.

## Aszinkron opciók

Adj át `options`-ként egy `search` és `get` metódussal rendelkező objektumot.
A `search(query)` igény szerint kéri le a találatokat.
A `get(values)` sortable módban oldja fel a kiválasztott elemek címkéit. Nem sortable módban jelenleg csak a lenyíló listában kiválasztott opciókat gyorsítótárazza; lásd lent a Beállítás és működés részt.

```sveltehtml
<script lang="ts">
  import { MultiSelect, type SelectOption } from '@atom-forge/ui';

  const source = {
    search: async (query: string): Promise<SelectOption[]> => {
      const res = await fetch(`/api/users?q=${encodeURIComponent(query)}`);
      return res.json();
    },
    get: async (values: (string | number)[]): Promise<SelectOption[]> => {
      const res = await fetch(`/api/users?ids=${values.join(',')}`);
      return res.json();
    },
  };

  let selected = $state<(string | number)[]>([]);
</script>

<MultiSelect options={source} bind:value={selected} placeholder="Search users…" />
```

## Rendezhető chipek

A drag-and-drop átrendezéshez add hozzá a `sortable`-t. A `value` kötés a megjelenített sorrenddel szinkronban marad.

```sveltehtml
<MultiSelect {options} bind:value sortable />
```

## Gomb trigger

Ha a trigger egy Button legyen, használd ugyanazt a `button` propot, mint a Selectnél. Lefelé mutató nyíl (chevron) csak akkor jelenik meg, ha megadsz `endIcon`-t.

A variáns flagek opcionális logikai értékek maradnak, beleértve a dinamikus értékeket és az explicit `false`-t is. A trigger legfeljebb egy aktív variánst ad tovább a Buttonnak: az első igaz flaget ebben a sorrendben: `destructive` → `secondary` → `ghost` → `link` → `muted` → `accent`. Ha egyik sem igaz, a primary stílust használja. A variáns változásai reaktívak.

```sveltehtml
<MultiSelect
  {options}
  bind:value
  button={{label: 'Add tags', icon: Plus, secondary: true}}
/>
```

## Billentyűzet

| Billentyű | Művelet |
|-----|--------|
| `ArrowDown / Up` | Navigálás a lenyíló listában |
| `Enter` | A kiemelt opció ki-/bekapcsolása |
| `Escape` | A lenyíló lista bezárása |

A lenyíló lista megnyitásakor egyik opció sincs kiemelve. A billentyűzetes navigációt egy nyílbillentyűvel kezdheted.

## A SelectOption típus

```ts
type SelectOption = {
  value: string | number;
  label: any;
};
```

## Mikor használd

Több szöveges vagy numerikus ID kiválasztásához, a kiválasztott chipek opcionális átrendezésével.

## Alternatívák

Egyetlen ID-hoz használd a [Select](select.md)-et, ID/címke modell helyett szabad szöveges értékekhez pedig a [TagEditor](tag-editor.md)-t.

## Beállítás és működés

A `Root` alatt rendereld, hogy legyen popup context. Egyedi ID-k tömbjét bindold, következetesen szöveg vagy szám típussal. A ki-/bekapcsolás a lenyíló lista bezárása nélkül frissíti a kijelölést; nincs nyilvános change callback. A megnyitott lista pillanatképet készít a kezdeti kijelölésről, és nem követi a későbbi külső értékadásokat. A `max` megakadályozza az újabb elemek hozzáadását, de a kívülről kapott értékeket nem vágja le. Statikus, nem sortable módban a chipek az options tömb sorrendjét követik, nem a kiválasztott értékekét. Az aszinkron keresésben nincs beépített debounce. **Jelenlegi korlát:** nem sortable aszinkron módban csak a lenyíló listában kiválasztott, gyorsítótárazott opciók jelennek meg; az előre kiválasztott elemek címkéinek feltöltéséhez nem hívja meg a `get()`-et. Sortable módban meghívja a `get(value)`-t, de a feloldott elemeket visszaszinkronizálja az értéktömbbe, így a fel nem oldott ID-k elveszhetnek. Ne számíts arra, hogy megőrzi a nem elérhető ID-ket.
