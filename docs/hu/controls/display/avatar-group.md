# Avatar Group

Egymást átfedő Avatar komponensek vízszintes sorát jeleníti meg. Ha a lista hosszabb a `max` értéknél, egy `+N` túlcsordulási chip jelenik meg. Az avatarokat a háttérszínnel egyező gyűrű választja el.

## Import

```ts
import { AvatarGroup } from '@atom-forge/ui';
```

---

## Propok

| Prop      | Típus                                               | Alapérték | Leírás                                                                 |
|-----------|-----------------------------------------------------|---------|------------------------------------------------------------------------|
| `avatars` | `{ name?: string; src?: string; color?: string }[]` | —       | Az avatarok adatai. Minden elem közvetlenül egy Avatar komponensnek felel meg. |
| `max`     | `number`                                            | `5`     | A látható avatarok maximális száma. A többlet `+N`-ként jelenik meg.   |
| `compact` | `boolean`                                           | `false` | Avataronként h-8 w-8.                                                  |
| `small`   | `boolean`                                           | `false` | Avataronként h-6 w-6.                                                  |
| `micro`   | `boolean`                                           | `false` | Avataronként h-5 w-5.                                                  |
| `class`   | `string`                                            | —       | További Tailwind osztályok a wrapperen.                                |

---

## Használat

```sveltehtml
<AvatarGroup avatars={[
  { name: 'Alice Johnson' },
  { name: 'Bob Smith' },
  { name: 'Carol White' },
  { name: 'David Lee' },
  { name: 'Eve Martinez' },
  { name: 'Frank Brown' },
]} max={4}/>

<!-- With images -->
<AvatarGroup avatars={[
  { name: 'Alice', src: '/avatars/alice.jpg' },
  { name: 'Bob' },
  { name: 'Carol', src: '/avatars/carol.jpg' },
]} compact/>
```

## Mikor használd

Résztvevők, tulajdonosok vagy felelősök kompakt előnézetéhez.

## Alternatívák

Ha a neveknek, tooltipeknek vagy személyenkénti műveleteknek elérhetőnek kell maradniuk, egyenként renderelj [Avatar](avatar.md) komponenseket.

## Beállítás és működés

Az első `max` elem jelenik meg a tömb sorrendjében; a túlcsordulás csak egy szám, nem kinyitható menü. Nemnegatív egész `max` értéket adj, és legfeljebb egy méretpropot. A csoport elemei csak nevet, képet és színt adnak át: a csoport nem továbbít tooltipet vagy kattintáskezelőt az egyes avatarokhoz.
