# Radio

A radio button group built from `RadioGroup` (the context provider) and `RadioButton` (individual options). Size is set on `RadioGroup` and inherited by all children.

## Import

```ts
import { RadioGroup, RadioButton } from '@atom-forge/ui';
```

---

## RadioGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `any` | — | Bindable currently-selected value. |
| `size` | `'normal' \| 'compact' \| 'small'` | `'normal'` | Size passed down to all `RadioButton` children via context. |
| `primary` | `boolean` | — | Primary color variant. Mutually exclusive with `accent`. |
| `accent` | `boolean` | — | Accent color variant. Mutually exclusive with `primary`. |
| `class` | `string` | — | Extra classes on the wrapper div. |

---

## RadioButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `any` | — | The value this option represents. |
| `label` | `string` | — | Text label shown next to the button. |
| `disabled` | `boolean` | — | Disables this option. |
| `class` | `string` | — | Extra classes. |

Size is inherited from the parent `RadioGroup` context. Item `compact` / `small` props are used only when the group omits `size`. The color variant (`primary` / `accent` / default) is always set on `RadioGroup` and applies to all children.

---

## Usage

```sveltehtml
<script lang="ts">
  let role = $state('user');
</script>

<RadioGroup bind:value={role} class="flex flex-col gap-2">
  <RadioButton value="admin" label="Admin"/>
  <RadioButton value="user" label="User"/>
  <RadioButton value="guest" label="Guest" disabled/>
</RadioGroup>

<!-- Compact horizontal group -->
<RadioGroup bind:value={role} size="compact" class="flex flex-row gap-4">
  <RadioButton value="admin" label="Admin"/>
  <RadioButton value="user" label="User"/>
</RadioGroup>

<!-- Primary variant -->
<RadioGroup bind:value={role} primary class="flex flex-col gap-2">
  <RadioButton value="admin" label="Admin"/>
  <RadioButton value="user" label="User"/>
</RadioGroup>

<!-- Accent variant -->
<RadioGroup bind:value={role} accent class="flex flex-col gap-2">
  <RadioButton value="admin" label="Admin"/>
  <RadioButton value="user" label="User"/>
</RadioGroup>
```

## When to use

Use for one choice among a small set of visible options.

## Alternatives

Use [Select](select.md) or [NativeSelect](native-select.md) for a compact list; use [Checkbox](checkbox.md) for independent choices.

## Setup and behavior

RadioButton requires an ancestor RadioGroup, not Root. Bind the group’s value; comparison is strict equality. Group size and color are captured at initialization. A supplied group `size` takes precedence over item size props; item props apply only when the group size is omitted. Value synchronization uses effects and there is no public change callback. **Current limitation:** options render click-only divs without native radio inputs, keyboard navigation, or radio ARIA semantics. Do not assume browser-native radio accessibility or form serialization.
