<script lang="ts">
    import SortableList from "$lib/gems/dnd/SortableList.svelte";
    import SortableGroup from "$lib/gems/dnd/SortableGroup.svelte";

    type Task = { id: string; title: string; type: "task" | "bug" };

    let backlog = $state<Task[]>([
        { id: "b1", title: "Design new logo", type: "task" },
        { id: "b2", title: "Fix login bug", type: "bug" },
        { id: "b3", title: "Refactor API", type: "task" },
    ]);
    let todo = $state<Task[]>([
        { id: "t1", title: "Write tests", type: "task" },
    ]);
    let done = $state<Task[]>([
        { id: "d1", title: "Setup project", type: "task" },
    ]);

    const boardRules = {
        todo: { accepts: ["task"] },
        done: { accepts: true },
        backlog: { accepts: true },
    };
</script>

<SortableGroup rules={boardRules} class="flex gap-4 items-stretch">
    <div
        class="flex-1 flex flex-col gap-2 p-2 bg-surface rounded-lg border border-frame min-h-32"
    >
        <h3
            class="font-semibold text-sm px-1 text-muted-contrast uppercase tracking-wide"
        >
            Backlog
        </h3>
        <SortableList id="backlog" bind:items={backlog} class="flex-1 gap-2">
            {#snippet item(task)}
                <div
                    class="px-3 py-2 rounded-lg bg-secondary text-canvas-contrast text-sm cursor-grab active:cursor-grabbing select-none border border-frame flex items-center gap-2"
                >
                    {#if task.type === "bug"}
                        <span class="w-2 h-2 rounded-full bg-green-500 shrink-0"
                        ></span>
                    {:else}
                        <span class="w-2 h-2 rounded-full bg-accent shrink-0"
                        ></span>
                    {/if}
                    {task.title}
                </div>
            {/snippet}
        </SortableList>
    </div>

    <div
        class="flex-1 flex flex-col gap-2 p-2 bg-surface rounded-lg border border-frame min-h-32"
    >
        <h3
            class="font-semibold text-sm px-1 text-muted-contrast uppercase tracking-wide"
        >
            To Do <span class="text-xs">(task only)</span>
        </h3>
        <SortableList id="todo" bind:items={todo} class="flex-1 gap-2">
            {#snippet item(task)}
                <div
                    class="px-3 py-2 rounded-lg bg-secondary text-canvas-contrast text-sm cursor-grab active:cursor-grabbing select-none border border-frame flex items-center gap-2"
                >
                    <span class="w-2 h-2 rounded-full bg-accent shrink-0"
                    ></span>
                    {task.title}
                </div>
            {/snippet}
        </SortableList>
    </div>

    <div
        class="flex-1 flex flex-col gap-2 p-2 bg-surface rounded-lg border border-frame min-h-32"
    >
        <h3
            class="font-semibold text-sm px-1 text-muted-contrast uppercase tracking-wide"
        >
            Done
        </h3>
        <SortableList id="done" bind:items={done} class="flex-1 gap-2">
            {#snippet item(task)}
                <div
                    class="px-3 py-2 rounded-lg bg-secondary text-canvas-contrast text-sm cursor-grab active:cursor-grabbing select-none border border-frame flex items-center gap-2 line-through text-muted-contrast"
                >
                    <span class="w-2 h-2 rounded-full bg-secondary-c/30 shrink-0"
                    ></span>
                    {task.title}
                </div>
            {/snippet}
        </SortableList>
    </div>
</SortableGroup>
