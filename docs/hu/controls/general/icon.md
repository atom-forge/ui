# Icon

Vékony wrapper `lucide-svelte`, inline SVG és SVG URL ikonok köré, egységes méretezéssel és az `IconDefinition` módosítók támogatásával.

## Importálás

```ts
import { Icon, defineIcon, svgIcon } from '@atom-forge/ui';
import { Plus } from 'lucide-svelte';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `icon` | `IconDefinition` | — | Ikonkomponens, SVG ikon vagy `IconDefiner` példány. |
| `size` | `number \| string` | — | Méret Tailwind egységben (4px-szel szorozva). Pl. `size="5"` → 20px. |
| `pxSize` | `number \| string` | — | Kifejezett pixelméret. A `size`-zal kölcsönösen kizárják egymást. |
| `stroke` | `number \| string` | `4` | Vonalvastagság (1–7-es skála, az SVG `stroke-width`-re képezve). |
| `class` | `string` | — | További osztályok. |

Ha sem `size`, sem `pxSize` nincs megadva, az alapértelmezés 20px.

---

## `defineIcon()`

A `defineIcon()` egy `IconDefiner`-t ad vissza, amelyen láncolhatod a módosítókat:

```ts
defineIcon(Trash)               // plain icon
defineIcon(Trash).setStroke(2)  // custom stroke weight
defineIcon(Trash).class('text-destructive')  // extra class
defineIcon(Trash).class('invisible')         // hidden placeholder
```

Az `IconDefiner` példányokat bárhol használhatod, ahol `IconDefinition` az elvárt típus (Button, Chip, Tree stb.).

---

## `svgIcon()`

Az `svgIcon()` inline SVG markupot vagy egy `URL` objektumot fogad. Az inline SVG ikonok támogatják a `color()`-t; az URL ikonok szándékosan nem, mert egy `<img>` elemen keresztül betöltött SVG nem tudja örökölni a CSS színt.

```ts
const inlineLogo = svgIcon('<svg viewBox="0 0 24 24" fill="currentColor">...</svg>')
  .color('var(--color-accent)');

const externalLogo = svgIcon(new URL('./logo.svg', import.meta.url));
```

Az `svgIcon()`-nak csak megbízható, szanitizált SVG markupot adj át, mert az inline SVG HTML-ként renderelődik.

---

## Használat

```sveltehtml
<!-- Direct icon component -->
<Icon icon={Plus} size="5"/>

<!-- Explicit px size -->
<Icon icon={Plus} pxSize={24}/>

<!-- Custom stroke -->
<Icon icon={Plus} size="5" stroke={2}/>

<!-- Via defineIcon -->
<Icon icon={defineIcon(Trash).setStroke(1.5).class('text-destructive')} size="4"/>

<!-- Inline SVG -->
<Icon icon={svgIcon('<svg viewBox="0 0 24 24" fill="currentColor">...</svg>').color('var(--color-accent)')} size="5"/>

<!-- SVG URL -->
<Icon icon={svgIcon(new URL('./logo.svg', import.meta.url))} size="5"/>
```

---

## Vonalvastagság-leképezés

A `stroke` prop 1–7-es skálát használ:

| stroke | stroke-width |
|--------|-------------|
| 1 | 0.5 |
| 2 | 0.75 |
| 3 | 1.0 |
| 4 (alapérték) | 1.25 |
| 5 | 1.5 |
| 6 | 1.75 |
| 7 | 2.0 |

## Mikor használd

Lucide komponensek vagy SVG definíciók megjelenítéséhez ugyanazzal a méretezési API-val.

## Alternatívák

Az `icon` propot fogadó vezérlőknek közvetlenül adj át egy `IconDefinition`-t, ahelyett hogy kézzel ágyaznál be egy Icont.

## Beállítás és működés

A méret és a vonalvastagság inicializáláskor dől el; a módosításukhoz mountold újra a komponenst. A string méreteket egész számként értelmezi, ezért tört Tailwind egységekhez numerikus értéket használj. Az `IconDefiner` vonalvastagsága felülírja a `stroke` propot. Az inline SVG szanitizálás nélkül, `{@html}`-lel kerül be; csak megbízható markupot fogadj el. Az URL SVG-k képként renderelődnek, és nem örökölhetik a színt. A tartalmazó műveletnek adj akadálymentes nevet.
