# Button

A clickable element for triggering actions. Supports 7 variants, an outline modifier, 4 sizes, loading states, and icon composition.

## Import

```ts
import { Button } from '@atom-forge/ui';
```

---

## Props

### Content

| Prop       | Type             | Group | Description                                                    |
|------------|------------------|-------|----------------------------------------------------------------|
| `label`    | `string`         | —     | Button text; not rendered when `children` is provided.               |
| `icon`     | `IconDefinition` | —     | Icon at the start.                                             |
| `endIcon`  | `IconDefinition` | —     | Icon at the end.                                               |
| `children` | `Snippet`        | —     | Custom content snippet. Takes precedence over label and icons when not loading. |

### Variants

One variant is active at a time — the first truthy prop wins in this order:
`destructive` › `secondary` › `ghost` › `link` › `muted` › `accent` › primary style (default; no variant prop)

| Prop          | Default | Group   | Description                                                                                                        |
|---------------|---------|---------|--------------------------------------------------------------------------------------------------------------------|
| `secondary`   | `false` | Variant | Secondary style using the secondary semantic color.                                                                |
| `destructive` | `false` | Variant | Destructive (red) style.                                                                                           |
| `ghost`       | `false` | Variant | Transparent background, no border, subtle secondary hover.                                                         |
| `link`        | `false` | Variant | Accent-colored text, no background, underline on hover. Same physical size as other buttons.                       |
| `muted`       | `false` | Variant | Low-emphasis style using the muted semantic color.                                                                 |
| `accent`      | `false` | Variant | Accent color style.                                                                                                |
| `outline`     | `false` | —       | **Style modifier** — turns any solid variant into a bordered, transparent version. No effect on `ghost` or `link`. |

### Size

Default is `normal` (h-10, text-sm).

| Prop      | Default | Group | Description                                                                                 |
|-----------|---------|-------|---------------------------------------------------------------------------------------------|
| `compact` | `false` | Size  | Compact — h-8, text-xs.                                                                     |
| `small`   | `false` | Size  | Small — h-6, text-xs.                                                                       |
| `micro`   | `false` | Size  | Micro — h-5, text-[10px]. For dense UI contexts (table rows, card footers, inline actions). |

### Modifiers

| Prop         | Default | Group | Description                                   |
|--------------|---------|-------|-----------------------------------------------|
| `pill`       | `false` | —     | Fully rounded corners.                        |
| `grow`       | `false` | —     | Stretches to full container width (`w-full`). |
| `borderless` | `false` | —     | Removes the border.                           |

### State

| Prop       | Type                | Default | Group | Description                                                                  |
|------------|---------------------|---------|-------|------------------------------------------------------------------------------|
| `disabled` | `boolean`           | `false` | —     | Disables the button. Also set automatically when `loading` is truthy.        |
| `loading`  | `boolean \| number` | —       | —     | `true` → spinner, disabled. Number (0–100) → progress bar + spinner + label. |

### Events & Styling

| Prop      | Type                      | Group | Description                                   |
|-----------|---------------------------|-------|-----------------------------------------------|
| `onclick` | `(e: MouseEvent) => void` | —     | Click handler.                                |
| `class`   | `string`                  | —     | Extra Tailwind classes, merged via `twMerge`. |

---

## Variants

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

## Outline modifier

`outline` converts any solid variant into a bordered, transparent button.

```sveltehtml
<Button label="Primary" outline />
<Button label="Secondary" secondary outline />
<Button label="Destructive" destructive outline />
<Button label="Muted" muted outline />
<Button label="Accent" accent outline />
```

---

## Sizes

All variants (including `link`) respect the size props.

```sveltehtml
<Button label="Normal" />
<Button label="Compact" compact />
<Button label="Small" small />
<Button label="Micro" micro />
```

Use `micro` for tight spaces like table row actions, card footers, or inline move controls.

---

## Icons

Pass any `lucide-svelte` icon component directly — no wrapper needed.
Providing only `icon` (no `label`, `endIcon`, or `children`) automatically makes the button square.

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

## Loading

### `loading={true}` — spinner, button disabled

```sveltehtml
<Button label="Saving..." loading />
<Button label="Saving..." loading secondary />
<Button label="Saving..." loading outline />
```

### `loading={number}` — progress bar (0–100)

The progress fill is `bg-current/15`, so it inherits the variant's text color automatically.

```sveltehtml
<script lang="ts">
  let progress = $state(0);
</script>

<Button label="Uploading..." loading={progress} />
```

---

## Disabled

```sveltehtml
<Button label="Primary" disabled />
<Button label="Outline" outline disabled />
<Button label="Ghost" ghost disabled />
```

---

## Modifiers

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

## Custom content

```sveltehtml
<Button>
  <img src="/avatar.jpg" class="w-5 h-5 rounded-full" alt="" />
  <span>John Doe</span>
</Button>
```

## Custom styling

Classes are merged with `twMerge`, so they cleanly override conflicting defaults.

```sveltehtml
<Button
  label="Gradient"
  class="bg-linear-to-r from-violet-500 to-pink-500 border-transparent text-white"
/>
```

---

## ButtonBar integration

`ButtonBar` groups buttons together. It groups children with CSS for shared borders and corners; set child variants and sizes explicitly.

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

## Transitions

The button uses CSS transitions for visual state changes. It does not implement click-pulse or press/release spring animations.

## When to use

Use for actions, form submission, and icon-only commands.

## Alternatives

Use an anchor for navigation: `link` changes appearance but still renders a button. Use [ButtonBar](../layout/button-bar.md) to visually group actions.

## Setup and behavior

Additional attributes are forwarded to the native button. Set `type="button"` for non-submit actions inside forms and an `aria-label` for icon-only actions. `loading={true}` replaces content with a spinner; nonzero numeric loading also keeps the label and draws a percentage fill. `loading={0}` draws a zero-width fill but does not disable the button. Numeric progress is not clamped. Variant and size props are mutually exclusive; icon-only layout is determined at initialization.
