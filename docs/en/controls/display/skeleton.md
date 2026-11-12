# Skeleton

Decorative loading placeholders for shapes and text lines.

## Import

```ts
import { Skeleton } from '@atom-forge/ui';
```

## When to use

Use while content is loading when reserving its visual space improves layout continuity.

## Alternatives

Use the exported `Spinner` for indeterminate activity, or [ProgressBar](../forms/progress-bar.md) for measurable progress.

## Setup

Use the library CSS setup in [Getting Started](../../guides/getting-started.md). No provider is required. Give shape placeholders explicit dimensions through `class`.

## Minimal example

```sveltehtml
<script lang="ts">
  import { Skeleton } from '@atom-forge/ui';
</script>

<section aria-busy="true" aria-label="Loading profile">
  <Skeleton circle class="h-12 w-12"/>
  <Skeleton rect class="h-32 w-full"/>
  <Skeleton length={[100, 80, 60]} class="mt-3"/>
</section>
```

## Behavior

Each placeholder is `aria-hidden="true"`. Animation is enabled by default. Text lines are `h-4`, separated by `gap-2`, and their widths are percentages. `length={true}` gives one 100% line. `length={false}` does not create text lines and falls through to shape rendering.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `circle` | `true` | — | Circular shape. |
| `rect` | `true` | — | Rounded rectangular shape. |
| `length` | `boolean \| number \| number[]` | — | Text-line mode; numbers represent percentage widths. |
| `animated` | `boolean` | `true` | Enables shimmer class. |
| `icon` | `IconDefinition` | — | Centered icon in shape mode only. |
| `class` | Shared `ClassProp` | — | Dimensions/style; applied to the wrapper in line mode. |

The public props type uses XOR: choose exactly one mode (`circle`, `rect`, or `length`), rather than combining them.

## Limitations

No loading state, replacement content, status announcement, or fetch logic is provided. The application must remove placeholders when ready and provide accessible loading status. Width values are used directly without clamping. Shape mode has no intrinsic height or width.

Source: `src/lib/controls/display/skeleton/Skeleton.svelte` and `index.ts`.
