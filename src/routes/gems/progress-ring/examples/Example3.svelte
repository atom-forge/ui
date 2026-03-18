<script lang="ts">
	import { ProgressRing, Slider } from '$lib';
	import { CheckCircle } from 'lucide-svelte';

	let value = $state(65);
</script>

<div class="space-y-6 max-w-sm">
	<div class="flex gap-8 items-center">
		<!-- Custom center content -->
		<ProgressRing {value} size={140} strokeWidth={14}>
			{#snippet children()}
				<div class="flex flex-col items-center leading-tight">
					<span class="text-2xl font-bold text-canvas-contrast tabular-nums">{Math.round(value)}%</span>
					<span class="text-xs text-muted-contrast">complete</span>
				</div>
			{/snippet}
		</ProgressRing>

		<!-- Completed state -->
		<ProgressRing value={100} size={100} color="#10b981" trackColor="#d1fae5">
			{#snippet children()}
				<CheckCircle size={36} class="text-emerald-500" />
			{/snippet}
		</ProgressRing>
	</div>

	<Slider bind:value min={0} max={100} />
</div>
