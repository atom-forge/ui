<script lang="ts">
    import SortableList from "$lib/gems/dnd/SortableList.svelte";

    let steps = $state([
        { id: "1", label: "Tervezés" },
        { id: "2", label: "Fejlesztés" },
        { id: "3", label: "Tesztelés" },
        { id: "4", label: "Review" },
        { id: "5", label: "Deploy" },
    ]);
</script>

<SortableList
    bind:items={steps}
    id="horizontal-example"
    orientation="horizontal"
    class="items-center gap-2"
>
    {#snippet item(step)}
        <div
            class="px-4 py-2 rounded-lg bg-secondary text-canvas-contrast text-sm cursor-grab active:cursor-grabbing select-none border border-frame whitespace-nowrap shrink-0"
        >
            {step.label}
        </div>
    {/snippet}
</SortableList>
