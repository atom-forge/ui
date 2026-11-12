# ProgressBar

A horizontal progress indicator with an accent fill, striped texture, and smooth width transition.

## Import

```ts
import { ProgressBar } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current progress value. |
| `max` | `number` | `100` | Maximum value. Percentage = `value / max * 100`. |
| `compact` | `boolean` | — | Medium track height (`h-2.5`). Mutually exclusive with `small`. |
| `small` | `boolean` | — | Thin track height (`h-1.5`). Mutually exclusive with `compact`. |
| `class` | `string` | — | Extra Tailwind classes on the track, merged via `twMerge`. |

---

## Sizes

| Size | Track height |
|------|-------------|
| normal | `h-4` |
| `compact` | `h-2.5` |
| `small` | `h-1.5` |

---

## Usage

```sveltehtml
<ProgressBar value={65}/>
<ProgressBar value={3} max={10}/>
<ProgressBar value={40} compact/>
<ProgressBar value={80} small/>

<!-- Animated -->
<script lang="ts">
  import { onMount } from 'svelte';
  let progress = $state(0);
  onMount(() => {
    const timer = setInterval(() => { if (progress < 100) progress++ }, 50);
    return () => clearInterval(timer);
  });
</script>
<ProgressBar value={progress} />
```

## When to use

Use for read-only determinate progress against a known maximum.

## Alternatives

Use [ProgressRing](../data/progress-ring.md) for compact circular progress, [MeterGroup](../data/meter-group.md) for contributions, or [Slider](slider.md) for user input.

## Setup and behavior

Percentage is `value / max * 100` when `max > 0`, otherwise zero. Values are not clamped; validate the range in the caller. There is no indeterminate mode, binding, or completion event. The root uses `role="none"` and only a percentage title, not progressbar ARIA semantics; provide accessible progress text separately. Size and wrapper classes are captured at initialization.
