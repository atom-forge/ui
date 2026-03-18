<script lang="ts">
	import {Button, Card, FlipCard} from '$lib';
</script>

<div class="h-64 w-96">
	<FlipCard trigger="manual">
		{#snippet front(flip)}
			<Card class="h-full w-full flex flex-col items-center justify-center p-4">
				<h1 class="text-2xl font-bold">Front Side</h1>
				<p class="mb-4">This card is not interactive.</p>
				<Button ghost onclick={flip}>Flip to Back</Button>
			</Card>
		{/snippet}
		{#snippet back(flip)}
			<Card class="h-full w-full flex flex-col items-center justify-center p-4">
				<h1 class="text-2xl font-bold">Back Side</h1>
				<p class="mb-4">Click the button to flip back.</p>
				<Button ghost onclick={flip}>Flip to Front</Button>
			</Card>
		{/snippet}
	</FlipCard>
</div>
