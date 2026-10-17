<script lang="ts">
    import {Carousel} from '@atom-forge/ui';

    const slides = [
        { id: 1, color: 'bg-accent/20',         label: 'Slide 1' },
        { id: 2, color: 'bg-secondary',       label: 'Slide 2' },
        { id: 3, color: 'bg-muted',        label: 'Slide 3' },
        { id: 4, color: 'bg-surface',      label: 'Slide 4' },
    ];
</script>

<Carousel items={slides} class="rounded-xl">
    {#snippet children(slide)}
        {@const s = slide.item}
        <div class="h-48 flex items-center justify-center {s.color} rounded-xl">
            <span class="text-2xl font-semibold text-canvas-contrast">{s.label}</span>
        </div>
    {/snippet}
</Carousel>
