# ColorPicker

Stílusos színválasztó, amely egy színmintát és az aktuális hex értéket mutatja. A natív `<input type="color">`-t csomagolja be a design systemhez illeszkedő megjelenéssel.

## Importálás

```ts
import { ColorPicker } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `string` | `'#ffffff'` | Bindolható hex színkód. |
| `disabled` | `boolean` | — | Letiltja a színválasztót. |
| `compact` | `boolean` | — | Kompakt méret (h-8). Kizárja a `small`-t. |
| `small` | `boolean` | — | Kis méret (h-6). Kizárja a `compact`-ot. |
| `class` | `string` | — | További Tailwind osztályok, `twMerge`-dzsel összefésülve. |

---

## Méretek

| Méret | Magasság |
|------|--------|
| normál | `h-10` |
| `compact` | `h-8` |
| `small` | `h-6` |

---

## Használat

```sveltehtml
<script lang="ts">
  let color = $state('#3b82f6');
</script>

<ColorPicker bind:value={color}/>
<ColorPicker bind:value={color} compact/>
<ColorPicker bind:value={color} disabled/>
```

## Mikor használd

Színmintához, amely mögött a böngésző natív színválasztója áll.

## Alternatívák

Használd az [Input](input.md)-ot, ha a felhasználóknak tetszőleges színszintaxist vagy tokeneket kell megadniuk; a ColorPickerben nincs paletta vagy tokenválasztó.

## Beállítás és működés

Natív `input type="color"`-hoz megfelelő hex színkódot bindolj. A választó felületét a böngésző adja; nincs egyedi alfa- vagy formátum-API. A méretet az inicializáláskor rögzíti. A további attribútumok és eseménykezelők a wrapper divre kerülnek, nem a natív inputra, ezért ne számíts arra, hogy a `name`, az `id` vagy az `onchange` magát az inputot állítja be.
