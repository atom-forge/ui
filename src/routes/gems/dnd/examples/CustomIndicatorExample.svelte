<script lang="ts">
    import SortableList from "$lib/gems/dnd/SortableList.svelte";

    type Item = { id: string; label: string; color: string };

    let items = $state<Item[]>([
        { id: "1", label: "Design system", color: "bg-violet-500" },
        { id: "2", label: "API integration", color: "bg-blue-500" },
        { id: "3", label: "User research", color: "bg-green-500" },
        { id: "4", label: "Performance audit", color: "bg-orange-500" },
        { id: "5", label: "Documentation", color: "bg-pink-500" },
    ]);
</script>

<SortableList bind:items class="flex flex-col gap-2">
    {#snippet item(it)}
        <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary border border-frame cursor-grab active:cursor-grabbing select-none">
            <span class="w-2 h-2 rounded-full shrink-0 {it.color}"></span>
            <span class="text-sm text-canvas-contrast">{it.label}</span>
        </div>
    {/snippet}
    {#snippet dropIndicator(dragged)}
        {@const color = dragged?.color ?? 'bg-accent'}
        {@const label = dragged?.label ?? 'Drop here'}
        <div class="flex items-center gap-2 px-2 border-frame border-1 rounded-lg p-2 opacity-50">
            <div class="h-2 w-2 rounded-full {color}"></div>
            <div class="text-xs">{label}</div>
        </div>
    {/snippet}
</SortableList>

