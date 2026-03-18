<script lang="ts">
    import SortableList from "$lib/gems/dnd/SortableList.svelte";
    import SortableGroup from "$lib/gems/dnd/SortableGroup.svelte";
    import { Inbox, CircleCheck, Archive } from "lucide-svelte";

    type Task = { id: string; title: string };

    let todo = $state<Task[]>([
        { id: "t1", title: "Write tests" },
        { id: "t2", title: "Fix login bug" },
        { id: "t3", title: "Update dependencies" },
    ]);

    let done = $state<Task[]>([]);
    let archived = $state<Task[]>([]);
</script>

<SortableGroup class="flex gap-4 items-start">
    <div class="flex-1 flex flex-col gap-2">
        <p class="text-xs font-semibold text-muted-contrast uppercase tracking-wide px-1">To Do</p>
        <div class="rounded-lg border border-frame bg-surface overflow-hidden">
            <SortableList
                id="todo"
                bind:items={todo}
                class="flex flex-col gap-2 p-2 min-h-24"
                empty={{ icon: Inbox, title: "No tasks", description: "Drag tasks here or drop from another column." }}
            >
                {#snippet item(task)}
                    <div class="px-3 py-2 rounded-md bg-secondary border border-frame text-sm text-canvas-contrast cursor-grab active:cursor-grabbing select-none">
                        {task.title}
                    </div>
                {/snippet}
            </SortableList>
        </div>
    </div>

    <div class="flex-1 flex flex-col gap-2">
        <p class="text-xs font-semibold text-muted-contrast uppercase tracking-wide px-1">Done</p>
        <div class="rounded-lg border border-frame bg-surface overflow-hidden">
            <SortableList
                id="done"
                bind:items={done}
                class="flex flex-col gap-2 p-2 min-h-24"
                empty={{ icon: CircleCheck, title: "Nothing done yet", description: "Drop completed tasks here." }}
            >
                {#snippet item(task)}
                    <div class="px-3 py-2 rounded-md bg-secondary border border-frame text-sm text-canvas-contrast line-through text-muted-contrast cursor-grab active:cursor-grabbing select-none">
                        {task.title}
                    </div>
                {/snippet}
            </SortableList>
        </div>
    </div>

    <div class="flex-1 flex flex-col gap-2">
        <p class="text-xs font-semibold text-muted-contrast uppercase tracking-wide px-1">Archived</p>
        <div class="rounded-lg border border-frame bg-surface overflow-hidden">
            <SortableList
                id="archived"
                bind:items={archived}
                class="flex flex-col gap-2 p-2 min-h-24"
                empty={{ icon: Archive, title: "Archive is empty", description: "Move tasks here to archive them." }}
            >
                {#snippet item(task)}
                    <div class="px-3 py-2 rounded-md bg-secondary border border-frame text-sm text-muted-contrast cursor-grab active:cursor-grabbing select-none opacity-60">
                        {task.title}
                    </div>
                {/snippet}
            </SortableList>
        </div>
    </div>
</SortableGroup>

