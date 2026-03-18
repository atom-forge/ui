<script lang="ts">
	import { Button, getToastManager } from "$lib";
	import CustomToast from "./CustomToast.svelte";

	const toastManager = getToastManager();

	function showCustomComponentToast() {
		toastManager.showCustom(CustomToast as any, { name: "AtomForge User" }, { duration: 5000 });
	}
</script>

<Button label="Show Custom Component Toast" onclick={showCustomComponentToast}/>
