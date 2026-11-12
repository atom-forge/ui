# Select

Popup alapú lenyíló választó. Statikus opciótömböt vagy aszinkron keresőfüggvényt fogad. Snippetekkel egyedi renderelést ad a triggerben megjelenő értéknek és a lenyíló lista elemeinek is.

## Importálás

```ts
import { Select } from '@atom-forge/ui';
import type { SelectOption, SelectOptionsSource } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `string \| number \| undefined` | `undefined` | Bindolható kiválasztott érték. |
| `options` | `SelectOptionsSource` | `[]` | Statikus tömb vagy aszinkron forrásobjektum `search` és `get` metódussal. |
| `placeholder` | `string` | `'Select...'` | A szöveg, amely akkor látszik, ha nincs kiválasztott érték. |
| `disabled` | `boolean` | `false` | Letiltja a trigger gombot. |
| `searchable` | `boolean` | `true` | Keresőmezőt mutat a lenyíló listán belül. |
| `button` | `SelectButtonTrigger` | — | A select mezős trigger helyett egy Button komponenst renderel triggerként. |
| `hideKeyboardHints` | `boolean` | `false` | Elrejti a billentyűzetes navigáció tippsávját a lenyíló lista alján. |
| `clearable` | `boolean` | `false` | × gombot mutat az érték törléséhez. Ugyanannak az elemnek az ismételt kiválasztása is törli. |
| `compact` | `boolean` | — | Kompakt méret (h-8). Kizárja a `small`-t. |
| `small` | `boolean` | — | Kis méret (h-6). Kizárja a `compact`-ot. |
| `class` | `string` | — | További CSS-osztályok a trigger gombon. |
| `trigger` | `Snippet<[SelectOption]>` | — | A kiválasztott érték egyedi renderelése a trigger gombban. |
| `option` | `Snippet<[SelectOption, boolean]>` | — | A lenyíló lista elemeinek egyedi renderelése. Paraméterei: `(option, isHighlighted)`. |

---

## Típusok

```ts
type SelectOption = { value: string | number; label: any };

type SelectOptionsSource =
  | SelectOption[]
  | {
      search: (query: string) => Promise<SelectOption[]>;
      get: (values: (string | number)[]) => Promise<SelectOption[]>;
    };

type SelectButtonTrigger = {
  label: string;
  icon?: IconDefinition;
  endIcon?: IconDefinition;
  secondary?: boolean;
  destructive?: boolean;
  ghost?: boolean;
  link?: boolean;
  muted?: boolean;
  accent?: boolean;
  outline?: boolean;
  pill?: boolean;
  borderless?: boolean;
};
```

---

## Használat

A lenyíló lista megnyitásakor egyik opció sincs kiemelve. A billentyűzetes navigációt egy nyílbillentyűvel kezdheted.

### Statikus opciók

```sveltehtml
<script lang="ts">
  import { Select } from '@atom-forge/ui';

  const options = [
    { value: 'apple',  label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  let value = $state<string | number | undefined>();
</script>

<Select {options} bind:value placeholder="Pick a fruit..."/>
```

### Törölhető

```sveltehtml
<Select {options} bind:value clearable/>
```

### Billentyűzetes tippek elrejtése

```sveltehtml
<Select {options} bind:value hideKeyboardHints/>
```

### Gomb trigger

Használd a `button` propot, ha a trigger select mező helyett egy Button legyen. A Button stílusbeállításait fogadja; lefelé mutató nyíl (chevron) csak akkor jelenik meg, ha megadsz `endIcon`-t.

A variáns flagek opcionális logikai értékek maradnak, beleértve a dinamikus értékeket és az explicit `false`-t is. A trigger legfeljebb egy aktív variánst ad tovább a Buttonnak: az első igaz flaget ebben a sorrendben: `destructive` → `secondary` → `ghost` → `link` → `muted` → `accent`. Ha egyik sem igaz, a primary stílust használja. A variáns változásai reaktívak.

```sveltehtml
<Select
  {options}
  bind:value
  button={{label: 'Filter', icon: Filter, secondary: true}}
/>
```

### Aszinkron keresés

Adj át `options`-ként egy `search` és `get` metódussal rendelkező objektumot.
A `search(query)` minden keresőkifejezés-változáskor meghívódik.
A `get(values)` betöltéskor feloldja az előre kiválasztott értékeket, hogy a trigger a helyes címkét mutassa.

```sveltehtml
<script lang="ts">
  import { Select } from '@atom-forge/ui';

  const source = {
    search: async (q: string) => {
      const res = await fetch(`/api/items?q=${encodeURIComponent(q)}`);
      return res.json(); // SelectOption[]
    },
    get: async (values: (string | number)[]) => {
      const res = await fetch(`/api/items?ids=${values.join(',')}`);
      return res.json(); // SelectOption[]
    },
  };

  let value = $state<string | number | undefined>();
</script>

<Select options={source} bind:value placeholder="Search..."/>
```

### Egyedi renderelés

Az opciók további mezőihez használj script-oldali típusállítót; kerüld a típusállítást a sablonkifejezéseken belül:

```sveltehtml
<script lang="ts">
  import { Select, as } from '@atom-forge/ui';
  import type { SelectOption } from '@atom-forge/ui';

  const toColorOption = as<SelectOption & { dot: string }>;
  const options = [
    { value: 'active', label: 'Active', dot: 'bg-accent' },
    { value: 'inactive', label: 'Inactive', dot: 'bg-muted' },
  ];
  let value = $state<string | number | undefined>();
</script>

<Select {options} bind:value>
  {#snippet trigger(opt)}
    {@const colorOption = toColorOption(opt)}
    <span class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full {colorOption.dot}"></span>
      {opt.label}
    </span>
  {/snippet}
  {#snippet option(opt, isHighlighted)}
    <div class={isHighlighted ? 'bg-accent text-accent-contrast' : 'hover:bg-secondary'}>
      {opt.label}
    </div>
  {/snippet}
</Select>
```

### Méretek

```sveltehtml
<Select {options} bind:value/>           <!-- normal (h-10) -->
<Select {options} bind:value compact/>   <!-- h-8 -->
<Select {options} bind:value small/>     <!-- h-6 -->
```

## Mikor használd

Egyetlen szöveges vagy numerikus ID kiválasztásához statikus opciókból vagy kereshető aszinkron forrásból, különösen ha egyedi opció-renderelésre van szükség.

## Alternatívák

Keresés nélküli, böngészőnatív választóhoz használd a [NativeSelect](native-select.md)-et, látható egyválasztós opciókhoz a [Radio](radio.md)-t, több ID-hoz a [MultiSelect](multi-select.md)-et.

## Beállítás és működés

A `Root` alatt rendereld, amely a popup contextet és egy PopupContainert biztosít. A `value`-t egy `$state<string | number | undefined>`-hez bindold; az `undefined` azt jelenti, hogy nincs kijelölés. Az egyeztetés szigorú egyenlőséggel történik, ezért az ID-típusok legyenek következetesek. A kiválasztás frissíti a kötést és bezárja a popupot; nincs nyilvános `onchange` prop. A statikus keresés a `String(label)` értéket hasonlítja össze, kis- és nagybetűtől függetlenül. Az aszinkron `search(query)` a lenyíló lista megnyitásakor és a keresőkifejezés változásakor fut, beépített debounce nélkül; a `get([value])` mount után és az érték változásakor oldja fel a címkéket. A kérések korlátozását (throttling) és a hibakezelést a forrásban valósítsd meg. A címkefeloldó kéréseket nem szakítja meg, és nem védi az elavult válaszok ellen. Gomb trigger módban a `button.label` látszik, nem a kiválasztott címke snippetje vagy a mező törlés gombja.
