<script lang="ts">
	import {Button, FlipCard, Card} from '$lib';

	let isCardFlipped = $state(false);
</script>

<div class="flex flex-col items-center">
	<Button class="mb-4" onclick={() => (isCardFlipped = !isCardFlipped)}>
		Flip Card
	</Button>
	<div class="h-64 w-96">
		<FlipCard bind:flipped={isCardFlipped} trigger="manual">
			{#snippet front()}
				<Card class="flex h-full w-full items-center justify-center p-4">
					<h1 class="text-2xl font-bold">Front Side</h1>
				</Card>
			{/snippet}
			{#snippet back()}
				<Card class="flex h-full w-full items-center justify-center p-4 bg-red-500 text-white">
					<h1 class="text-2xl font-bold">Back Side</h1>
				</Card>
			{/snippet}
		</FlipCard>
	</div>
</div>
