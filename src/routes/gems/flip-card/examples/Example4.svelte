<script lang="ts">
	import {FlipCard, Card} from '$lib';
</script>

<div class="h-64 w-96">
	<FlipCard trigger="click" follow={{tilt: 20, brightness: {night: .2, day: .05}}}>
		{#snippet front()}
			<Card class="flex h-full w-full items-center justify-center p-4">
				<div>
					<h1 class="text-2xl font-bold">Front Side</h1>
					<p>Move your mouse over the card.</p>
				</div>
			</Card>
		{/snippet}
		{#snippet back()}
			<Card class="flex h-full w-full items-center justify-center p-4 bg-accent text-accent-contrast">
				<div>
					<h1 class="text-2xl font-bold">Back Side</h1>
					<p>The card follows your mouse!</p>
				</div>
			</Card>
		{/snippet}
	</FlipCard>
</div>
