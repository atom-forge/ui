# Accordion

Lenyitható tartalompanelek: egyszerre egy vagy több nyitott elemmel, több méretben és vizuális stílusban.

---

## Importálás

```ts
import { Accordion, AccordionItem, Collapsible } from '@atom-forge/ui';
```

## Komponensek

| Komponens | Leírás |
|-----------|-------------|
| `Accordion` | Keretkomponens, amely az accordion elemek állapotát és elrendezését kezeli. |
| `AccordionItem` | Egy lenyitható panel fejléccel és tartalommal. |
| `Collapsible` | Önálló, egyelemes accordion, amely a saját állapotát kezeli. |

---

## Accordion propok

| Prop | Típus | Csoport | Alapérték | Leírás |
|------|------|-------|---------|-------------|
| `multiple` | `boolean` | — | `false` | Egyszerre több elem is nyitva lehet. |
| `compact` | `boolean` | Méret | — | Közepes padding és betűméret. |
| `small` | `boolean` | Méret | — | Kis padding és betűméret. |
| `borderless` | `boolean` | — | `false` | Eltávolítja az elemek keretét. |
| `joined` | `boolean` | — | `false` | Az elemeket egyetlen, elválasztóvonalakkal tagolt listaként jeleníti meg. |

---

## AccordionItem propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `title` | `string` | — | A fejléc gombjában megjelenő szöveg. |
| `icon` | `IconDefinition` | — | Opcionális ikon a cím előtt. |
| `id` | `string` | véletlen | Az elem egyedi azonosítója. |
| `class` | `string` | — | További CSS-osztályok a fejléc gombjára. |

---

## Collapsible

Az `AccordionItem` egyszerűsített változata, amelyhez nem kell `Accordion` szülő. A nyitott/zárt állapotát maga kezeli.

### Propok

| Prop | Típus | Csoport | Alapérték | Leírás |
|------|------|-------|---------|-------------|
| `title` | `string` | — | — | A fejléc gombjában megjelenő szöveg. |
| `icon` | `IconDefinition` | — | — | Opcionális ikon a cím előtt. |
| `open` | `boolean` | — | `false` | Bindolható nyitott/zárt állapot. |
| `compact` | `boolean` | Méret | — | Közepes padding és betűméret. |
| `small` | `boolean` | Méret | — | Kis padding és betűméret. |
| `borderless` | `boolean` | — | `false` | Eltávolítja az elem keretét. |

### Használat

```sveltehtml
<script lang="ts">
  let isOpen = $state(false);
</script>

<Collapsible title="Toggle Me" bind:open={isOpen}>
  <p>Content goes here...</p>
</Collapsible>
```

---

## Vizuális stílusok

### Összekapcsolt és különálló

Alapértelmezésben az accordion elemek között térköz van. A `joined` egyetlen listába vonja össze őket.

```sveltehtml
<!-- Default (Separated) -->
<Accordion>
  <AccordionItem title="Item 1">Content 1</AccordionItem>
  <AccordionItem title="Item 2">Content 2</AccordionItem>
</Accordion>

<!-- Joined -->
<Accordion joined>
  <AccordionItem title="Item 1">Content 1</AccordionItem>
  <AccordionItem title="Item 2">Content 2</AccordionItem>
</Accordion>
```

### Keret nélkül

A `borderless` eltávolítja az elemek külső keretét. Egymásba ágyazáskor vagy más konténerben hasznos.

```sveltehtml
<Accordion borderless>
  <AccordionItem title="Clean Item">Content</AccordionItem>
</Accordion>
```

---

## Méretek

Három méret, amelyek kizárják egymást. A fejléc paddingjét és betűméretét szabályozzák.

| Méret | Padding | Címke betűmérete |
|------|---------|-----------|
| *(normál)* | `p-4` | örökölt |
| `compact` | `p-2` | `text-sm` |
| `small` | `p-1 px-2` | `text-xs` |

```sveltehtml
<Accordion compact>
  <AccordionItem title="Compact Item">Content</AccordionItem>
</Accordion>
```

---

## Működés

### Egy vagy több nyitott elem

Alapértelmezésben egy elem megnyitása bezárja a többit. A `multiple` megengedi, hogy egyszerre több elem is nyitva legyen.

```sveltehtml
<Accordion multiple>
  <AccordionItem title="Item 1">Content 1</AccordionItem>
  <AccordionItem title="Item 2">Content 2</AccordionItem>
</Accordion>
```

---

## Felépítés

```
Accordion                   (context provider)
  └── createAccordionManager()
       └── AccordionManager instance

AccordionItem               (consumer)
  └── getAccordionManager()
       └── reads state (isOpen)
       └── triggers toggleItem(id)
```

Az `AccordionManager` egy `Set<string>`-ben tartja nyilván az aktív elemek azonosítóit.
- Ha a `multiple` hamis, a halmaz legfeljebb egy azonosítót tartalmaz.
- Ha a `multiple` igaz, tetszőleges számú azonosítót tartalmazhat.

Az állapot a Svelte 5 `$state` rune-jaival reaktív.

## Mikor használd

Összetartozó szakaszok fokozatos feltárására használd; egyetlen, önállóan vezérelt szakaszhoz a Collapsible-t.

## Alternatívák

Egyetlen aktív tartalomnézethez a [Tabs](tabs.md), hierarchikus adatokhoz a [Tree](tree.md) való.

## Beállítás és korlátok

Az AccordionItemhez Accordion context kell; a Collapsible saját contextet hoz létre. Root nem szükséges. Egyedi, stabil elemazonosítókat használj. Az Accordion zárt állapotban indul, és nincs publikus bindingja az aktív elemre; a Collapsible `bind:open`-t ad, amelyet effectek szinkronizálnak. A manager multiple/méret/borderless/joined beállításait inicializáláskor rögzíti. A zárt tartalom feltételesen unmountolódik, ezért ha egy állapotnak túl kell élnie a bezárást, tartsd a panelen kívül. A fejlécek natív gombok, de a komponens nem ad hozzájuk expanded/controls ARIA-attribútumokat.
