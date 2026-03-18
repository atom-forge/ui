<script lang="ts">
	import { Button, Card, getModalManager, getToastManager } from "$lib";
	import Input from "$lib/gems/input/Input.svelte";

	const modalManager = getModalManager();
	const toastManager = getToastManager();

	async function openModal() {
		const result = await modalManager.openSnippet(myModal, {
			title: "Hello Modal",
			message: "This is the first modal in the sequence.",
		});
		console.log("Modal closed with result:", result);
		if (result) {
			toastManager.show("Confirmed!", { type: "success" });
		} else {
			toastManager.show("Cancelled.", { type: "error" });
		}
	}
</script>

{#snippet myModal(data)}
	{@const title = data?.title ?? 'Modal'}
	{@const message = data?.message ?? ''}
	<Card class="rounded-lg shadow-xl p-6 min-w-lg max-w-md">
		<h3 class="text-lg font-bold mb-2">{title}</h3>
		<p class="text-muted-contrast mb-6">{message}</p>
		<div class="flex justify-end gap-2">
			<Button ghost onclick={() => modalManager.resolve(false)}
				>Cancel</Button
			>
			<Button onclick={() => modalManager.resolve(true)}>Confirm</Button>
		</div>
	</Card>
{/snippet}

<Button label="Open Simple Modal" onclick={openModal} />
