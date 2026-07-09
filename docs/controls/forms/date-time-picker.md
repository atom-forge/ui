# DateTimePicker

A combined date and time form control. It uses `DateTimePopover` internally and returns a local JavaScript `Date | null`.

## Import

```sveltehtml
import { DateTimePicker, DateTimePickerBody, DateTimePopover } from '@atom-forge/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | `null` | Bindable selected date and time. |
| `format` | `(date: Date) => string` | en-US date/time | Custom display formatter. |
| `placeholder` | `string` | `'Select date and time'` | Text shown when no value is selected. |
| `disabled` | `boolean` | `false` | Disables the picker. |
| `clearable` | `boolean` | `false` | Shows a clear button. |
| `min` | `Date` | — | Earliest selectable date (inclusive). |
| `max` | `Date` | — | Latest selectable date (inclusive). |
| `seconds` | `boolean` | `false` | Enables seconds in the selected time. |
| `round` | `false \| 0 \| 5 \| 10 \| 15 \| 20 \| 30 \| number[]` | `false` | Rounds or snaps minutes. |
| `compact` | `boolean` | `false` | Compact size. Mutually exclusive with `small`. |
| `small` | `boolean` | `false` | Small size. Mutually exclusive with `compact`. |
| `class` | `string` | — | Additional CSS classes for the trigger element. |

## Related Components

| Component | Description |
|-----------|-------------|
| `DateTimePickerBody` | Combined date and time body without a trigger or overlay. |
| `DateTimePopover` | Anchored popover around `DateTimePickerBody` with a full-width confirmation footer. |
| `DateTimePicker` | Form control that uses `DateTimePopover` internally. |

## Popover Behavior

- Popovers close on outside click and Escape.
- Confirmation is explicit through the full-width footer button.
- The default confirmation label is `OK`; pass `confirmLabel` to localize it.
- `onconfirm` may be async; the footer shows loading while pending.
- When a date is selected without changing the time, the time portion defaults to local midnight.

## Usage

```sveltehtml
<DateTimePicker bind:value={startsAt} min={new Date()} round={5} clearable />
```

### Action popover

```sveltehtml
<DateTimePopover value={startsAt} confirmLabel="Mentés" onconfirm={saveStartsAt}>
  {#snippet trigger(open, isOpen)}
    <Button secondary outline label="Choose date and time" onclick={open} aria-expanded={isOpen} />
  {/snippet}
</DateTimePopover>
```
