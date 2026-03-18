<script lang="ts">
	import { Button, Card, getModalManager } from "$lib";

	let { parentMessage = "No message from parent" } = $props<{
		parentMessage?: string;
	}>();

	const modalManager = getModalManager();
</script>

<Card class="rounded-lg shadow-xl p-6 min-w-lg max-w-md">
	<h3 class="text-lg font-bold mb-2">Nested Modal</h3>
	<p class="text-muted-contrast mb-6">This modal was opened from another modal.</p>
	<p class="text-muted-contrast mb-6">Parent message: <span class="font-mono">{parentMessage}</span></p>
	<div class="flex justify-end gap-2">
		<Button ghost onclick={() => modalManager.resolve("Cancelled from Nested Modal")}>Cancel</Button>
		<Button onclick={() => modalManager.resolve("Confirmed from Nested Modal")}>Confirm</Button>
	</div>
</Card>
