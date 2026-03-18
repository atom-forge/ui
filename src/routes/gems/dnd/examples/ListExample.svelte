<script lang="ts">
    import SortableList from "$lib/gems/dnd/SortableList.svelte";

    let items = $state([
        { id: "1", title: "Design system tokens" },
        { id: "2", title: "Implement SortableList" },
        { id: "3", title: "Write documentation" },
        { id: "4", title: "Add unit tests" },
        { id: "5", title: "Publish to npm" },
    ]);
</script>

<SortableList bind:items id="list-example" class="gap-2">
    {#snippet item(task)}
        <div
            class="px-3 py-2 rounded-lg bg-secondary text-canvas-contrast text-sm cursor-grab active:cursor-grabbing select-none border border-frame"
        >
            {task.title}
        </div>
    {/snippet}
</SortableList>
