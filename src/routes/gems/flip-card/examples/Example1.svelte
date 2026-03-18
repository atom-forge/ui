<script lang="ts">
	import {FlipCard, Card} from '$lib';
</script>

<div class="h-64 w-96">
	<FlipCard>
		{#snippet front()}
			<Card class="flex h-full w-full items-center justify-center p-4">
				<div>
					<h1 class="text-2xl font-bold">Front Side</h1>
					<p>Hover the card to flip!</p>
				</div>
			</Card>
		{/snippet}
		{#snippet back()}
			<Card class="flex h-full w-full items-center justify-center p-4 bg-accent text-accent-contrast">
				<div>
					<h1 class="text-2xl font-bold">Back Side</h1>
					<p>Success! 🎉</p>
				</div>
			</Card>
		{/snippet}
	</FlipCard>
</div>
