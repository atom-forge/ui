# Card

Felületi konténer lekerekített kerettel és állítható árnyékmélységgel. A `surface` szemantikus színréteget használja.

## Import

```ts
import { Card } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `children` | `Snippet` | — | A kártya tartalma. |
| `elevate` | `0–6` | `1` | Árnyékszint. `0` = nincs árnyék, `6` = `shadow-2xl`. |
| `class` | `string` | — | További Tailwind osztályok, `twMerge`-dzsel összefésülve. |

Az árnyékszintek Tailwind megfelelői: `0→none`, `1→sm`, `2→shadow`, `3→md`, `4→lg`, `5→xl`, `6→2xl`.

---

## Használat

```sveltehtml
<Card>
  <p class="p-4">Basic card with default shadow.</p>
</Card>

<Card elevate={3}>
  <p class="p-4">Medium shadow.</p>
</Card>

<Card elevate={0} class="p-6">
  <p>Flat card, no shadow.</p>
</Card>
```

## Mikor használd

Összetartozó tartalom köré húzott, kerettel ellátott felületnek.

## Alternatívák

Üres tartalmat jelző üzenethez az [EmptyState](empty-state.md) való; a [FlipCard](flip-card.md)-ot csak akkor használd, ha szándékosan kétoldalas interakciót szeretnél.

## Beállítás és működés

A Card nem ad fejléc/lábléc API-t, belső paddinget vagy interakciós logikát. A térközöket `class`-szal add hozzá, a tartalmat `children`-nel állítsd össze. `bg-surface` / `text-surface-contrast` színt használ, levágja a túlcsordulást, és a további attribútumokat a div elemére továbbítja. Az elevate 0–6 közötti egész szinteket vagy azok string megfelelőit fogadja.
