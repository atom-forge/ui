# Table

Generikus, típusbiztos adattábla sticky fejléccel, oszlopláthatóság-kezeléssel, egyedi cellarendereléssel és soronkénti/cellánkénti stílussal.

## Import

```ts
import { Table, type ColumnDef } from '@atom-forge/ui';
```

---

## Table propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `data` | `T[]` | — | A sorok adattömbje. A `T`-nek a `Record<string, any>` típust kell kiterjesztenie. |
| `columns` | `ColumnDef<T>[]` | — | Bindolható oszlopdefiníciók. |
| `rowStyle` | `string \| StylingFn<T>` | — | Statikus osztálystring vagy soronként osztályokat/stílusokat visszaadó függvény. |
| `rowClick` | `(row, table, index, event) => void` | — | Opcionális sorkattintás-kezelő. A sorok billentyűzettel fókuszálhatóvá válnak, és Enter/Space-re aktiválódnak. Az interaktív gyerekelemekre leadott kattintásokat figyelmen kívül hagyja. |
| `columnsEditable` | `boolean` | `false` | Jobbklikkes context menüt kapcsol a fejlécre, amellyel ki-be kapcsolható az oszlopok láthatósága. |
| `frameless` | `boolean` | `false` | Beágyazott táblaelrendezésekhez eltávolítja a külső keretet, a lekerekített wrappert és a sorelválasztókat. |
| `hideHeader` | `boolean` | `false` | Elhagyja a táblafejlécet. Ilyenkor a `columnsEditable`-nek nincs fejléce, ahonnan megnyílhatna. |
| `noScroll` | `boolean` | `false` | Megakadályozza a tábla vízszintes görgetését. Az oszlopszélességek relatív súlyként működnek, így minden látható oszlop elfér a wrapperben. |
| `layout` | `'fixed' \| 'auto'` | `'fixed'` | A táblaelrendezési algoritmust állítja. A fixed elrendezés dashboardokon kiszámítható, az auto jobban követi a tartalmat. |
| `overflow` | `'ellipsis' \| 'wrap' \| 'clip'` | `'ellipsis'` | A fejléc- és törzscellák alapértelmezett túlcsordulási viselkedése. Az oszlopok felülírhatják. |
| `headerClass` | `string` | — | Minden fejléc `<th>` elemre kerülő további Tailwind osztályok, az oszloponkénti `style.header` osztályok előtt. |
| `class` | `string` | — | További Tailwind osztályok a wrapperen, `twMerge`-dzsel összefésülve. |

---

## ColumnDef

```ts
type ColumnDef<T> = {
  key: keyof T;           // Data key to read from each row
  label: string;          // Column header text
  visible?: boolean;      // Defaults to true
  fixed?: boolean;        // Prevents hiding; receives protected width priority in noScroll mode
  width?: string;         // CSS width, e.g. "8rem", "20ch", "30%"
  minWidth?: string;      // CSS min-width
  maxWidth?: string;      // CSS max-width
  overflow?: TableOverflow;
  grow?: true;            // Leaves the column fluid so it can take remaining width
  shrink?: true;          // Column shrinks to fit content
  style?: ColumnStyling<T>;
  formatter?: (row: T, table: T[], index: number) => string | number;
  snippet?: Snippet<[T]>;
};
```

A `formatter` és a `snippet` kizárja egymást.

---

## ColumnStyling

```ts
type ColumnStyling<T> = {
  header?: string;                          // Tailwind classes on <th>
  cell?: string | StylingFn<T>;            // Static class or function
};

type StylingFn<T> = (row: T, table: T[], index: number) => StylingResult;
type StylingResult = string | { class?: string; style?: string };
type TableOverflow = 'ellipsis' | 'wrap' | 'clip';
```

---

## Használat

```sveltehtml
<script lang="ts">
  import { Table, type ColumnDef } from '@atom-forge/ui';

  type User = { id: number; name: string; role: string; active: boolean };

  const data: User[] = [
    { id: 1, name: 'Alice', role: 'Admin', active: true },
    { id: 2, name: 'Bob',   role: 'User',  active: false },
  ];

  let columns = $state<ColumnDef<User>[]>([
    { key: 'id',     label: 'ID',    shrink: true },
    { key: 'name',   label: 'Name',  grow: true },
    { key: 'role',   label: 'Role',
      style: { cell: (row) => row.role === 'Admin' ? 'font-bold text-accent' : '' }
    },
    { key: 'active', label: 'Active',
      snippet: activeCellSnippet,
    },
  ]);
</script>

{#snippet activeCellSnippet(row)}
  <Chip color={row.active ? 'green' : 'base'}>
    {row.active ? 'Active' : 'Inactive'}
  </Chip>
{/snippet}

<Table {data} bind:columns class="max-h-96"/>
```

### Sorok stílusa

```sveltehtml
<Table
  {data}
  bind:columns
  rowStyle={(row) => row.active ? '' : 'opacity-50'}
/>
```

### Sorkattintás

```sveltehtml
<Table
  {data}
  bind:columns
  rowClick={(row) => openUser(row)}
/>
```

Ha megadod a `rowClick`-et, a sorok mutató kurzort kapnak, és Enterrel vagy Space-szel aktiválhatók. A gombokon, linkeken, űrlapvezérlőkön, labeleken vagy a `data-table-row-click-ignore` attribútummal jelölt elemeken belüli kattintás nem indítja el a sorkezelőt.

### Fejléc stílusa

A `headerClass`-szal minden fejléccellát stílusozhatsz. Egyetlen fejléccella felülírásához vagy kiegészítéséhez az oszlop `style.header` mezőjét használd.

```sveltehtml
<Table
  {data}
  bind:columns
  headerClass="bg-surface normal-case text-muted-contrast"
/>
```

```ts
let columns: ColumnDef<User>[] = [
  {
    key: 'id',
    label: 'ID',
    shrink: true,
    style: {
      header: 'text-right'
    }
  },
  { key: 'name', label: 'Name', grow: true },
];
```

A fejlécosztályok ebben a sorrendben fésülődnek össze: az alapértelmezett fejlécosztályok, a `headerClass`, végül a `column.style.header`.

### Oszlopméretezés

A keskeny és széles oszlopokat a `width`, `minWidth` és `maxWidth` mezőkkel szabályozhatod. A méretezés egy `<colgroup>`-on keresztül érvényesül, és a cellákon is megismétlődik, így `hideHeader` mellett is működik.

```sveltehtml
<script lang="ts">
  let columns = $state<ColumnDef<User>[]>([
    { key: 'id', label: 'ID', width: '6rem', shrink: true },
    { key: 'name', label: 'Name', minWidth: '16rem', grow: true },
    { key: 'email', label: 'Email', width: '24ch' },
    { key: 'notes', label: 'Notes', minWidth: '22rem' },
  ]);
</script>

<Table {data} bind:columns />
```

A `shrink` `width: 1%`-ot jelent, ha nincs explicit `width`. A `grow` folyékonyan hagyja az oszlopot; fixed elrendezésben a folyékony oszlopok a fix szélességű oszlopok utáni maradék szélességen osztoznak.

### Görgetés nélküli elrendezés

Használd a `noScroll`-t, ha a táblának mindig vízszintesen el kell férnie a wrapperében. Ebben a módban az oszlopok `width`, `minWidth`, `shrink` és `grow` értékei abszolút korlát helyett relatív súllyá alakulnak. A `noScroll` belül fixed táblaelrendezést használ, akkor is, ha `layout="auto"`-t is átadsz.

```sveltehtml
<Table
  {data}
  bind:columns
  noScroll
/>
```

```ts
let columns: ColumnDef<User>[] = [
  { key: 'id', label: 'ID', width: '5rem', overflow: 'clip' },
  { key: 'name', label: 'Name', width: '18rem', overflow: 'ellipsis' },
  { key: 'notes', label: 'Notes', minWidth: '28rem', overflow: 'wrap' },
];
```

A fenti példában a `notes` kapja a legnagyobb részt, a `name` közepeset, az `id` pedig keskeny marad. A tábla `width: 100%` marad, vízszintes görgetés nélkül; a túlcsordulást a cellák kezelik.

A kulcsfontosságú, mindenképp olvashatónak maradó oszlopokra állítsd be a `fixed: true`-t. `noScroll` módban a fix oszlopok azon túl, hogy az oszlopláthatósági menüben zárolva vannak, védett szélesség-prioritást is kapnak.

```ts
let columns: ColumnDef<User>[] = [
  { key: 'id', label: 'ID', fixed: true, width: '7ch', shrink: true },
  { key: 'name', label: 'Name', minWidth: '18rem', grow: true },
  { key: 'status', label: 'Status', width: '8rem' },
];
```

### Túlcsordulás

A cellák alapból ellipsist használnak. Az alapértéket a táblán az `overflow` beállításával változtathatod meg, egy oszlopnál pedig az oszlopon felülírhatod.

```sveltehtml
<Table
  {data}
  bind:columns
  overflow="wrap"
/>
```

```ts
let columns: ColumnDef<User>[] = [
  { key: 'name', label: 'Name', width: '12rem', overflow: 'ellipsis' },
  { key: 'notes', label: 'Notes', minWidth: '24rem', overflow: 'wrap' },
  { key: 'code', label: 'Code', width: '10rem', overflow: 'clip' },
];
```

Lehetséges értékek:

| Érték | Viselkedés |
|-------|----------|
| `'ellipsis'` | Egysoros tartalom, rejtett túlcsordulással és három ponttal. |
| `'wrap'` | Többsoros tartalom, amely a cellán belül tördelődik. |
| `'clip'` | Egysoros tartalom, rejtett túlcsordulással, három pont nélkül. |

### Elrendezés

Az alapértelmezett `fixed` elrendezés kiszámíthatóan tartja az oszlopszélességeket. Használd az `auto`-t, ha a tartalomnak erősebben kell befolyásolnia a tábla szélességét.

```sveltehtml
<Table
  {data}
  bind:columns
  layout="auto"
/>
```

### Keret nélkül

Használd a `frameless`-t, ha a tábla egy másik felületbe van ágyazva, és nem kell saját keretet vagy sorelválasztókat rajzolnia.

```sveltehtml
<Table
  {data}
  bind:columns
  frameless
/>
```

### Rejtett fejléc

A `hideHeader` kompakt listákhoz való, ahol a környező UI már elmagyarázza az oszlopokat.

```sveltehtml
<Table
  {data}
  bind:columns
  hideHeader
/>
```

Ha a `hideHeader` be van kapcsolva, a `columnsEditable` nem nyitható meg a fejlécből. Ha a felhasználóknak továbbra is szerkeszteniük kell az oszlopláthatóságot, adj hozzá külön, külső vezérlőt.

### Szerkeszthető oszlopok

```sveltehtml
<Table {data} bind:columns columnsEditable/>
```

Jobb kattintás a fejlécen megnyitja az oszlopláthatósági popupot.

---

## Oszlopláthatóság

Az oszlopdefinícióban a `visible: false` kezdetben elrejti az oszlopot. A `fixed: true` megakadályozza, hogy a felhasználó a beállítások popupban ki-be kapcsolja.

## Mikor használd

Lapos, strukturált rekordokhoz oszloponkénti formázással vagy snippetekkel, láthatóság-kezeléssel és görgethető fejléccel.

## Alternatívák

Hierarchiához a [Tree](../layout/tree.md), eseménysorokhoz a [Timeline](timeline.md) való; lapozáshoz külön illeszd mellé a [Pagination](../layout/pagination.md)-t.

## Beállítás és korlátok

A Root adja a popup contextet, amelyet a Table akkor is lekér, ha a columnsEditable false, de csak a beállítások menüjéhez használja. A columnsEditable-höz popup provider/container kell, egy sima, csak megjelenítő Table-höz nem. A kezdeti columns tömb belső state-be kerül, a hiányzó visible flageket pedig magukon az oszlopobjektumokon állítja be (nem védekező másolaton). **Jelenlegi korlát:** a columns prop későbbi lecserélésére nincs szinkronizáló effect, és a láthatósági változások nem íródnak vissza a bindolható propba; ne számíts arra, hogy a bind:columns-szal követheted a popupban tett módosításokat. Lecserélt oszlopkonfigurációhoz mountold újra. Az adatok a megadott sorrendben, indexszel kulcsolt sorokként jelennek meg; nincs rendezés, szűrés, lapozás, virtualizáció, kiválasztás, üres állapotot jelző UI vagy szerkesztőmotor. A formatter/snippet és a grow/shrink páronként kizárja egymást. A fixed védett láthatóságot és extra noScroll-súlyt jelent, nem sticky oszlopot vagy garantált minimális pixelszélességet.
