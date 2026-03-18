<script lang="ts">
    import Carousel from '$lib/gems/carousel/Carousel.svelte';
    import CarouselIndicator from '$lib/gems/carousel/CarouselIndicator.svelte';
    import Button from '$lib/gems/button/Button.svelte';

    const slides = [
        { id: 1, title: 'Design Tokens',    desc: 'Consistent visual language across all components.' },
        { id: 2, title: 'Svelte 5 Runes',   desc: 'Reactive state with zero boilerplate.' },
        { id: 3, title: 'Tailwind CSS',      desc: 'Utility-first styling, fully customisable.' },
        { id: 4, title: 'Accessibility',     desc: 'ARIA roles and keyboard navigation built in.' },
    ];

    let currentIndex = $state(0);
    let carousel: { prev(): void; next(): void; goTo(i: number): void } | undefined;
</script>

<div class="space-y-3">
    <Carousel bind:this={carousel} items={slides} bind:currentIndex loop class="rounded-xl">
        {#snippet children(slide)}
            {@const s = slide.item}
            <div class="h-52 flex flex-col items-center justify-center gap-2 bg-surface rounded-xl px-8 text-center">
                <p class="text-lg font-semibold text-canvas-contrast">{s.title}</p>
                <p class="text-sm text-muted-contrast">{s.desc}</p>
            </div>
        {/snippet}
    </Carousel>

    <div class="flex items-center justify-between px-1">
        <Button compact ghost onclick={() => carousel?.prev()}>← Prev</Button>
        <CarouselIndicator total={slides.length} bind:currentIndex />
        <Button compact ghost onclick={() => carousel?.next()}>Next →</Button>
    </div>
</div>
