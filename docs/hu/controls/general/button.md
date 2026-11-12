# Button

Kattintható elem műveletek indításához. 7 variánst, outline módosítót, 4 méretet, betöltési állapotokat és ikonokkal való kombinálást támogat.

## Importálás

```ts
import { Button } from '@atom-forge/ui';
```

---

## Propok

### Tartalom

| Prop       | Típus            | Csoport | Leírás                                                         |
|------------|------------------|-------|----------------------------------------------------------------|
| `label`    | `string`         | —     | A gomb szövege; nem jelenik meg, ha `children` meg van adva.   |
| `icon`     | `IconDefinition` | —     | Ikon az elején.                                                |
| `endIcon`  | `IconDefinition` | —     | Ikon a végén.                                                  |
| `children` | `Snippet`        | —     | Egyedi tartalom snippet. Ha nincs betöltés, elsőbbséget élvez a label és az ikonok előtt. |

### Variánsok

Egyszerre egy variáns aktív — az első igaz értékű prop nyer, ebben a sorrendben:
`destructive` › `secondary` › `ghost` › `link` › `muted` › `accent` › primary stílus (alapértelmezett; nincs hozzá variáns prop)

| Prop          | Alapérték | Csoport | Leírás                                                                                                           |
|---------------|---------|---------|--------------------------------------------------------------------------------------------------------------------|
| `secondary`   | `false` | Variant | Másodlagos stílus a secondary szemantikus színnel.                                                                 |
| `destructive` | `false` | Variant | Destruktív (piros) stílus.                                                                                         |
| `ghost`       | `false` | Variant | Átlátszó háttér, szegély nélkül, visszafogott secondary hoverrel.                                                  |
| `link`        | `false` | Variant | Accent színű szöveg, háttér nélkül, hoverre aláhúzással. Fizikai mérete ugyanaz, mint a többi gombé.               |
| `muted`       | `false` | Variant | Kevésbé hangsúlyos stílus a muted szemantikus színnel.                                                             |
| `accent`      | `false` | Variant | Accent színű stílus.                                                                                               |
| `outline`     | `false` | —       | **Stílusmódosító** — bármelyik kitöltött variánsból szegélyes, átlátszó változatot csinál. A `ghost`-ra és a `link`-re nincs hatása. |

### Méret

Az alapérték a `normal` (h-10, text-sm).

| Prop      | Alapérték | Csoport | Leírás                                                                                     |
|-----------|---------|-------|---------------------------------------------------------------------------------------------|
| `compact` | `false` | Size  | Compact — h-8, text-xs.                                                                     |
| `small`   | `false` | Size  | Small — h-6, text-xs.                                                                       |
| `micro`   | `false` | Size  | Micro — h-5, text-[10px]. Sűrű UI-környezetekhez (táblázatsorok, kártyák lábléce, inline műveletek). |

### Módosítók

| Prop         | Alapérték | Csoport | Leírás                                        |
|--------------|---------|-------|-----------------------------------------------|
| `pill`       | `false` | —     | Teljesen lekerekített sarkok.                 |
| `grow`       | `false` | —     | Kitölti a container teljes szélességét (`w-full`). |
| `borderless` | `false` | —     | Eltávolítja a szegélyt.                       |

### Állapot

| Prop       | Típus               | Alapérték | Csoport | Leírás                                                                       |
|------------|---------------------|---------|-------|------------------------------------------------------------------------------|
| `disabled` | `boolean`           | `false` | —     | Letiltja a gombot. Automatikusan beállítódik, ha a `loading` igaz értékű.   |
| `loading`  | `boolean \| number` | —       | —     | `true` → spinner, letiltva. Szám (0–100) → progress bar + spinner + label.   |

### Események és stílus

| Prop      | Típus                     | Csoport | Leírás                                        |
|-----------|---------------------------|-------|-----------------------------------------------|
| `onclick` | `(e: MouseEvent) => void` | —     | Kattintáskezelő.                              |
| `class`   | `string`                  | —     | További Tailwind osztályok, `twMerge`-dzsel összefésülve. |

---

## Variánsok

```sveltehtml
<Button label="Primary" />
<Button label="Secondary" secondary />
<Button label="Destructive" destructive />
<Button label="Ghost" ghost />
<Button label="Link" link />
<Button label="Muted" muted />
<Button label="Accent" accent />
```

---

## Outline módosító

Az `outline` bármelyik kitöltött variánst szegélyes, átlátszó gombbá alakítja.

```sveltehtml
<Button label="Primary" outline />
<Button label="Secondary" secondary outline />
<Button label="Destructive" destructive outline />
<Button label="Muted" muted outline />
<Button label="Accent" accent outline />
```

---

## Méretek

Minden variáns (a `link` is) figyelembe veszi a méret propokat.

```sveltehtml
<Button label="Normal" />
<Button label="Compact" compact />
<Button label="Small" small />
<Button label="Micro" micro />
```

A `micro` szűk helyekre való, például táblázatsorok műveleteihez, kártyák láblécébe vagy inline mozgató vezérlőkhöz.

---

## Ikonok

Bármelyik `lucide-svelte` ikonkomponenst közvetlenül átadhatod — nem kell wrapper.
Ha csak `icon`-t adsz meg (`label`, `endIcon` és `children` nélkül), a gomb automatikusan négyzet alakú lesz.

```sveltehtml
<script lang="ts">
  import { Plus, ArrowRight, Trash } from 'lucide-svelte';
</script>

<Button icon={Plus} label="Add item" />
<Button label="Next" endIcon={ArrowRight} />

<!-- Icon only → square -->
<Button icon={Trash} destructive />
<Button icon={Trash} destructive compact />
<Button icon={Trash} destructive outline />
```

---

## Betöltés

### `loading={true}` — spinner, a gomb letiltva

```sveltehtml
<Button label="Saving..." loading />
<Button label="Saving..." loading secondary />
<Button label="Saving..." loading outline />
```

### `loading={number}` — progress bar (0–100)

A haladást jelző kitöltés `bg-current/15`, így automatikusan a variáns szövegszínét örökli.

```sveltehtml
<script lang="ts">
  let progress = $state(0);
</script>

<Button label="Uploading..." loading={progress} />
```

---

## Letiltva

```sveltehtml
<Button label="Primary" disabled />
<Button label="Outline" outline disabled />
<Button label="Ghost" ghost disabled />
```

---

## Módosítók

```sveltehtml
<!-- Pill -->
<Button label="Pill" pill />
<Button label="Pill Outline" outline pill />
<Button icon={Plus} pill />

<!-- Full width -->
<Button label="Full width" grow />

<!-- No border -->
<Button label="Next" endIcon={ArrowRight} borderless />
```

---

## Egyedi tartalom

```sveltehtml
<Button>
  <img src="/avatar.jpg" class="w-5 h-5 rounded-full" alt="" />
  <span>John Doe</span>
</Button>
```

## Egyedi stílus

Az osztályok `twMerge`-dzsel fésülődnek össze, így tisztán felülírják az ütköző alapértelmezéseket.

```sveltehtml
<Button
  label="Gradient"
  class="bg-linear-to-r from-violet-500 to-pink-500 border-transparent text-white"
/>
```

---

## ButtonBar integráció

A `ButtonBar` csoportba fogja a gombokat. A gyerekelemeket CSS-sel csoportosítja közös szegélyekkel és sarkokkal; a gyerekek variánsát és méretét kifejezetten add meg.

```sveltehtml
<script lang="ts">
import { ButtonBar, Button } from '@atom-forge/ui';
import { Bold, Italic, Underline } from 'lucide-svelte';
</script>

<ButtonBar>
  <Button icon={Bold} />
  <Button icon={Italic} />
  <Button icon={Underline} />
</ButtonBar>

<ButtonBar>
  <Button label="Cut" compact />
  <Button label="Copy" compact />
  <Button label="Paste" compact />
</ButtonBar>
```

---

## Átmenetek

A gomb a vizuális állapotváltozásokhoz CSS transitionöket használ. Kattintásra pulzáló vagy lenyomás/felengedés rugós animációt nem valósít meg.

## Mikor használd

Műveletekhez, űrlapok elküldéséhez és csak ikonos parancsokhoz.

## Alternatívák

Navigációhoz anchort használj: a `link` csak a megjelenést változtatja meg, a renderelt elem továbbra is button. Műveletek vizuális csoportosításához a [ButtonBar](../layout/button-bar.md)-t használd.

## Beállítás és működés

A további attribútumokat továbbadja a natív buttonnek. Űrlapon belüli, nem küldő műveleteknél állítsd be a `type="button"`-t, csak ikonos műveleteknél pedig az `aria-label`-t. A `loading={true}` a tartalmat spinnerre cseréli; a nem nulla numerikus loading a labelt is megtartja, és százalékos kitöltést rajzol. A `loading={0}` nulla szélességű kitöltést rajzol, de nem tiltja le a gombot. A numerikus haladás nincs korlátok közé szorítva. A variáns- és méretpropok kölcsönösen kizárják egymást; a csak ikonos elrendezés inicializáláskor dől el.
