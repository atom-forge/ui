# Empty State

Középre igazított helykitöltő arra az esetre, ha egy listának vagy szekciónak nincs tartalma. Egy ikont, egy címet, opcionális leírást és opcionális call-to-action helyet kombinál.

## Import

```ts
import { EmptyState } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `icon` | `IconDefinition` | — | A cím fölött megjelenő ikon. Használd a `defineIcon()`-t. |
| `title` | `string` | — | Az elsődleges üzenet. |
| `description` | `string` | — | Opcionális kiegészítő szöveg. |
| `children` | `Snippet` | — | Opcionális CTA-terület (például egy Button). |
| `class` | `string` | — | További Tailwind osztályok a gyökér `div` elemen. |

---

## Használat

```sveltehtml
<!-- Minimal -->
<EmptyState icon={defineIcon(IconInbox)} title="No messages"/>

<!-- With description -->
<EmptyState
  icon={defineIcon(IconSearch)}
  title="No results"
  description="Try adjusting your search or filters."
/>

<!-- With CTA -->
<EmptyState
  icon={defineIcon(IconFilePlus)}
  title="No documents yet"
  description="Create your first document."
>
  <Button accent icon={defineIcon(IconFilePlus)} label="New Document"/>
</EmptyState>
```

## Mikor használd

A betöltés befejezése után, ha egy gyűjtemény üres, vagy egy szűrő nem talál semmit.

## Alternatívák

Amíg a betöltés tart, betöltési helykitöltőt használj; feltöltött felülethez a [Card](card.md) való.

## Beállítás és működés

Azt, hogy mikor üres az állapot, az alkalmazás dönti el. Az `icon` és a `title` kötelező; a Lucide ikonok közvetlenül, `defineIcon()` nélkül is működnek. A children opcionális műveleteket ad, de a komponens magától nem tölt be adatot, nem próbálkozik újra és nem navigál.
