<script lang="ts">
	import { Button, getDrawerManager } from "$lib";

	let { title = "Drawer", message = "Drawer content" } = $props<{
		title?: string;
		message?: string;
	}>();

	const drawerManager = getDrawerManager();
</script>

<div class="p-6 flex flex-col h-full">
	<h2 class="text-2xl font-bold mb-4">{title}</h2>
	<p class="grow">{message}</p>
	<div class="flex justify-end gap-2">
		<Button ghost onclick={() => drawerManager.close("Cancelled")}>Cancel</Button>
		<Button onclick={() => drawerManager.close("Confirmed")}>Confirm</Button>
	</div>
</div>
