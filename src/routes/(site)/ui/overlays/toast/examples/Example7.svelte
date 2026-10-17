<script lang="ts">
	import { Button, getToastManager } from "@atom-forge/ui";
	import CustomToast from "./CustomToast.svelte";

	const toastManager = getToastManager();

	function showCustomComponentToast() {
		let id = '';
				id = toastManager.showCustom(CustomToast, {
					name: "AtomForge User",
					onclose: () => toastManager.dismiss(id),
				}, { duration: 5000 });
	}
</script>

<Button label="Show Custom Component Toast" onclick={showCustomComponentToast}/>
