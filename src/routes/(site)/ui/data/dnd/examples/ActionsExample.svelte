<script lang="ts">
    import { dnd, type DraggableOptions, type DropTargetOptions } from '@atom-forge/ui';

    let hovering = $state(false);
    let result = $state('Drag the card into the target.');
    const draggableOptions: DraggableOptions = {
        data: { kind: 'audit-card', label: 'Custom card' },
        dragHandleSelector: '[data-action-handle]',
    };
    const targetOptions: DropTargetOptions = {
        getData: () => ({ kind: 'audit-target' }),
        canDrop: ({ source }) => source.data.kind === 'audit-card',
        onDragEnter: () => { hovering = true; },
        onDragLeave: () => { hovering = false; },
        onDrop: ({ source }) => {
            hovering = false;
            result = `Received: ${String(source.data.label)}`;
        },
    };
</script>

<div class="flex flex-wrap gap-4">
    <div use:dnd.draggable={draggableOptions} class="rounded-lg border border-frame bg-secondary p-4">
        <button type="button" data-action-handle class="cursor-grab">Drag custom card</button>
    </div>
    <div use:dnd.dropTarget={targetOptions} class={`min-h-24 min-w-48 rounded-lg border border-frame p-4 ${hovering ? "bg-accent/10" : ""}`}>
        <p aria-live="polite">{result}</p>
    </div>
</div>
