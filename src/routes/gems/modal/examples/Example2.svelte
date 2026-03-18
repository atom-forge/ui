<script lang="ts">
	import { Button, getModalManager, getToastManager } from "$lib";
	import SimpleExampleModal from "./SimpleExampleModal.svelte";

	const modalManager = getModalManager();
	const toastManager = getToastManager();

	async function openModalSequence() {
		const result = await modalManager.open(SimpleExampleModal, {
			title: "Start Sequence",
			message: "This modal will open another modal."
		});
		console.log("Sequence started, final result:", result);
		toastManager.show(`Modal closed with result: ${result}`);

	}
</script>

<Button label="Open Modal Sequence" onclick={openModalSequence}/>
