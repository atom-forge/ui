<script lang="ts">
	import { Button, getToastManager } from "$lib";

	const toastManager = getToastManager();

	function showLongToast() {
		toastManager.show("This toast will stay for 5 seconds.", { duration: 5000 });
	}

	function showInfiniteToast() {
		toastManager.show("This toast stays until dismissed.", { duration: 0, closable: true });
	}
</script>

<div class="flex flex-wrap items-center gap-4">
	<Button label="Show 5s Toast" onclick={showLongToast}/>
	<Button label="Show Infinite Toast" onclick={showInfiniteToast}/>
</div>
