<script lang="ts">
	import { Button, getDrawerManager } from "$lib";
	import DrawerContent from "./DrawerContent.svelte";

	const drawerManager = getDrawerManager();

	function openLeftDrawer() {
		drawerManager.open(DrawerContent, {
			title: "Left Drawer",
			message: "This drawer opens from the left."
		}, { position: 'left' });
	}

	function openSmallDrawer() {
		drawerManager.open(DrawerContent, {
			title: "Small Drawer",
			message: "This is a small drawer."
		}, { size: 'sm' });
	}

	function openLargeDrawer() {
		drawerManager.open(DrawerContent, {
			title: "Large Drawer",
			message: "This is a large drawer."
		}, { size: 'lg' });
	}
</script>

<div class="flex flex-wrap gap-4">
	<Button label="Open Left" onclick={openLeftDrawer}/>
	<Button label="Open Small" onclick={openSmallDrawer}/>
	<Button label="Open Large" onclick={openLargeDrawer}/>
</div>
