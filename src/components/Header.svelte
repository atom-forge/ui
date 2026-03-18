<script lang="ts">
	import { goto } from '$app/navigation';
	import { Atom, Button, getDrawerManager, getModalManager, getThemeManager, Kbd, Switch } from '$lib';
	import { Menu, Moon, Search, Sun } from 'lucide-svelte';
	import { CommandPalette } from '$lib/gems/command';
	import { ALL_GEMS, type NavItem } from '../routes/nav.svelte';
	import { type CommandItem } from '$lib/gems/command';
	import MobileMenu from './MobileMenu.svelte';

	const themeManager = getThemeManager();
	const modalManager = getModalManager();
	const drawerManager = getDrawerManager();

	const gemCommands: CommandItem[] = ALL_GEMS.map((g: NavItem) => ({
		id: g.value,
		label: g.label,
		description: g.description,
		group: g.group,
		icon: g.icon,
		keywords: g.keywords,
		onSelect: () => goto(g.value)
	}));

	function openPalette() {
		modalManager.open(
			CommandPalette,
			{
				items: gemCommands,
				placeholder: 'Search components...',
				close: () => modalManager.close()
			},
			'command-palette'
		);
	}

	function openMobileMenu() {
		drawerManager.open(MobileMenu, {}, { position: 'right', size: 'sm' });
	}
</script>

<header class="flex items-center justify-between px-4 py-2 bg-canvas border-b border-frame shrink-0">
	<div class="flex items-center gap-4">
		<div
			role="none"
			class="flex items-center gap-1 h-12 overflow-hidden cursor-pointer"
			onclick={() => goto('/')}
		>
			<Atom />
			<span class="text-2xl text-canvas-contrast font-bold"
				><span class="font-extralight">Atom</span>Forge<span class="text-accent">UI</span></span
			>
		</div>
	</div>

	<div class="hidden md:flex items-center gap-2">
		<button
			onclick={openPalette}
			class="flex items-center gap-2 px-3 h-8 rounded-md border border-frame bg-surface text-muted-contrast text-xs hover:bg-secondary transition-colors cursor-pointer"
		>
			<Search size={14} />
			<span>Search</span>
			<Kbd keys={['⌘', 'K']} class="ml-1" />
		</button>
		<Button ghost small label="Privacy Policy" onclick={() => goto('/privacy-policy')} />
		<Button ghost small label="Licensing" onclick={() => goto('/licensing')} />
		<Switch bind:value={themeManager.dark} icons={{ on: Moon, off: Sun }} class="ml-2" />
	</div>

	<div class="md:hidden">
		<Button icon={Menu} onclick={openMobileMenu} ghost />
	</div>
</header>
