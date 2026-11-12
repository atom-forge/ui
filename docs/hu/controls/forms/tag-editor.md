# Tag Editor

Interaktív beviteli mező, amely szöveges címkék (tagek) listáját kezeli. Gépeld be a taget, és `Enter`-rel add hozzá; a `×` gombbal vagy `Backspace`-szel törölheted. Támogatja a statikus és aszinkron automatikus kiegészítési javaslatokat, a drag-and-drop átrendezést és az egyedi renderelőket.

## Importálás

```ts
import {TagEditor} from '@atom-forge/ui';
```

## Alap használat

```sveltehtml
<script lang="ts">
  let tags = $state(['svelte', 'typescript']);
</script>

<TagEditor bind:value={tags} placeholder="Add tag…" />
```

## Propok

| Prop          | Típus      | Alapérték       | Leírás                                                                  |
|---------------|------------|-----------------|-------------------------------------------------------------------------|
| `value`       | `string[]` | `[]`            | A tagek bindolható listája.                                             |
| `placeholder` | `string`   | `'Add tags...'` | Akkor látszik, ha nincs egy tag sem.                                    |
| `disabled`    | `boolean`  | `false`         | Letilt minden interakciót.                                              |
| `clearable`   | `boolean`  | `false`         | „Összes törlése” gombot mutat, ha vannak tagek.                         |
| `allowNew`    | `boolean`  | `true`          | `false` esetén csak az `options`-ban szereplő értékek adhatók hozzá.    |
| `sortable`    | `boolean`  | `false`         | Engedélyezi a drag-and-drop átrendezést.                                |
| `uppercase`   | `boolean`  | —               | Minden taget nagybetűsre normalizál. Kizárja a `lowercase`-t.           |
| `lowercase`   | `boolean`  | —               | Minden taget kisbetűsre normalizál. Kizárja az `uppercase`-t.           |
| `primary`     | `boolean`  | `true`          | Primary alapértelmezett chipszín. Kizárja a többi chipszínt.            |
| `secondary`   | `boolean`  | —               | Secondary alapértelmezett chipszín. Kizárja a többi chipszínt.          |
| `danger`      | `boolean`  | —               | Danger alapértelmezett chipszín. Kizárja a többi chipszínt.             |
| `accent`      | `boolean`  | —               | Accent alapértelmezett chipszín. Kizárja a többi chipszínt.             |
| `compact`     | `boolean`  | —               | Kompakt méret. Kizárja a `small`-t.                                     |
| `small`       | `boolean`  | —               | Kis méret. Kizárja a `compact`-ot.                                      |
| `class`       | `string`   | —               | További osztályok, amelyek a wrapper elemre kerülnek.                   |

## Chipszín

A beépített chiprenderelő alapértelmezés szerint a primary színt használja. Egyszerre csak egy chipszín propot használj:

```sveltehtml
<TagEditor bind:value={tags} />
<TagEditor bind:value={tags} secondary />
<TagEditor bind:value={tags} danger />
<TagEditor bind:value={tags} accent />
```

Ha egyedi `chip` snippetet adsz meg, ezek a szín propok nem hatnak az egyedi chipre.

## Opciók

| Prop      | Típus                                                | Alapérték | Leírás                                                                                                        |
|-----------|------------------------------------------------------|---------|---------------------------------------------------------------------------------------------------------------|
| `options` | `string[] \| ((query: string) => Promise<string[]>)` | —       | Statikus lista vagy aszinkron függvény. A statikus tömböket kliensoldalon szűri; az aszinkron találatokat 200 ms-os debounce-szal kéri. |

Ha az `allowNew` `true` (alapértelmezés), új értékekhez egy **„Add '…'”** bejegyzés jelenik meg a lenyíló lista tetején. Az `allowNew={false}` beállítással csak a listában szereplő értékek engedélyezettek.

## Snippetek

### `chip` — egyedi chip renderelő

```sveltehtml
{#snippet chip(tag, remove)}
  <span>{tag} <button onclick={remove}>×</button></span>
{/snippet}
```

Paraméterei: `(tag: string, remove: () => void)`.

### `option` — egyedi listaelem-renderelő

```sveltehtml
{#snippet option(item, isHighlighted)}
  <div class={isHighlighted ? 'bg-accent' : ''}>
    {item}
  </div>
{/snippet}
```

Paraméterei: `(item: string, isHighlighted: boolean)`.

## Billentyűzet

| Billentyű        | Művelet                                                              |
|------------------|----------------------------------------------------------------------|
| `Enter`          | Az aktuális bevitel tagként való jóváhagyása, vagy a kiemelt opció kiválasztása |
| `ArrowDown / Up` | Navigálás az opciók lenyíló listájában                               |
| `Escape`         | Az opciók lenyíló listájának bezárása                                |
| `Backspace`      | Az utolsó tag törlése (ha a mező üres)                               |

## Megjegyzések

- A tageket hozzáadás előtt normalizálja (levágja a szóközöket, és opcionálisan nagy-/kisbetűsre alakítja).
- A lenyíló lista `onmousedown`-t használ, így egy javaslatra kattintva a mező nem veszíti el a fókuszt a tag hozzáadása előtt.
- Ha a `sortable` be van kapcsolva, a `value` kötés szinkronban marad a húzással kialakított sorrenddel.

## Mikor használd

Szerkeszthető szöveges tagekhez, opcionális javaslatokkal és szabad szöveges hozzáadással.

## Alternatívák

Használd a [MultiSelect](multi-select.md)-et, ha a tárolt ID-k eltérnek a megjelenített címkéktől, vagy a [Chip](../general/chip.md)-et nem szerkeszthető címkékhez.

## Beállítás és működés

A `Root` alatt rendereld: a popup contextet javaslatok nélkül is kiolvassa. `string[]` értéket bindolj; a hozzáadás levágja a szóközöket, normalizál, és kihagyja az üres és ismétlődő értékeket, a kívülről kapott értékeket viszont nem normalizálja. Az `allowNew={false}` mellett opcióforrás kell ahhoz, hogy egyáltalán lehessen hozzáadni; a külső értékeket nem validálja. Az aszinkron javaslatok 200 ms késleltetéssel indulnak, de a kéréseket nem szakítja meg, és nem védi az elavult találatok ellen. A hibakezelést és a kérések sorrendjét a forrásban kezeld. A rendezhető elemek a kezdőértékből inicializálódnak, majd egy effecten keresztül írják vissza a sorrendet; a későbbi külső cseréket nem építi újra a rendezhető listába. Nincs nyilvános change esemény. A letiltott stílus nem akadályoz meg minden chip-törlési/átrendezési útvonalat, ezért ha szükséges, a csak olvasható állapotot az alkalmazás szintjén kényszerítsd ki.
