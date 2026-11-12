# Switch

Kapcsoló opcionális címkével és be/ki állapothoz tartozó ikonpárral.

## Importálás

```ts
import { Switch } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `boolean` | `false` | Bindolható be/ki állapot. Kizárja a `checked`-et. |
| `checked` | `boolean` | — | Alternatív bindolható be/ki állapot. Kizárja a `value`-t. |
| `onchange` | `(checked: boolean) => void` | — | Minden átkapcsoláskor lefut. |
| `label` | `string \| { on: string; off: string }` | — | A kapcsoló mellett megjelenő statikus szöveg, vagy egy objektum külön be/ki címkével (áttűnéssel váltanak). |
| `icons` | `{ on: IconDefinition; off: IconDefinition }` | — | Az egyes állapotokhoz a fogantyúban megjelenő ikonok (csak normál méretben). |
| `disabled` | `boolean` | — | Letiltja a kapcsolót. |
| `compact` | `boolean` | — | Kompakt méret. Kizárja a `small`-t. |
| `small` | `boolean` | — | Kis méret. Kizárja a `compact`-ot. |
| `class` | `string` | — | További Tailwind osztályok a wrapperen. |

---

## Méretek

| Méret | Sáv | Fogantyú |
|------|-------|-------|
| normál | `w-11 h-6` | `h-5 w-5` |
| `compact` | `w-9 h-5` | `h-4 w-4` |
| `small` | `w-7 h-4` | `h-3 w-3` |

Az ikonok csak `normal` méretben látszanak.

---

## Használat

```sveltehtml
<script lang="ts">
  let enabled = $state(false);
</script>

<!-- Basic -->
<Switch bind:value={enabled}/>

<!-- With checked (alternative binding) -->
<Switch bind:checked={enabled}/>

<!-- With onchange -->
<Switch bind:value={enabled} onchange={(v) => console.log('switched:', v)}/>

<!-- With static label -->
<Switch bind:value={enabled} label="Dark mode"/>

<!-- With on/off labels -->
<Switch bind:value={enabled} label={{ on: 'Enabled', off: 'Disabled' }}/>

<!-- With icons -->
<Switch bind:value={enabled} icons={{ on: IconMoonFilled, off: IconSun }}/>

<!-- Sizes -->
<Switch bind:value={enabled} compact/>
<Switch bind:value={enabled} small/>

<!-- Disabled -->
<Switch bind:value={enabled} disabled/>
```

## Mikor használd

Olyan logikai beállításhoz, amely be/ki állapotként értelmezhető.

## Alternatívák

Kiválasztáshoz vagy elfogadáshoz használd a [Checkbox](checkbox.md)-ot, kettőnél több, egymást kizáró választáshoz a [Radio](radio.md)-t.

## Beállítás és működés

A `value` és a `checked` közül egyet válassz, ne mindkettőt; az alias és a méret az inicializáláskor rögzül. A `checked` kötést logikai értékkel inicializáld. A natív checkbox change kezelője előbb beállítja a kötést, majd meghívja az `onchange(boolean)`-t; a kötés külső változásai nem hívják meg ezt a callbacket. Nincs aszinkron függő állapot vagy visszagörgetés: a mentést külön valósítsd meg. A komponens nem adja tovább az ID-t, a nevet vagy tetszőleges attribútumokat a rejtett inputnak.
