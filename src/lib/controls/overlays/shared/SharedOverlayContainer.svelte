<script lang="ts">
	import {fade} from 'svelte/transition';
	import Drawer from '../drawer/Drawer.svelte';
	import type {DrawerOptions} from '../drawer/drawer-manager.svelte';
	import {getOverlayStackManager, overlayZIndex, type OverlayState} from './overlay-manager.svelte';

	const manager = getOverlayStackManager();

	function handleBackdropClick(e: MouseEvent, item: OverlayState) {
		if (e.target === e.currentTarget) {
			manager.closeItemIfTopmost(item);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			manager.closeTopmostIfClosable();
		}
	}

	function modalDistanceFromTop(item: OverlayState) {
		const modals = manager.items.filter(overlay => overlay.kind === 'modal');
		return modals.length - modals.findIndex(overlay => overlay.id === item.id);
	}

	function drawerOptions(item: OverlayState) {
		return item.options as DrawerOptions;
	}
</script>

<svelte:window onkeydown={handleKeydown}/>

{#if manager.items.length > 0}
	<div
		role="none"
		class="fixed inset-0 pointer-events-none overlay-backdrop"
		style:z-index={overlayZIndex(manager.items.length - 1) - 1}
		transition:fade={{duration: 150}}
	></div>
{/if}

{#each manager.items.filter(item => item.kind === 'modal') as item (item.id)}
	{@const Component = item.component}
	{@const distance = modalDistanceFromTop(item)}
	<div
		role="none"
		class="fixed inset-0 bg-transparent flex flex-row items-center justify-center"
		style:z-index={overlayZIndex(manager.items.indexOf(item))}
		onwheel={(e) => { if (e.target === e.currentTarget) e.preventDefault(); }}
		ontouchmove={(e) => { if (e.target === e.currentTarget) e.preventDefault(); }}
		onclick={(e) => handleBackdropClick(e, item)}
		ondblclick={e => e.preventDefault()}
		transition:fade={{duration: 150}}
	>
		<div
			class="transition-all duration-300"
			class:translate-y-10={distance === 2}
			class:translate-y-16={distance === 3}
			class:translate-y-20={distance === 4}
			class:translate-y-22={distance > 4}
			class:scale-95={distance === 2}
			class:scale-90={distance === 3}
			class:scale-85={distance === 4}
			class:scale-80={distance > 4}
			class:opacity-0={distance > 4}
			class:brightness-75={distance !== 1}
			class:blur-[2px]={distance !== 1}
			class:hidden={distance > 4}
		>
			<Component {...item.props}/>
		</div>
	</div>
{/each}

{#each manager.items.filter(item => item.kind === 'drawer') as item (item.id)}
	{@const Component = item.component}
	{@const options = drawerOptions(item)}
	<div
		role="none"
		class="fixed inset-0 bg-transparent"
		style:z-index={overlayZIndex(manager.items.indexOf(item))}
		onwheel={(e) => { if (e.target === e.currentTarget) e.preventDefault(); }}
		ontouchmove={(e) => { if (e.target === e.currentTarget) e.preventDefault(); }}
		onclick={(e) => handleBackdropClick(e, item)}
		ondblclick={e => e.preventDefault()}
		transition:fade={{duration: 150}}
	>
		<Drawer
			position={options.position || 'right'}
			size={options.size || 'normal'}
		>
			<Component {...item.props}/>
		</Drawer>
	</div>
{/each}
