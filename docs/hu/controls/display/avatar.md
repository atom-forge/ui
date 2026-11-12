# Avatar

Kör alakú komponens egy felhasználó megjelenítésére. Ha megadod a `src`-t, képet renderel, különben monogramra vált, a névből determinisztikusan generált színnel.

## Import

```ts
import { Avatar } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `name` | `string` | — | Teljes név a monogramhoz és a színgeneráláshoz. |
| `src` | `string` | — | Kép URL. Monogram helyett `<img>` elemet renderel. |
| `color` | `string` | — | Felülírja az automatikusan generált színosztályt. |
| `tooltip` | `boolean` | `false` | Hoverre tooltipben mutatja a teljes nevet. A `name` kötelező hozzá. |
| `compact` | `boolean` | `false` | h-8 w-8, text-xs. |
| `small` | `boolean` | `false` | h-6 w-6, text-[10px]. |
| `micro` | `boolean` | `false` | h-5 w-5, text-[9px]. Sűrű UI-hoz. |
| `class` | `string` | — | További Tailwind osztályok, `twMerge`-dzsel összefésülve. |

Alapméret (méretprop nélkül): h-10 w-10, text-sm.

---

## Színgenerálás

Ha nincs `src`, a háttér- és szövegszín egy egyszerű hash-függvénnyel a `name`-ből származik. Így ugyanaz a név renderelésről renderelésre és oldalbetöltésről oldalbetöltésre mindig ugyanazt a színt kapja. Tetszőleges Tailwind osztálystringgel a `color` proppal írhatod felül.

---

## Tooltip

A `tooltip` beállításával hoverre megjelenik a teljes név. Monogramos és képes avatarral is működik. A `name` megadása kötelező; ha hiányzik, a tooltip nem renderelődik.

---

## Használat

```sveltehtml
<!-- Initials from name (auto-color) -->
<Avatar name="Alice Johnson"/>

<!-- Image -->
<Avatar src="/avatars/alice.jpg" name="Alice Johnson"/>

<!-- Sizes -->
<Avatar name="Alice Johnson" compact/>
<Avatar name="Alice Johnson" small/>
<Avatar name="Alice Johnson" micro/>

<!-- Custom color -->
<Avatar name="Bob" color="bg-red-500/20 text-red-600"/>

<!-- Tooltip — shows full name on hover -->
<Avatar name="Alice Johnson" tooltip/>
<Avatar src="/avatars/alice.jpg" name="Alice Johnson" tooltip/>
```

## Mikor használd

Képpel vagy monogrammal megjelenített személyhez vagy entitáshoz.

## Alternatívák

Átfedő személyekhez és túlcsordulási számlálóhoz az [AvatarGroup](avatar-group.md), általános szimbólumhoz az [Icon](../general/icon.md) való.

## Beállítás és működés

Legfeljebb egy méretpropot válassz. Hiányzó `src` esetén monogram jelenik meg (név nélkül `?`), de ha a kép URL-je nem töltődik be, nem vált automatikusan monogramra. A `tooltip`-hez név kell; nem igényel popup managert, és a Root portal targetjét használja, ha elérhető, különben a document.body-t. A kép alt szövege a `name`-ből jön.
