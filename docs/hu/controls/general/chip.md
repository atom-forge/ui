# Chip

Kompakt inline badge címkékhez, státuszokhoz és metaadatokhoz. Szemantikus színvariánsokat, valamint opcionális ikon/slot díszítést támogat.

## Importálás

```ts
import { Chip } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `children` | `Snippet` | — | A chip címkeszövege vagy tartalma. |
| `color` | `'base' \| 'green' \| 'red' \| 'blue' \| 'yellow'` | `'base'` | Színvariáns. |
| `icon` | `IconDefinition` | — | A children előtt megjelenő ikon. A `start` snippet felülírja. |
| `start` | `Snippet` | — | Egyedi kezdő slot (felülírja az `icon`-t). |
| `end` | `Snippet` | — | Egyedi záró slot. |
| `class` | `string` | — | További Tailwind osztályok, `twMerge`-dzsel összefésülve. |

---

## Variánsok

| Érték | Megjelenés |
|-------|-----------|
| `base` | `use-secondary` szemantikus token |
| `green` | Zöld árnyalatok, sötét módot is kezel |
| `red` | Piros árnyalatok, sötét módot is kezel |
| `blue` | Kék árnyalatok, sötét módot is kezel |
| `yellow` | Sárga árnyalatok, sötét módot is kezel |

---

## Használat

```sveltehtml
<Chip>Default</Chip>
<Chip color="green">Active</Chip>
<Chip color="red">Error</Chip>
<Chip color="blue">Info</Chip>
<Chip color="yellow">Warning</Chip>

<!-- With icon -->
<Chip color="green" icon={IconCheck}>Verified</Chip>

<!-- With end slot -->
<Chip>
  Draft
  {#snippet end()}
    <button onclick={remove}>×</button>
  {/snippet}
</Chip>
```

## Mikor használd

Kompakt inline címkékhez, státuszokhoz vagy metaadatokhoz.

## Alternatívák

Egy másik vezérlő fölötti számhoz a [Badge](badge.md)-et, tagek listájának szerkesztéséhez a [TagEditor](../forms/tag-editor.md)-t használd.

## Beállítás és működés

A gyökérelem egy span, nem interaktív vezérlő. A `start` felülírja az `icon`-t; az `end` csak a megadott tartalmat rendereli, eltávolítást nem valósít meg. Ha eltávolítható chipet építesz, az akadálymentes műveletet magad add meg.
