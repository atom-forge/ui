# Tree

Lenyitható fanézet hierarchikus adatokhoz. Támogatja a csomópontok kiválasztását, az egyedi sormegjelenítést és a kattintás-callbackeket.

## Importálás

```ts
import { TreeView, type TreeNode } from '@atom-forge/ui';
```

---

## TreeView propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `data` | `TreeNode[]` | — | A gyökérszintű csomópontok. |
| `selectedId` | `string` | — | A kiválasztott (kiemelt) csomópont azonosítója. |
| `onNodeClick` | `(node: TreeNode) => void` | — | Bármely csomópontra kattintáskor hívódik. |
| `row` | `Snippet<[TreeNode]>` | — | Egyedi sormegjelenítő. Felülírja az alapértelmezett ikon + címke elrendezést. |
| `dnd` | `TreeDndOptions` | — | Validált drag-and-drop átrendezést kapcsol be a fában. |
| `class` | `string` | — | További Tailwind-osztályok a wrapperen. |

---

## TreeNode típus

```ts
type TreeNode = {
  id: string;
  label?: string;
  icon?: IconDefinition;
  type?: string;
  children?: TreeNode[];
  data?: Record<string, any>; // Arbitrary extra data
};
```

---

## Használat

### Alap

```sveltehtml
<script lang="ts">
  import { TreeView, type TreeNode } from '@atom-forge/ui';

  const data: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      children: [
        { id: 'components', label: 'components', children: [
          { id: 'Button', label: 'Button.svelte' },
        ]},
        { id: 'routes', label: 'routes' },
      ]
    },
    { id: 'package', label: 'package.json' },
  ];

  let selected = $state<string>();
</script>

<TreeView
  {data}
  selectedId={selected}
  onNodeClick={(node) => selected = node.id}
/>
```

### Egyedi sor

```sveltehtml
{#snippet customRow(node)}
  <div class="flex items-center gap-2">
    <Icon icon={node.icon ?? IconFile} size="4" class="text-muted-contrast"/>
    <span class="truncate">{node.label}</span>
    {#if node.data?.modified}
      <span class="ml-auto text-xs text-accent">M</span>
    {/if}
  </div>
{/snippet}

<TreeView {data} row={customRow} onNodeClick={(node) => console.log(node.id)}/>
```

### Drag and drop

A `dnd` átadásával bekapcsolod a csomópontok mozgatását. A komponens megakadályozza a ciklusokat, elutasítja a semmit sem változtató mozgatásokat, ellenőrzi a gyerekek fajtáját, és a `maxDepth` érvényesítésekor a teljes húzott részfát figyelembe veszi. A komponens nem módosítja a `data`-t; a kibocsátott mozgatást az `onMove`-ban alkalmazd.

```sveltehtml
<script lang="ts">
  import { TreeView, type TreeNode, type TreeMove } from '@atom-forge/ui';

  function moveNode(move: TreeMove) {
    // Update local state and persist the move.
  }
</script>

<TreeView
  {data}
  dnd={{
    getNodeKind: (node) => node.type ?? 'document',
    allowedChildren: {
      folder: true,
      document: ['image'],
      image: false,
    },
    maxDepth: 3,
    canDrop: ({ node, parent }) => !node.data?.locked && !parent?.data?.locked,
    onMove: moveNode,
  }}
/>
```

Az `allowedChildren` a célszülő fajtáját nézi. A `true` minden gyerekfajtát elfogad, egy string tömb csak a felsoroltakat, a `false` egyiket sem. A kihagyott szülőfajta szintén semmit nem fogad el. Gyökérszintre mozgatást ez a szabály mindig enged.

A `maxDepth` nullától számol: a gyökércsomópontok `0` mélységben vannak. Leszármazottakkal rendelkező csomópont csak oda mozgatható, ahol a legmélyebb leszármazottja is legfeljebb a beállított maximumon marad.

A `canDrop` megkapja a javasolt `TreeDropContext`-et, és alkalmazásspecifikus validációhoz booleant vagy `{ allowed, reason? }` objektumot adhat vissza.

---

## Működés

- A nem üres `children`-nel rendelkező csomópontok chevront mutatnak — kattintásra nyílnak/csukódnak.
- A levélcsomópontok (gyerek nélkül) kis pontot mutatnak.
- A lenyitott állapotot belül egy csomópont-azonosítókat tartalmazó `Set<string>` kezeli.
- A behúzás szintenként `1.25rem`-mel nő.
- Egy halvány függőleges segédvonal köti a gyerekeket a szülőjükhöz.

## Mikor használd

Lenyitható hierarchikus navigációhoz, opcionálisan validált csomópont-mozgatással.

## Alternatívák

Lapos rekordokhoz a [Table](../data/table.md), lapos lista átrendezéséhez vagy elemek áthelyezéséhez a [Sortable](../data/sortable.md) való.

## Beállítás és korlátok

Globálisan egyedi csomópont-azonosítókat használj. A lenyitást a TreeView kezeli, de a selectedId kontrollált: az onNodeClick-ben frissítsd. Nem üres ág sorára kattintva is nyílik/csukódik, nem csak a chevronra. A row snippetet és a kattintás-callbacket inicializáláskor rögzíti. Az egyedi mezőket a node.data alatt tárold, hogy illeszkedjenek a publikus típusokhoz. A drag/drop csak javasolt mozgatást bocsát ki, az adatot soha nem módosítja és nem menti. Nincs lazy loading callback, lenyitott-azonosító binding, virtualizáció vagy többszörös kiválasztás API. A natív HTML drag/drop-nak nincs ezzel egyenértékű billentyűzetes átrendezési szerződése; ne feltételezz teljes ARIA tree interakciós modellt.
