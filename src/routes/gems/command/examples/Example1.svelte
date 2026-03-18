<script lang="ts">
	import {Button, getModalManager} from "$lib";
	import {CommandPalette, type CommandItem} from "$lib/gems/command";
	import {
		Book, Palette, LayoutDashboard, Settings, User
	} from "lucide-svelte";

	const modal = getModalManager();

	const items: CommandItem[] = [
		{
			id: 'dashboard', label: 'Go to Dashboard', group: 'Navigation',
			icon: LayoutDashboard,
			description: 'Navigate to the main dashboard',
			onSelect: () => modal.close(),
		},
		{
			id: 'profile', label: 'Edit Profile', group: 'Navigation',
			icon: User,
			description: 'Update your account details',
			onSelect: () => modal.close(),
		},
		{
			id: 'settings', label: 'Open Settings', group: 'Navigation',
			icon: Settings,
			description: 'App preferences and configuration',
			keywords: ['preferences', 'config', 'options'],
			onSelect: () => modal.close(),
		},
		{
			id: 'theme', label: 'Change Theme', group: 'Actions',
			icon: Palette,
			description: 'Switch between light and dark mode',
			keywords: ['dark', 'light', 'appearance'],
			onSelect: () => modal.close(),
		},
		{
			id: 'docs', label: 'Open Documentation', group: 'Actions',
			icon: Book,
			description: 'Browse the component library docs',
			keywords: ['help', 'guide', 'readme'],
			onSelect: () => modal.close(),
		},
	];

	function open() {
		modal.open(CommandPalette, { items, placeholder: 'Search commands...' });
	}
</script>

<Button label="Open Command Palette" onclick={open}/>
