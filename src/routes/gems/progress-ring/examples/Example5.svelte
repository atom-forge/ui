<script lang="ts">
	import { ProgressRing, Slider } from '$lib';

	let move = $state(78);
	let exercise = $state(52);
	let stand = $state(90);
</script>

<div class="flex flex-wrap gap-12 items-center">
	<ProgressRing
		size={160}
		strokeWidth={14}
		gap={6}
		rings={[
			{ value: move, color: '#ef4444' },
			{ value: exercise, color: '#10b981' },
			{ value: stand, color: '#3b82f6' },
		]}
	>
		{#snippet children()}
			<div class="flex flex-col items-center gap-0.5 text-xs text-muted-contrast leading-tight">
				<span style="color: #ef4444" class="font-semibold">{move}%</span>
				<span style="color: #10b981" class="font-semibold">{exercise}%</span>
				<span style="color: #3b82f6" class="font-semibold">{stand}%</span>
			</div>
		{/snippet}
	</ProgressRing>

	<div class="space-y-4 w-48">
		<div class="space-y-1">
			<span class="text-xs text-muted-contrast">Move <span class="font-semibold" style="color:#ef4444">{move}%</span></span>
			<Slider bind:value={move} min={0} max={100} />
		</div>
		<div class="space-y-1">
			<span class="text-xs text-muted-contrast">Exercise <span class="font-semibold" style="color:#10b981">{exercise}%</span></span>
			<Slider bind:value={exercise} min={0} max={100} />
		</div>
		<div class="space-y-1">
			<span class="text-xs text-muted-contrast">Stand <span class="font-semibold" style="color:#3b82f6">{stand}%</span></span>
			<Slider bind:value={stand} min={0} max={100} />
		</div>
	</div>
</div>
