# CommandPalette

Kereshető parancslista csoportosítással, ikonokkal, egyedi opció-snippetekkel és opcionálisan aszinkron találatokkal.

## Importálás

```ts
import { CommandPalette, type CommandItem } from '@atom-forge/ui';
```

## Mikor használd

Alkalmazásakciók keresésére és végrehajtására egy kompakt felületen.

## Alternatívák

Helyhez kötött akciókhoz a [ContextMenu](./context-menu.md), értékválasztáshoz a [Select](../forms/select.md) való; ha a parancsfelületet dialógusban akarod megjeleníteni, használd a [Modal](./modal.md)-t.

## Beállítás

Alkalmazd az [Első lépések](../../guides/getting-started.md) CSS-ét. A paletta overlay provider nélkül, inline is megjeleníthető. Ha overlay managerrel jeleníted meg, a managert a megfelelő provideren belül kérd le, ahogy az Első lépések leírja. A paletta maga nem nyit overlayt, és nem regisztrál globális billentyűparancsot.

## Minimális példa

```sveltehtml
<script lang="ts">
  import { CommandPalette, type CommandItem } from '@atom-forge/ui';
  let open = $state(true);
  let selected = $state('None');
  const items: CommandItem[] = [
    { id: 'save', label: 'Save document', group: 'Document', keywords: ['write'],
      onSelect: (item) => selected = item.label }
  ];
</script>

<button onclick={() => open = true}>Open commands</button>
{#if open}
  <CommandPalette {items} close={() => open = false}/>
{/if}
<p>Last command: {selected}</p>
```

## Működés

Tömb bemenetnél a szűrés kis- és nagybetűt nem megkülönböztető részszöveg-egyezés a label, a group, a description és a keywords mezőkben. Az elemek a `group` szerint, előfordulási sorrendben csoportosulnak; a hiányzó értékek egy névtelen csoportba kerülnek. Az aszinkron forrás megkapja az aktuális keresőszöveget, és a kívánt találatokat kell visszaadnia; a válaszára nem fut a tömbös helyi szűrés. Kiválasztáskor az elem `onSelect(item)`-je, majd a `close()` hívódik. A keresést és a billentyűzetkezelést a `SelectPopup` végzi.

## API

| Prop | Típus | Alapérték |
|---|---|---|
| `items` | `CommandItem[] \| ((query: string) => Promise<CommandItem[]>)` | `[]` |
| `placeholder` | `string` | `'Search commands...'` |
| `close` | `() => void` | Nem csinál semmit |
| `option` | `Snippet<[CommandItem, boolean]>` | Beépített opció-megjelenítő |

A `CommandItem` kötelező mezői: `id: string`, `label: string` és `onSelect: (item: CommandItem) => void`. Opcionális mezők: `description: string`, `group: string`, `icon: IconDefinition` és `keywords: string[]`. A snippet boolean paramétere azt jelzi, hogy az opció ki van-e emelve.

## Korlátok

Nincs `open`, `bind:value`, hotkey, letiltott elem vagy `class` prop. A bezárás csak meghívja a callbacket; a komponenst az alkalmazásnak vagy az overlay hostnak kell eltávolítania. A parancs-callbackeket nem várja meg, így a bezárásnak nem feltétele, hogy egy async akció befejeződjön. A paletta az aszinkron forráshoz maga nem valósít meg kéréstörlést, debounce-t vagy alkalmazásszintű hibakezelést. Egyedi azonosítókat használj. A fix alapszélesség 520px, a viewport szélessége mínusz 1rem-re korlátozva.

Forrás: `src/lib/controls/overlays/command/{index.ts,command.svelte.ts,CommandPalette.svelte}` és `src/lib/helpers/SelectPopup.svelte`.
