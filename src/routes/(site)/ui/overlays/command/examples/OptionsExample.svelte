<script lang="ts">
    import { Button, CommandPalette, getModalManager, getToastManager, type CommandItem } from '@atom-forge/ui';

    const modal = getModalManager();
    const toast = getToastManager();
    const items: CommandItem[] = [
        { id: 'save', label: 'Save draft', group: 'Document', onSelect: () => { toast.show('Draft saved', { type: 'success' }); } },
        { id: 'review', label: 'Request review', group: 'Document', onSelect: () => { toast.show('Review requested'); } },
    ];
    function open() {
        modal.open(CommandPalette, {
            items,
            option: commandOption,
            close: () => modal.close(),
        }, { key: 'audit-command-options', closable: true });
    }
</script>

{#snippet commandOption(command: CommandItem, highlighted: boolean)}
    <div class={`flex items-center justify-between gap-4 rounded-md px-3 py-2 ${highlighted ? 'bg-accent/10 text-accent' : ''}`}>
        <span>{command.label}</span>
        <span class="text-xs text-muted-contrast">{command.group}</span>
    </div>
{/snippet}

<Button label="Open singleton palette" onclick={open} />
