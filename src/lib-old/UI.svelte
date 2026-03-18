<script lang="ts">
	import {createDrawerManager, createModalManager, createPopupManager, createToastManager, DrawerContainer, ModalContainer, PopupContainer, ToastContainer} from "./index.js";
	import type {ChildrenProp} from "./tools/types";
	import {createThemeManager} from "./tools/theme-manager.svelte";
	import {onMount} from "svelte";

	let {
		children
	}: & ChildrenProp = $props();

	const themeManager = createThemeManager();

	onMount(() => {
		// Initialize themeManager.dark based on the class set by the no-flash script
		themeManager.dark = document.documentElement.classList.contains('dark');
	});

	$effect(() => {
		document.documentElement.classList.toggle('dark', themeManager.dark);
		document.body.style.background = 'var(--color-base)';
		document.body.style.color = 'var(--color-control-c)';
		localStorage.setItem('dark', JSON.stringify(themeManager.dark));
	});

	createModalManager();
	createPopupManager();
	createToastManager();
	createDrawerManager();
</script>

<div style="display: contents;">
	{@render children?.()}
</div>
<div id="atom-forge-ui:portal-target" class="relative z-10000"></div>
<ModalContainer/>
<PopupContainer/>
<ToastContainer/>
<DrawerContainer/>
