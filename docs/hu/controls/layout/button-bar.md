# ButtonBar

Tisztán vizuális keret, amely a gyerekeit egységes sávba csoportosítja. A közvetlen gyerekekről scoped CSS automatikusan eltávolítja a keretet, a lekerekítést és az árnyékot. A méretet magukon a gyerekeken állítod.

## Importálás

```ts
import { ButtonBar, ButtonBarItem } from '@atom-forge/ui';
```

---

## Komponensek

| Komponens | Leírás |
|-----------|-------------|
| `ButtonBar` | A keretelem. Alapértelmezésben `inline-flex`. |
| `ButtonBarItem` | Egységesítő wrapper azokhoz a komponensekhez, amelyek alapból nem illeszkednek (Switch, Slider, ColorPicker stb.). |

---

## ButtonBar propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `children` | `Snippet` | — | Közvetlen gyerekek — Buttonök, Inputok vagy bármilyen stílusozott elem. |
| `class` | `string` | — | További Tailwind-osztályok, `twMerge`-dzsel összefésülve. |

---

## ButtonBarItem propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `children` | `Snippet` | — | A becsomagolandó komponens. |
| `class` | `string` | — | További Tailwind-osztályok. |

A `ButtonBarItem` `self-stretch`-et kap, így kitölti a sáv teljes magasságát, és `bg-secondary px-2`-t az egységes megjelenésért.

---

## Használat

### Gombok

```sveltehtml
<ButtonBar>
  <Button label="One"/>
  <Button label="Two"/>
  <Button label="Three"/>
</ButtonBar>
```

### Teljes szélesség, egyforma széles gombokkal

Add a sávnak a `class="flex w-full"`, minden gyereknek a `class="flex-1"` osztályt.

```sveltehtml
<ButtonBar class="flex w-full">
  <Button class="flex-1" label="One"/>
  <Button class="flex-1" label="Two"/>
  <Button class="flex-1" label="Three"/>
</ButtonBar>
```

### Vegyes komponensek (Input + Button)

A stílusozott külső elemmel rendelkező komponensek közvetlenül gyerekként is működnek — a keretük és a lekerekítésük automatikusan eltűnik.

```sveltehtml
<ButtonBar class="flex w-full">
  <Input class="flex-1" bind:value={query} placeholder="Search..."/>
  <Button label="Search" icon={IconSearch}/>
</ButtonBar>
```

### ButtonBarItem — nem illeszkedő komponensekhez

A szabványos vezérlőfelület nélküli komponenseket (Switch, Slider, ColorPicker…) csomagold be, hogy illeszkedő hátteret kapjanak, és kitöltsék a sáv magasságát.

```sveltehtml
<ButtonBar>
  <ButtonBarItem>
    <Switch bind:value={enabled}/>
  </ButtonBarItem>
  <ButtonBarItem>
    <Slider bind:value={volume} class="w-32"/>
  </ButtonBarItem>
  <Button icon={IconSettings}/>
</ButtonBar>
```

---

## Hogyan működik a CSS-eltávolítás

Egy scoped `<style>` blokk minden közvetlen gyerekre érvényes:

```css
span > :global(*) {
  border-radius: 0 !important;
  border-width: 0 !important;
  box-shadow: none !important;
}
```

Ez megbízhatóan felülírja bármely komponens saját stílusát, Tailwind arbitrary selectorok nélkül.

## Mikor használd

Szomszédos akciók vagy vegyes input/akció sor vizuális összekapcsolására.

## Alternatívák

Különálló akciókhoz egy flex konténer, aktív panel kiválasztásához a [Tabs](tabs.md), értékválasztáshoz a [Radio](../forms/radio.md) való.

## Beállítás és korlátok

Nincs context, közös méret, kiválasztott érték vagy eseménytovábbítás. A variánsokat és méreteket minden gyereken külön állítsd be. Csak a közvetlen DOM-gyerekekről tűnik el a keret, a lekerekítés és az árnyék; egy további wrapper megváltoztatja, melyik felületre hat. A ButtonBarItem másodlagos hátteret és stretch igazítást ad. A sáv nem lesz automatikusan toolbar vagy billentyűzettel navigálható csoport; a szemantikát és a viselkedést a hívó oldalon add hozzá.
