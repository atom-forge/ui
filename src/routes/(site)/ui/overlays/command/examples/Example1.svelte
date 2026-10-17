<script lang="ts">
	import {Button, getModalManager, getToastManager} from "@atom-forge/ui";
	import {CommandPalette, type CommandItem} from '@atom-forge/ui';
	import {
		Book, Palette, LayoutDashboard, Settings, User
	} from "lucide-svelte";

	const modal = getModalManager();
    const toast = getToastManager();

	const items: CommandItem[] = [
		{
			id: 'dashboard', label: 'Go to Dashboard', group: 'Navigation',
			icon: LayoutDashboard,
			description: 'Navigate to the main dashboard',
			onSelect: (item) => { toast.show(`Selected ${item.label}`); },
		},
		{
			id: 'profile', label: 'Edit Profile', group: 'Navigation',
			icon: User,
			description: 'Update your account details',
			onSelect: (item) => { toast.show(`Selected ${item.label}`); },
		},
		{
			id: 'settings', label: 'Open Settings', group: 'Navigation',
			icon: Settings,
			description: 'App preferences and configuration',
			keywords: ['preferences', 'config', 'options'],
			onSelect: (item) => { toast.show(`Selected ${item.label}`); },
		},
		{
			id: 'theme', label: 'Change Theme', group: 'Actions',
			icon: Palette,
			description: 'Switch between light and dark mode',
			keywords: ['dark', 'light', 'appearance'],
			onSelect: (item) => { toast.show(`Selected ${item.label}`); },
		},
		{
			id: 'docs', label: 'Open Documentation', group: 'Actions',
			icon: Book,
			description: 'Browse the component library docs',
			keywords: ['help', 'guide', 'readme'],
			onSelect: (item) => { toast.show(`Selected ${item.label}`); },
		},
	];

	function open() {
		modal.open(CommandPalette, { items, close: () => modal.close(), placeholder: 'Search commands...' });
	}
</script>

<Button label="Open Command Palette" onclick={open}/>
