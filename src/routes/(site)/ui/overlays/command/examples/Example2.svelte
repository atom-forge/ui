<script lang="ts">
	import {Button, getModalManager, getToastManager} from "@atom-forge/ui";
	import {CommandPalette, type CommandItem} from '@atom-forge/ui';
	import {Bell, FileSearch, Moon, Sun, Trash} from "lucide-svelte";

	const modal = getModalManager();
	const toast = getToastManager();

	const items: CommandItem[] = [
		{
			id: 'notify', label: 'Send Notification', group: 'Actions',
			icon: Bell,
			keywords: ['alert', 'message'],
			onSelect: () => { toast.show('Notification sent!', {type: 'success'}); },
		},
		{
			id: 'delete', label: 'Delete Selected', group: 'Actions',
			icon: Trash,
			onSelect: () => { toast.show('Deleted!', {type: 'error'}); },
		},
		{
			id: 'dark', label: 'Switch to Dark Mode', group: 'Appearance',
			icon: Moon,
			onSelect: () => { toast.show('Dark mode enabled'); },
		},
		{
			id: 'light', label: 'Switch to Light Mode', group: 'Appearance',
			icon: Sun,
			onSelect: () => { toast.show('Light mode enabled'); },
		},
	];

	function open() {
		modal.open(CommandPalette, { items, close: () => modal.close(), placeholder: 'Type a command...' });
	}
</script>

<div class="flex flex-col gap-3">
	<p class="text-sm text-muted-contrast">These commands show toast feedback when selected. Global keyboard shortcuts must be registered by your application.</p>
	<Button label="Open Command Palette" onclick={open}/>
</div>
