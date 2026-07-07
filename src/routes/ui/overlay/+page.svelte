<script lang="ts">
	import {Button, Card, getDrawerManager, getModalManager, getToastManager} from '../../../lib/index.js';
	import OverlayDrawerPanel from './OverlayDrawerPanel.svelte';
	import PopupControls from './PopupControls.svelte';

	const modal = getModalManager();
	const drawer = getDrawerManager();
	const toast = getToastManager();

	let modalCount = 0;
	let drawerCount = 0;

	function openModal() {
		modal.openSnippet(modalContent, {
			title: `Modal ${++modalCount}`
		});
	}

	function openLockedModal() {
		modal.openSnippet(modalContent, {
			title: `Locked modal ${++modalCount}`
		}, {closable: false});
	}

	function openDedupModal() {
		modal.openSnippet(modalContent, {
			title: 'Dedup modal'
		}, {key: 'overlay-dev-dedup-modal'});
	}

	function openDrawer() {
		drawer.open(OverlayDrawerPanel, {
			title: `Drawer ${++drawerCount}`,
			openModal,
			openDrawer
		});
	}

	function openLockedDrawer() {
		drawer.open(OverlayDrawerPanel, {
			title: `Locked drawer ${++drawerCount}`,
			openModal,
			openDrawer
		}, {
			closable: false,
			size: 'compact'
		});
	}

	function openDedupDrawer() {
		drawer.open(OverlayDrawerPanel, {
			title: 'Dedup drawer',
			openModal,
			openDrawer
		}, {key: 'overlay-dev-dedup-drawer'});
	}
</script>

{#snippet modalContent(args: {title: string})}
	<Card class="w-[min(44rem,calc(100vw-2rem))] p-5 flex flex-col gap-4 shadow-2xl">
		<div class="flex items-center justify-between gap-3">
			<h2 class="text-base font-semibold">{args.title}</h2>
			<Button ghost compact label="Close" onclick={() => modal.close('closed')}/>
		</div>

		<div class="flex flex-wrap gap-2">
			<Button label="Open modal above" onclick={openModal}/>
			<Button label="Open drawer above" onclick={() => drawer.open(OverlayDrawerPanel, {title: `Drawer ${++drawerCount} from ${args.title}`, openModal, openDrawer}, {size: 'compact'})}/>
			<Button secondary label="Resolve modal" onclick={() => modal.resolve('resolved')}/>
		</div>

		<PopupControls prefix={args.title.toLowerCase()}/>
	</Card>
{/snippet}

<div class="p-8 flex flex-col gap-8">
	<section class="flex flex-col gap-3">
		<h1 class="text-lg font-semibold">Overlay Sandbox</h1>
		<div class="flex flex-wrap gap-2">
			<Button label="Open modal" onclick={openModal}/>
			<Button label="Open drawer" onclick={openDrawer}/>
			<Button secondary label="Locked modal" onclick={openLockedModal}/>
			<Button secondary label="Locked drawer" onclick={openLockedDrawer}/>
			<Button muted label="Dedup modal" onclick={openDedupModal}/>
			<Button muted label="Dedup drawer" onclick={openDedupDrawer}/>
			<Button muted label="Toast" onclick={() => toast.show('Toast above overlays')}/>
		</div>
	</section>

	<section class="flex flex-col gap-3 max-w-3xl">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Standalone popup controls</h2>
		<PopupControls prefix="standalone"/>
	</section>
</div>
