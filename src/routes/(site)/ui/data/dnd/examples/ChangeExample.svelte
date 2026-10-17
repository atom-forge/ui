<script lang="ts">
    import { SortableList } from '@atom-forge/ui';

    type Task = { id: string; title: string };
    let items = $state<Task[]>([
        { id: 'change-1', title: 'Design' },
        { id: 'change-2', title: 'Implement' },
        { id: 'change-3', title: 'Review' },
    ]);
    let result = $state('Reorder an item with the pointer, or focus it and press Space, arrows, then Space.');
</script>

<div class="space-y-3">
    <SortableList bind:items id="change-example" class="gap-2"
        flipDurationMs={200} draggingClass="opacity-40" dropIndicatorClass="ring-2 ring-accent rounded-lg"
        onchange={(_, detail) => {
            result = `${detail.item?.title ?? detail.itemId}: ${detail.fromIndex} → ${detail.toIndex} (${detail.source}, ${detail.trigger})`;
        }}
    >
        {#snippet item(task: Task)}
            <div class="rounded-lg border border-frame bg-secondary px-3 py-2">{task.title}</div>
        {/snippet}
    </SortableList>
    <p aria-live="polite" class="text-sm text-muted-contrast">{result}</p>
</div>
