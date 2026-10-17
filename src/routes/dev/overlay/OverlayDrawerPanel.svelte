<script lang="ts">
	import {Button, getDrawerManager} from '../../../lib/index.js';
	import PopupControls from './PopupControls.svelte';

	let {
		title = 'Drawer',
		openModal,
		openDrawer
	}: {
		title?: string;
		openModal: () => void;
		openDrawer: () => void;
	} = $props();

	const drawer = getDrawerManager();
</script>

<div class="h-full p-5 flex flex-col gap-4">
	<div class="flex items-center justify-between gap-3">
		<h2 class="text-base font-semibold">{title}</h2>
		<Button ghost compact label="Close" onclick={() => drawer.close('closed')}/>
	</div>

	<div class="flex flex-wrap gap-2">
		<Button label="Open modal above" onclick={openModal}/>
		<Button label="Open drawer above" onclick={openDrawer}/>
		<Button secondary label="Resolve drawer" onclick={() => drawer.resolve('resolved')}/>
	</div>

	<PopupControls prefix="drawer"/>
</div>
