# TimePicker

A time form control built on reusable time picker body and popover layers. It preserves the public `string | null` value shape and falls back to the native time input on coarse pointer devices.

## Import

```sveltehtml
import { TimePicker, TimePickerBody, TimePopover } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| null` | `null` | Bindable time value. Format: `"HH:MM"` or `"HH:MM:SS"` when `seconds` is set. |
| `seconds` | `boolean` | `false` | Enables seconds. Changes value format to `"HH:MM:SS"`. |
| `placeholder` | `string` | `'Select time'` | Text shown when no time is selected. |
| `disabled` | `boolean` | `false` | Disables the picker. |
| `clearable` | `boolean` | `false` | Shows an × button to clear the selected time. |
| `round` | `false \| 0 \| 5 \| 10 \| 15 \| 20 \| 30 \| number[]` | `false` | Round to the nearest interval. `0` = nearest hour, `5`–`30` = nearest N minutes, `number[]` = snap to the nearest value in the list (e.g. `[0, 15, 30, 45]`). |
| `compact` | `boolean` | `false` | Compact size — `h-8`. Mutually exclusive with `small`. |
| `small` | `boolean` | `false` | Small size — `h-6`. Mutually exclusive with `compact`. |
| `class` | `string` | — | Additional CSS classes for the trigger element. |

## Related Components

| Component | Description |
|-----------|-------------|
| `TimePickerBody` | Time spinner body without a trigger or overlay. |
| `TimePopover` | Anchored popover around `TimePickerBody` with a full-width confirmation footer. |
| `TimePicker` | Form control that uses `TimePopover` internally. |

## Behavior

- Desktop pointer devices open the library popover.
- Coarse pointer devices use the hidden native `<input type="time">`.
- Popovers close on outside click and Escape.
- Confirmation is explicit through the full-width footer button.
- The default confirmation label is `OK`; pass `confirmLabel` to localize it.
- `onconfirm` on `TimePopover` may be async; the footer shows loading while pending.
- A null popover value defaults to `00:00` or `00:00:00`, so midnight can be confirmed without editing.
- `TimePickerBody` keeps visual labels hidden and exposes `Hours`, `Minutes`, and `Seconds` through accessible labels.

---

## Usage

```sveltehtml
<!-- Basic -->
<TimePicker bind:value clearable/>

<!-- With seconds -->
<TimePicker bind:value seconds clearable/>

<!-- Sizes -->
<TimePicker bind:value compact/>
<TimePicker bind:value small/>

<!-- Disabled -->
<TimePicker value="09:00" disabled/>

<!-- Rounding -->
<TimePicker bind:value round={0}/>       <!-- nearest hour: 09:23 → 09:00 -->
<TimePicker bind:value round={10}/>      <!-- nearest 10 min: 09:23 → 09:20 -->
<TimePicker bind:value round={15}/>      <!-- nearest 15 min: 09:07 → 09:15 -->
<TimePicker bind:value round={30}/>      <!-- nearest 30 min -->

<!-- Snap to list: nearest of 0, 15, 30, 45 -->
<TimePicker bind:value round={[0, 15, 30, 45]}/>

<!-- Custom list: 10, 30, 50 minutes -->
<TimePicker bind:value round={[10, 30, 50]}/>
```

### Action popover

```sveltehtml
<TimePopover value={time} round={5} confirmLabel="Mentés" onconfirm={saveTime}>
  {#snippet trigger(open, isOpen)}
    <Button secondary outline label="Choose time" onclick={open} aria-expanded={isOpen} />
  {/snippet}
</TimePopover>
```
