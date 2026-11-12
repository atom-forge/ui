# Kbd

Billentyűparancsokat jelenít meg fizikai billentyűsapkákra emlékeztető stílusban. Egyes billentyűket és többbillentyűs kombinációkat is támogat.

## Importálás

```ts
import { Kbd } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `keys` | `string \| string[]` | — | Egyetlen billentyű vagy billentyűk tömbje. A tömb elemei `+` elválasztóval jelennek meg. |
| `class` | `string` | — | További Tailwind osztályok a wrapper `<span>`-en. |

---

## Használat

```sveltehtml
<!-- Single key -->
<Kbd keys="Enter"/>
<Kbd keys="⌘"/>
<Kbd keys="Escape"/>

<!-- Key combination -->
<Kbd keys={['⌘', 'K']}/>
<Kbd keys={['⌘', '⇧', 'Z']}/>
<Kbd keys={['Ctrl', 'Alt', 'Del']}/>
```

### Billentyűszimbólumok

| Szimbólum | Jelentés |
|--------|---------|
| `⌘` | Command (Mac) |
| `⌥` | Option/Alt (Mac) |
| `⇧` | Shift |
| `⌃` | Control |
| `⌫` | Backspace/Delete |
| `↩` | Return/Enter |

## Mikor használd

Billentyűparancs megjelenítéséhez súgószövegben, menükben vagy tooltipekben.

## Alternatívák

A felhasználó által elindítható művelethez a [Button](button.md)-t használd; a Kbd csak vizuális leírás.

## Beállítás és működés

Nem regisztrál billentyűfigyelőket. A `meta` a felismert Apple platformokon Commandként, máshol Ctrl-ként jelenik meg; a `cmd` mindig Commandként. A platformfelismerés inicializáláskor történik, és a szerveren nincs navigator, ezért ha fontos, hogy a szerver- és kliensoldali felirat azonos legyen, kifejezetten megadott billentyűket használj.
