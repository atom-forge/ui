<script lang="ts">
    import Carousel from '$lib/gems/carousel/Carousel.svelte';
    import CarouselIndicator from '$lib/gems/carousel/CarouselIndicator.svelte';

    const slides = [
        { id: 1, color: 'bg-accent/20',         label: 'Slide 1' },
        { id: 2, color: 'bg-green-500/20',       label: 'Slide 2' },
        { id: 3, color: 'bg-blue-500/20',        label: 'Slide 3' },
        { id: 4, color: 'bg-purple-500/20',      label: 'Slide 4' },
    ];

    let currentIndex = $state(0);
</script>

<div class="space-y-3">
    <Carousel items={slides} bind:currentIndex showArrows={false} class="rounded-xl">
        {#snippet children(slide)}
            {@const s = slide.item}
            <div class="h-48 flex items-center justify-center {s.color} rounded-xl">
                <span class="text-2xl font-semibold text-canvas-contrast">{s.label}</span>
            </div>
        {/snippet}
    </Carousel>
    <CarouselIndicator total={slides.length} bind:currentIndex />
</div>
