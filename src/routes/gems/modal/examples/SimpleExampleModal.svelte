<script lang="ts">
	import { Button, Card, getModalManager, getToastManager } from "$lib";
	import NestedExampleModal from "./NestedExampleModal.svelte";

	let { title = "Simple Modal", message = "This is a simple modal example." } = $props<{
		title?: string;
		message?: string;
	}>();

	const modalManager = getModalManager();
	const toastManager = getToastManager();

	async function openNestedModal() {
		const result = await modalManager.open(NestedExampleModal, {
			parentMessage: "Message from Simple Modal"
		});
		console.log("Nested modal closed with result:", result);
		toastManager.show(`Nested modal closed with result: ${result}`);
	}
</script>

<Card class="rounded-lg shadow-xl p-6 min-w-lg max-w-md">
	<h3 class="text-lg font-bold mb-2">{title}</h3>
	<p class="text-muted-contrast mb-6">{message}</p>
	<div class="flex justify-end gap-2">
		<Button ghost onclick={() => modalManager.resolve("Cancelled from Simple Modal")}>Cancel</Button>
		<Button onclick={openNestedModal}>Open Nested Modal</Button>
		<Button onclick={() => modalManager.resolve("Confirmed from Simple Modal")}>Confirm</Button>
	</div>
</Card>
