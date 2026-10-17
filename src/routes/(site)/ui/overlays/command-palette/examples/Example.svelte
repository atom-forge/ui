<script lang="ts">
	import { Button, CommandPalette, defineIcon, getModalManager, type CommandItem } from '@atom-forge/ui';
	import { FileText, Search, Save } from 'lucide-svelte';

	const modal = getModalManager();
	let selected = $state('No command selected');
	const items: CommandItem[] = [
		{ id: 'new', label: 'New document', group: 'Documents', description: 'Create a draft', icon: defineIcon(FileText), keywords: ['create', 'draft'], onSelect: (item) => selected = item.label },
		{ id: 'save', label: 'Save document', group: 'Documents', icon: defineIcon(Save), keywords: ['persist'], onSelect: (item) => selected = item.label },
		{ id: 'search', label: 'Search workspace', group: 'Workspace', icon: defineIcon(Search), onSelect: (item) => selected = item.label },
	];

	function open() {
		modal.open(CommandPalette, { items, close: () => modal.close() });
	}
</script>

<div class="w-full space-y-3">
	<Button icon={Search} label="Open command palette" onclick={open} />
	<p class="text-sm text-muted-contrast" aria-live="polite">{selected}</p>
</div>
