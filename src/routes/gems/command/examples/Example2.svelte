<script lang="ts">
	import {Button, getModalManager, getToastManager} from "$lib";
	import {CommandPalette, type CommandItem} from "$lib/gems/command";
	import {Bell, FileSearch, Moon, Sun, Trash} from "lucide-svelte";

	const modal = getModalManager();
	const toast = getToastManager();

	const items: CommandItem[] = [
		{
			id: 'notify', label: 'Send Notification', group: 'Actions',
			icon: Bell,
			keywords: ['alert', 'message'],
			onSelect: () => { modal.close(); toast.show('Notification sent!', {type: 'success'}); },
		},
		{
			id: 'delete', label: 'Delete Selected', group: 'Actions',
			icon: Trash,
			onSelect: () => { modal.close(); toast.show('Deleted!', {type: 'error'}); },
		},
		{
			id: 'dark', label: 'Switch to Dark Mode', group: 'Appearance',
			icon: Moon,
			onSelect: () => { modal.close(); toast.show('Dark mode enabled'); },
		},
		{
			id: 'light', label: 'Switch to Light Mode', group: 'Appearance',
			icon: Sun,
			onSelect: () => { modal.close(); toast.show('Light mode enabled'); },
		},
	];

	function open() {
		modal.open(CommandPalette, { items, placeholder: 'Type a command...' });
	}
</script>

<div class="flex flex-col gap-3">
	<p class="text-sm text-muted-contrast">These commands are also registered globally — press <strong>⌘K</strong> to access them from anywhere.</p>
	<Button label="Open Command Palette" onclick={open}/>
</div>
