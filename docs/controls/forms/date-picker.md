# DatePicker

A single-date form control built on reusable date picker body and popover layers. Supports min/max bounds, disabled dates, custom weekday start, async popover confirmation, and a clearable option.

## Import

```ts
import { DatePicker, DatePickerBody, DatePopover } from '@atom-forge/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | `null` | Bindable selected date. |
| `format` | `(date: Date) => string` | en-US short | Custom date formatter. |
| `placeholder` | `string` | `'Select date'` | Text shown when no date is selected. |
| `disabled` | `boolean` | `false` | Disables the picker. |
| `clearable` | `boolean` | `false` | Shows an × button to clear the selection. |
| `min` | `Date` | — | Earliest selectable date (inclusive). |
| `max` | `Date` | — | Latest selectable date (inclusive). |
| `weekStart` | `0 \| 1` | `1` | First day of the week. `0` = Sunday, `1` = Monday. |
| `disabledDates` | `Date[]` | — | Specific dates to disable. |
| `disabledDays` | `number[]` | — | Days of the week to disable. `[0, 6]` disables weekends. |
| `compact` | `boolean` | — | Compact size — `h-8`. Mutually exclusive with `small`. |
| `small` | `boolean` | — | Small size — `h-6`. Mutually exclusive with `compact`. |
| `class` | `string` | — | Additional CSS classes for the trigger element. |

## Related Components

| Component | Description |
|-----------|-------------|
| `DatePickerBody` | Calendar body without a trigger or overlay. |
| `DatePopover` | Anchored popover around `DatePickerBody` with a full-width confirmation footer. |
| `DatePicker` | Form control that uses `DatePopover` internally. |

## Popover Behavior

- Popovers close on outside click and Escape.
- Confirmation is explicit through the full-width footer button.
- The default confirmation label is `OK`; pass `confirmLabel` to localize it.
- `onconfirm` may be async; the footer shows loading while pending.

## Usage

```sveltehtml
<DatePicker bind:value={myDate} clearable />
```

### With constraints

```sveltehtml
<script lang="ts">
  const today = new Date();
</script>

<DatePicker bind:value={date} min={today} disabledDays={[0, 6]} />
```

### Custom format

```sveltehtml
<DatePicker bind:value={date} format={d => d.toLocaleDateString('en-GB')} />
```

### Action popover

```sveltehtml
<DatePopover value={date} confirmLabel="Save" onconfirm={saveDate}>
  {#snippet trigger(open, isOpen)}
    <Button secondary outline label="Choose date" onclick={open} aria-expanded={isOpen} />
  {/snippet}
</DatePopover>
```

## When to use

Use for a nullable local calendar date with a desktop calendar and native touch picker.

## Alternatives

Use [DateTimePicker](date-time-picker.md) for a local date plus time or [TimePicker](time-picker.md) for a time-only string. Use DatePickerBody for an inline calendar without popup context.

## Setup and behavior

Render DatePicker and DatePopover below `Root` for popup context, including on touch devices. Bind `Date | null`. Desktop selection is a draft until OK; cancelling does not commit it. Coarse-pointer native input writes immediately and does not use the confirmation callback flow. Calendar constraints restrict available days, but do not validate externally assigned values. The native input gets min/max only, not disabledDates or disabledDays. Dates use local calendar fields; formatting does not change storage or timezone.
