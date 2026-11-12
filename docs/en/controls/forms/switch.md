# Switch

A toggle switch with optional label and icon pair for on/off states.

## Import

```ts
import { Switch } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | `false` | Bindable on/off state. Mutually exclusive with `checked`. |
| `checked` | `boolean` | — | Alternative bindable for on/off state. Mutually exclusive with `value`. |
| `onchange` | `(checked: boolean) => void` | — | Fired whenever the switch is toggled. |
| `label` | `string \| { on: string; off: string }` | — | Static string shown next to the switch, or an object with separate on/off labels (crossfaded). |
| `icons` | `{ on: IconDefinition; off: IconDefinition }` | — | Icons shown inside the thumb for each state (normal size only). |
| `disabled` | `boolean` | — | Disables the switch. |
| `compact` | `boolean` | — | Compact size. Mutually exclusive with `small`. |
| `small` | `boolean` | — | Small size. Mutually exclusive with `compact`. |
| `class` | `string` | — | Extra Tailwind classes on the wrapper. |

---

## Sizes

| Size | Track | Thumb |
|------|-------|-------|
| normal | `w-11 h-6` | `h-5 w-5` |
| `compact` | `w-9 h-5` | `h-4 w-4` |
| `small` | `w-7 h-4` | `h-3 w-3` |

Icons are only visible in `normal` size.

---

## Usage

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

## When to use

Use for a boolean setting that can be understood as on/off.

## Alternatives

Use [Checkbox](checkbox.md) for selection or agreement, and [Radio](radio.md) for more than two mutually exclusive choices.

## Setup and behavior

Choose `value` or `checked`, not both; alias choice and size are captured at initialization. Initialize a `checked` binding to a boolean. The native checkbox change handler assigns the binding before calling `onchange(boolean)`; external binding changes do not fire that callback. There is no async pending state or rollback: implement persistence separately. The component does not forward IDs, names, or arbitrary attributes to the hidden input.
