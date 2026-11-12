# Badge

Abszolút pozicionált overlay jelző értesítésszámokhoz vagy státuszpöttyökhöz. Bármilyen elemet körbevehet, és a jobb felső sarokban egy kis jelzőt renderel.

## Importálás

```ts
import { Badge } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `children` | `Snippet` | — | Az elem, amelyre a badge kerül. |
| `count` | `number` | — | A megjelenített szám. Ha a `count` 0, a badge automatikusan elrejtőzik. |
| `dot` | `boolean` | `false` | Szám helyett pöttyöt mutat. |
| `max` | `number` | `99` | A legnagyobb megjelenített szám. Túllépéskor `N+` látszik. |
| `color` | `'accent' \| 'red' \| 'green' \| 'blue'` | `'accent'` | A badge színe. |
| `hidden` | `boolean` | `false` | Kényszerítetten elrejti a badge-et. |
| `class` | `string` | — | További Tailwind osztályok a wrapper `div`-en. |

---

## Használat

```sveltehtml
<!-- Count badge -->
<Badge count={3}>
  <Button icon={defineIcon(IconBell)} ghost/>
</Badge>

<!-- Dot badge -->
<Badge dot color="red">
  <Button icon={defineIcon(IconMail)} ghost/>
</Badge>

<!-- Overflow -->
<Badge count={142} max={99} color="red">
  <Button icon={defineIcon(IconBell)} ghost/>
</Badge>

<!-- Hidden -->
<Badge count={5} hidden>
  <Button ghost label="No badge"/>
</Badge>
```

## Mikor használd

Egy másik elem fölé helyezett számhoz vagy státuszpöttyhöz, például olvasatlan értesítésekhez.

## Alternatívák

Overlay helyett inline státuszszöveghez a [Chip](chip.md)-et használd.

## Beállítás és működés

A jelző csak megjelenítő elem, és figyelmen kívül hagyja a pointer eseményeket. A szám csak akkor látszik, ha nagyobb nullánál; a `dot` szám nélkül is látható marad, hacsak nincs beállítva a `hidden`. A körbevett vezérlőn adj meg akadálymentes leírást az értesítésről.
