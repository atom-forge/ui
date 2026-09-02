# Icon

A thin wrapper around `lucide-svelte`, inline SVG, and SVG URL icons with unified sizing and support for `IconDefinition` modifiers.

## Import

```sveltehtml
import { Icon, defineIcon, svgIcon } from '@atom-forge/ui';
import { Plus } from 'lucide-svelte';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `IconDefinition` | — | Icon component, SVG icon, or `IconDefiner` instance. |
| `size` | `number \| string` | — | Size in Tailwind units (multiplied by 4px). E.g. `size="5"` → 20px. |
| `pxSize` | `number \| string` | — | Explicit pixel size. Mutually exclusive with `size`. |
| `stroke` | `number \| string` | `4` | Stroke weight (1–7 scale, maps to SVG `stroke-width`). |
| `class` | `string` | — | Extra classes. |

If neither `size` nor `pxSize` is provided, defaults to 20px.

---

## `defineIcon()`

`defineIcon()` returns an `IconDefiner` that lets you chain modifiers:

```ts
defineIcon(Trash)               // plain icon
defineIcon(Trash).setStroke(2)  // custom stroke weight
defineIcon(Trash).class('text-destructive')  // extra class
defineIcon(Trash).class('invisible')         // hidden placeholder
```

Use `IconDefiner` instances wherever `IconDefinition` is accepted (Button, Chip, Tree, etc.).

---

## `svgIcon()`

`svgIcon()` accepts either inline SVG markup or a `URL` object. Inline SVG icons support `color()`; URL icons deliberately do not, because an SVG loaded through an `<img>` element cannot inherit a CSS color.

```ts
const inlineLogo = svgIcon('<svg viewBox="0 0 24 24" fill="currentColor">...</svg>')
  .color('var(--color-accent)');

const externalLogo = svgIcon(new URL('./logo.svg', import.meta.url));
```

Only pass trusted, sanitized SVG markup to `svgIcon()` because inline SVG is rendered as HTML.

---

## Usage

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

## Stroke weight mapping

The `stroke` prop uses a 1–7 scale:

| stroke | stroke-width |
|--------|-------------|
| 1 | 0.5 |
| 2 | 0.75 |
| 3 | 1.0 |
| 4 (default) | 1.25 |
| 5 | 1.5 |
| 6 | 1.75 |
| 7 | 2.0 |
