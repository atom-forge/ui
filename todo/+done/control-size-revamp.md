# Control Size — Reference

This document defines the canonical sizing scale for all interactive controls in atom-forge UI.
Each component implements sizing per-component with boolean props (`compact`, `small`). There is no CSS variable cascade system.

## Canonical Scale

| Size    | Height | Font          | When to use                          |
|---------|--------|---------------|--------------------------------------|
| normal  | `h-10` | `text-sm`     | Default — forms, toolbars            |
| compact | `h-8`  | `text-xs`     | Dense UIs — sidebars, data tables    |
| small   | `h-6`  | `text-xs`     | Inline controls, tight spaces        |
| micro   | `h-5`  | `text-[10px]` | Badges, minimal toolbar items        |

Padding is per-component (not part of the canonical scale).

## Component categories

### Height-based controls

These use fixed `h-*` to align on the same row as each other.

`Button`, `Input`, `Select`, `NativeSelect`, `DatePicker`, `TimePicker`

### Min-height controls (flexible)

These use `min-h-*` so they can expand when content wraps (e.g. multiple chips).
They align with the scale at single-line height.

`MultiSelect`, `TagEditor`

### Binary controls (self-sizing)

These don't use the height scale — their size is determined by the control element itself.

| Control    | Normal          | Compact         | Small             |
|------------|-----------------|-----------------|-------------------|
| `Checkbox` | `w-5 h-5`       | `w-4 h-4`       | `w-3.5 h-3.5`     |
| `Radio`    | `h-5 w-5`       | `h-4 w-4`       | `h-3 w-3`         |
| `Switch`   | track `w-11 h-6`| track `w-9 h-5` | track `w-7 h-4`   |

### Navigation / layout controls

These size their clickable areas to match the scale but don't accept `compact`/`small` props.

`Breadcrumb`, `Tabs`, `Accordion`

### Special controls

`CodeInput` — each character box is intentionally taller than the standard scale for readability:

| Size    | Box size  | Font      |
|---------|-----------|-----------|
| normal  | `w-10 h-12`| `text-base` |
| compact | `w-8 h-10` | `text-sm`   |
| small   | `w-6 h-8`  | `text-xs`   |

`Pagination` — square buttons follow the scale:

| Size    | Button     | Font      |
|---------|------------|-----------|
| normal  | `h-10 w-10`| `text-sm` |
| compact | `h-8 w-8`  | `text-xs` |
| small   | `h-6 w-6`  | `text-xs` |

## Usage

Pass boolean props directly to each component:

```svelte
<Input compact />
<Select compact />
<Button compact>Save</Button>
```

When all controls in a section need the same size, pass the prop to each explicitly.
This is intentionally verbose — it's explicit and easy to trace.

## What we intentionally do NOT have

- No `.size-compact` / `.size-small` CSS modifier classes
- No `--control-height` / `--control-icon-size` CSS variables
- No cascading size inheritance from parent to child controls

Cascading was considered and rejected: it adds CSS architecture complexity for a feature
(automatic form-wide size) that is rarely needed and easy to achieve by passing props explicitly.
