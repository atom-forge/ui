<script lang="ts">
    import { DropIndicator, DropSlot } from '@atom-forge/ui';

    let insertIndex = $state(0);
</script>

<div class="space-y-3">
    <label class="flex items-center gap-2">
        <input type="checkbox" checked={insertIndex === 0} onchange={(event) => { insertIndex = event.currentTarget.checked ? 0 : -1; }} />
        Show active slot
    </label>
    <div class="flex flex-col">
        <div class="rounded-lg border border-frame p-3">Before</div>
        <DropSlot atIndex={0} {insertIndex} draggingItem={{ id: 'demo', title: 'Preview' }} orientation="vertical" />
        <div class="rounded-lg border border-frame p-3">After</div>
    </div>
    <div class="flex flex-col">
        <DropIndicator active listId="standalone-indicator" />
    </div>
</div>
