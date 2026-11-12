# Sortable (DnD)

Drag-and-drop rendezhető listák a
[`svelte-dnd-action`](https://github.com/isaacHagoel/svelte-dnd-action) felett.
Tud egy listán belüli átrendezést, csoportosított listák közötti áthelyezést,
csak fogantyúval indítható húzást, animált elhelyezési előnézetet, és
Svelte-barát, bindolható lista-API-t ad.

## Import

```ts
import { SortableList, SortableGroup } from '@atom-forge/ui';
```

Az elemeknek egyedi `id: string | number` mezővel kell rendelkezniük.

---

## SortableList

A `SortableList` az elsődleges API. A szokásos esetben használd a `bind:items`-t;
a komponens drop után visszaírja a végső sorrendet.

### Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `items` | `T[]` | `[]` | Bindolható elemtömb. Drop után frissül. |
| `id` | `string` | `'default-list'` | A lista azonosítója. `SortableGroup`-on belül egyedi id-kat használj. |
| `item` | `Snippet<[T]>` | — | Az egyes elemekhez renderelt snippet. |
| `orientation` | `'vertical' \| 'horizontal' \| 'grid'` | `'vertical'` | A lista irányát és az elhelyezésjelző alapértelmezett irányát határozza meg. |
| `grabbedClass` | `string` | `'shadow-xl opacity-95 scale-[1.01]'` | Az éppen húzott elemre kerülő Tailwind osztályok. |
| `draggingClass` | `string` | `'opacity-35'` | A forráselemre húzás közben alkalmazott Tailwind osztályok. |
| `dropIndicatorClass` | `string` | — | Az árnyék-, illetve elhelyezési elem wrapperére kerülő Tailwind osztályok. Figyelmen kívül marad, ha a választott jelzőnek nincs rá szüksége. |
| `dragHandleSelector` | `string` | — | CSS-szelektor az elemen belüli fogantyúhoz. A húzás csak az illeszkedő elemekről indul. |
| `flipDurationMs` | `number` | `160` | A Svelte `animate:flip` listamozgás időtartama. |
| `onchange` | `(items, detail) => void` | — | Sikeres átrendezés vagy áthelyezés után hívódik, de csak akkor, ha a sorrend megváltozott. |
| `dropIndicator` | `Snippet<[T \| undefined]>` | — | Egyedi elhelyezésjelző snippet. Az ideiglenes árnyékelemhez renderelődik. |
| `empty` | `{ icon, title, description? }` | — | Üres listánál `EmptyState`-tel jelenik meg. |
| `class` | `string` | — | A lista wrapper `<div>` elemére kerül. |
| `preservePreviewSize` | `boolean` | `true` | Kompatibilitási prop az előző implementációból. Az API stabilitása miatt maradt meg. |
| `previewOffset` | `(args) => {x, y}` | — | Kompatibilitási prop az előző implementációból. Az API stabilitása miatt maradt meg. |

### A változás részletei

Az `onchange` a következő elemtömböt és egy detail objektumot kap:

```ts
type SortableChangeDetail<T extends { id: string | number }> = {
  items: T[];
  previousItems: T[];
  item: T | undefined;
  itemId: string | number;
  fromIndex: number;
  toIndex: number;
  trigger: string;
  source: string;
};
```

Használd a `bind:items`-t, ha a helyi átrendezést a komponensre bízod. Az
`onchange`-et akkor add hozzá, ha a szülőnek is mentenie, validálnia vagy
reagálnia kell a változásra.

### Alapvető használat

```sveltehtml
<script lang="ts">
  import { SortableList } from '@atom-forge/ui';

  let tasks = $state([
    { id: 1, title: 'Design' },
    { id: 2, title: 'Develop' },
    { id: 3, title: 'Test' },
  ]);
</script>

<SortableList bind:items={tasks} class="gap-2">
  {#snippet item(task)}
    <div class="rounded border border-frame bg-control p-3">
      {task.title}
    </div>
  {/snippet}
</SortableList>
```

### Reagálás a változásokra

```sveltehtml
<SortableList
  bind:items={tasks}
  onchange={(nextTasks, detail) => {
    console.log('moved', detail.itemId, detail.fromIndex, detail.toIndex);
    saveOrder(nextTasks.map(task => task.id));
  }}
>
  {#snippet item(task)}
    <div class="rounded border border-frame bg-control p-3">
      {task.title}
    </div>
  {/snippet}
</SortableList>
```

Az `onchange` finalize/drop után fut le, nem minden hover-mozgásnál.

### Fogantyú

A húzás csak az elemen belüli egy adott elemről induljon:

```sveltehtml
<SortableList bind:items={tasks} dragHandleSelector="[data-handle]" class="gap-2">
  {#snippet item(task)}
    <div class="flex items-center gap-2 rounded border border-frame bg-control p-3">
      <GripVertical data-handle class="cursor-grab text-muted-contrast" />
      <span>{task.title}</span>
    </div>
  {/snippet}
</SortableList>
```

A szelektor célozhat hagyományos elemet és SVG- vagy ikonelemet is.

### Húzási állapot stílusa

```sveltehtml
<SortableList
  bind:items={tasks}
  grabbedClass="rounded-md bg-surface shadow-xl ring-2 ring-accent/40 scale-[1.02]"
  draggingClass="opacity-30 blur-[1px]"
>
  {#snippet item(task)}...{/snippet}
</SortableList>
```

### Egyedi elhelyezésjelző

```sveltehtml
<SortableList bind:items={tasks} class="gap-2">
  {#snippet item(task)}...{/snippet}

  {#snippet dropIndicator(draggingItem)}
    <div class="rounded-md border border-dotted border-accent/60 bg-accent/5 p-2">
      {draggingItem?.title}
    </div>
  {/snippet}
</SortableList>
```

Egyedi snippet nélkül az ideiglenes árnyékelem a normál `item` snippetet
használja. A `dropIndicator`-t akkor használd, ha az elhelyezési előnézetnek
könnyedebbnek kell lennie a valódi elemnél, vagy ha a listának vonal vagy pont
stílusú beszúrásjelző kell.

---

## SortableGroup

Ha több `SortableList`-et egy `SortableGroup`-ba csomagolsz, az elemek
mozoghatnak a listák között. Minden listának egyedi `id`-ja legyen.

```sveltehtml
<script lang="ts">
  import { SortableList, SortableGroup } from '@atom-forge/ui';

  let todo  = $state([{ id: 1, title: 'Plan' }, { id: 2, title: 'Design' }]);
  let doing = $state([{ id: 3, title: 'Develop' }]);
  let done  = $state([{ id: 4, title: 'Deploy' }]);
</script>

<SortableGroup class="flex gap-4">
  <SortableList id="todo" bind:items={todo} class="min-w-56 gap-2">
    {#snippet item(task)}...{/snippet}
  </SortableList>

  <SortableList id="doing" bind:items={doing} class="min-w-56 gap-2">
    {#snippet item(task)}...{/snippet}
  </SortableList>

  <SortableList id="done" bind:items={done} class="min-w-56 gap-2">
    {#snippet item(task)}...{/snippet}
  </SortableList>
</SortableGroup>
```

### SortableGroup propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `class` | `string` | — | A wrapper `<div>` elemre kerül. |
| `rules` | `GroupRules` | — | Örökölt kompatibilitási prop. A jelenlegi `svelte-dnd-action` implementáció még nem érvényesít listánkénti elfogadási szabályokat. |
| `typeField` | `string` | `'type'` | Örökölt kompatibilitási prop, amelyet az előző szabálymotor használt. |

A csoportosított listák egy közös belső DnD-típuson osztoznak, így az elemek
átkerülhetnek az azonos csoportba tartozó listák között, a csoporton kívüli
listáktól viszont elszigeteltek maradnak.

---

## Örökölt alacsony szintű exportok

A `DropIndicator`, a `DropSlot` és a `dnd` a régebbi, egyedi DnD-felületekkel
való kompatibilitás miatt továbbra is exportálva van. Új rendezhető lista UI-hoz
inkább a `SortableList`-et és a `SortableGroup`-ot használd.

```ts
import { DropIndicator, DropSlot, dnd } from '@atom-forge/ui';
```

Az alacsony szintű `dnd` segéd továbbra is az `@atlaskit/pragmatic-drag-and-drop`
köré épül. Független a jelenlegi `SortableList` implementációtól, amely a
`svelte-dnd-action`-t használja.

## Mikor használd

Lapos lista vagy rács átrendezéséhez, illetve listák közötti áthelyezéshez, a tömb véglegesített frissítésével.

## Alternatívák

Validált hierarchikus mozgatáshoz a [Tree](../layout/tree.md), koordináta-alapú húzáshoz az [Organizer](../scheduling/organizer.md) való.

## Beállítás és korlátok

Bindold az itemst, és adj stabil, egyedi ID-kat minden olyan zónában, amely elemeket cserélhet. A független listáknak is külön lista-ID kell: a csoporton kívüli, azonos ID-jú listák közös DnD-típuson osztoznak. Egyedül a SortableGroup szükséges context providerként, Root nem. A hover/consider változások egy belső előnézetet frissítenek; finalize-kor az items értéket kap, mielőtt az onchange lefutna, az pedig csak akkor fut, ha a tagság vagy a sorrend megváltozott. Áthelyezéskor a fromIndex vagy a toIndex -1 lehet abban a listában, amelybe az elem belép, vagy amelyből kilép. A callbackek értesítések, nem megszakítható validációs hookok; az örökölt rules/typeField és az előnézeti propok ebben az implementációban nem érvényesítenek korlátozást. Nincs külön disabled prop. Az onchange-ben mentsd a változást, az alkalmazásszintű elutasítást pedig kezeld explicit módon.
