<script lang="ts">
	import {beforeNavigate} from '$app/navigation';
	import {createModalManager} from "../controls/overlays/modal";
	import {createPopupManager, PopupContainer} from "../controls/overlays/popup";
	import {createToastManager, ToastContainer} from "../controls/overlays/toast";
	import {createDrawerManager} from "../controls/overlays/drawer";
	import type {ChildrenProp} from "../helpers/types";
	import {createThemeManager} from "./theme-manager.svelte";
	import {onMount} from "svelte";
	import SharedOverlayContainer from "../controls/overlays/shared/SharedOverlayContainer.svelte";

	let {
		children,
		manageBodyStyle = true
	}: ChildrenProp & {manageBodyStyle?: boolean} = $props();

	const themeManager = createThemeManager();

	onMount(() => {
		// Initialize themeManager.dark based on the class set by the no-flash script
		themeManager.dark = document.documentElement.classList.contains('dark');
	});

	$effect(() => {
		document.documentElement.classList.toggle('dark', themeManager.dark);
		if (manageBodyStyle) {
			document.body.style.background = 'var(--color-canvas)';
			document.body.style.color = 'var(--color-canvas-contrast)';
		}
		localStorage.setItem('dark', JSON.stringify(themeManager.dark));
	});

	const overlayStackManager = createModalManager();
	const popupManager = createPopupManager();
	createToastManager();
	createDrawerManager();

	beforeNavigate(() => {
		overlayStackManager.closeAll();
		popupManager.resolveRoot();
	});
</script>

<div style="display: contents;">
	{@render children?.()}
</div>
<div id="atom-forge-portal-target" class="relative z-10000"></div>
<SharedOverlayContainer/>
<PopupContainer/>
<ToastContainer/>
