# Carousel

A horizontally scrollable slide container with scroll-snap, optional arrow navigation, and a companion `CarouselIndicator` for dot-based navigation. Both components sync through a shared `bind:currentIndex`.

## Components

- **`Carousel`** — scrollable slide container
- **`CarouselIndicator`** — dot indicator, synced via `bind:currentIndex`

## Carousel Props

| Prop           | Type                                      | Default | Description |
|----------------|-------------------------------------------|---------|-------------|
| `items`        | `T[]`                                     | `[]`    | Array of slide data passed to the `children` snippet. |
| `currentIndex` | `number` (bindable)                       | `0`     | Active slide index. |
| `showArrows`   | `boolean`                                 | `true`  | Show built-in prev/next arrow buttons. |
| `loop`         | `boolean`                                 | `false` | Wrap around from last slide to first. |
| `showcase`     | `number \| [number, number]`              | —       | Auto-advance delay in seconds. A tuple picks a random delay between the two values for each slide. |
| `children`     | `Snippet<[{ item: T; index: number }]>`   | —       | (Required) Renders each slide. |
| `class`        | `string`                                  | —       | Extra Tailwind classes on the root element. |

## Carousel Exported Methods

| Method          | Description |
|-----------------|-------------|
| `next()`        | Advance to next slide (respects `loop`). |
| `prev()`        | Go to previous slide (respects `loop`). |
| `goTo(index)`   | Jump to a specific slide index. |

## CarouselIndicator Props

| Prop           | Type                | Default | Description |
|----------------|---------------------|---------|-------------|
| `total`        | `number`            | `0`     | Number of dots — should match `items.length`. |
| `currentIndex` | `number` (bindable) | `0`     | Active dot index. |
| `class`        | `string`            | —       | Extra Tailwind classes on the container. |

## Usage

```sveltehtml
<script lang="ts">
    import { Carousel, CarouselIndicator } from '$lib/controls/display/carousel';

    const slides = [
        { id: 1, title: 'First' },
        { id: 2, title: 'Second' },
        { id: 3, title: 'Third' },
    ];

    let currentIndex = $state(0);
    let carousel: { prev(): void; next(): void; goTo(i: number): void };
</script>

<Carousel bind:this={carousel} items={slides} bind:currentIndex loop class="rounded-xl">
    {#snippet children(slide)}
        {@const s = slide.item}
        <div class="h-48 flex items-center justify-center bg-canvas">
            <p>{s.title}</p>
        </div>
    {/snippet}
</Carousel>

<CarouselIndicator total={slides.length} bind:currentIndex />
```

### Showcase Mode

Use `showcase` to automatically advance slides. The value represents how long each slide remains visible:

```sveltehtml
<Carousel items={slides} showcase={4}>
    {#snippet children(slide)}
        <!-- slide content -->
    {/snippet}
</Carousel>

<Carousel items={slides} showcase={[4, 6]}>
    {#snippet children(slide)}
        <!-- slide content -->
    {/snippet}
</Carousel>
```

When the carousel reaches the last slide, showcase mode advances back to the first slide. The timer restarts after manual navigation, indicator changes, or user scrolling.

## Behaviour

- **Scroll → index**: An `onscroll` handler (debounced 100 ms) computes the current slide from `scrollLeft` and updates `currentIndex`.
- **Index → scroll**: A `$effect` calls `scrollTo` whenever `currentIndex` changes externally (e.g. indicator click or `goTo()`). Manual scrolling is guarded by a `userScrolling` flag to prevent interference.
- **Showcase**: When `showcase` is set, a timeout advances `currentIndex` after the configured delay. `[min, max]` picks a new random delay for each slide.
- **Snap**: `snap-x snap-mandatory` with `snap-center` on each slide ensures pixel-perfect alignment after every scroll gesture.
