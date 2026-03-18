<script lang="ts">
	import {goto} from "$app/navigation";
	// import {getModalManager} from "$lib";
	// import {CommandPalette, globalCommands, type CommandItem} from "$lib/gems/command";
	import {ALL_GEMS, type NavItem} from "./nav.svelte";
	import {type CommandItem, CommandPalette, getModalManager} from "$lib";
	// ...existing code...

	const modalManager = getModalManager()

	const gemCommands: CommandItem[] = ALL_GEMS.map((g: NavItem) => ({
		id: g.value,
		label: g.label,
		description: g.description,
		group: g.group,
		icon: g.icon,
		keywords: g.keywords,
		onSelect: () => goto(g.value),
	}));

	function onKeydown(e: KeyboardEvent) {
		// if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
		// 	e.preventDefault();
		// 	gemSelect?.open();
		// }
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			modalManager.open(CommandPalette, {
				items: [...gemCommands],
				placeholder: 'Search commands...',
				close: () => modalManager.close()
			}, 'command-palette');
		}
	}
</script>

<svelte:window onkeydown={onKeydown}/>

