<script lang="ts">
	import { Button, getDrawerManager } from "$lib";
	import DrawerContent from "./DrawerContent.svelte";

	const drawerManager = getDrawerManager();

	async function openDrawer() {
		const result = await drawerManager.open(DrawerContent, {
			title: "Basic Drawer",
			message: "This is a simple drawer opened from the right."
		});
		console.log("Drawer closed with result:", result);
	}
</script>

<Button label="Open Drawer" onclick={openDrawer}/>
