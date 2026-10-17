<script lang="ts">
	import { Button, getDrawerManager } from "@atom-forge/ui";
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
		}, { size: 'small' });
	}

	function openCompactDrawer() {
		drawerManager.open(DrawerContent, {
			title: "Compact Drawer",
			message: "This is a compact drawer."
		}, { size: 'compact' });
	}
	function openBottomDrawer() {
		drawerManager.open(DrawerContent, {
			title: "Bottom Drawer",
			message: "The class option overrides the named panel height. Close explicitly; backdrop and Escape are disabled.",
		}, { position: 'bottom', size: 'compact', class: 'h-80', closable: false, key: 'bottom-drawer-example' });
	}
</script>

<div class="flex flex-wrap gap-4">
	<Button label="Open Left" onclick={openLeftDrawer}/>
	<Button label="Open Small" onclick={openSmallDrawer}/>
	<Button label="Open Compact" onclick={openCompactDrawer}/>
		<Button label="Open Bottom (explicit close)" onclick={openBottomDrawer}/>
</div>
