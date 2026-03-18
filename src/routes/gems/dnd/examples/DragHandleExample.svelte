<script lang="ts">
    import SortableList from "$lib/gems/dnd/SortableList.svelte";
    import { GripVertical } from "lucide-svelte";

    let items = $state([
        { id: "1", title: "Design system tokens" },
        { id: "2", title: "Implement SortableList" },
        { id: "3", title: "Write documentation" },
        { id: "4", title: "Add unit tests" },
        { id: "5", title: "Publish to npm" },
    ]);
</script>

<SortableList bind:items id="drag-handle-example" class="gap-2" dragHandleSelector="[data-drag-handle]">
    {#snippet item(task)}
        <div class="flex items-center gap-2 px-2 py-2 rounded-lg bg-secondary text-canvas-contrast text-sm border border-frame">
            <div data-drag-handle class="cursor-grab active:cursor-grabbing text-muted-contrast hover:text-canvas-contrast transition-colors">
                <GripVertical size={16} />
            </div>
            {task.title}
        </div>
    {/snippet}
</SortableList>
