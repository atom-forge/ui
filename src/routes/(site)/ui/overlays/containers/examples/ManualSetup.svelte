<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import {
		createModalManager, createDrawerManager, ModalContainer,
		createPopupManager, PopupContainer, createToastManager, ToastContainer,
	} from '@atom-forge/ui';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();

	const stack = createModalManager();
	createDrawerManager();
	const popup = createPopupManager();
	createToastManager();
	beforeNavigate(() => {
		stack.closeAll();
		popup.resolveRoot();
	});
</script>

{@render children()}
<div id="atom-forge-portal-target" class="relative z-10000"></div>
<!-- ModalContainer renders both modals and drawers. Do not also mount DrawerContainer. -->
<ModalContainer />
<PopupContainer />
<ToastContainer />
