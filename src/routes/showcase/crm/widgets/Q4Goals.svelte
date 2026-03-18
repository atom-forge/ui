<script lang="ts">
	import {Card, ProgressBar} from '$lib';

	const goals = [
		{label: 'Revenue target',             value: 78, color: 'text-green-500'},
		{label: 'New customers',              value: 61, color: 'text-blue-400'},
		{label: 'Support tickets resolved',   value: 94, color: 'text-accent'},
		{label: 'Product launches',           value: 50, color: 'text-yellow-500'},
		{label: 'Team utilization',           value: 83, color: 'text-muted-contrast'},
	];
</script>

<Card class="p-5 h-full flex flex-col gap-3">
	<div>
		<h3 class="text-sm font-semibold text-canvas-contrast">Q4 Goals</h3>
		<p class="text-xs text-muted-contrast">Progress towards quarterly targets</p>
	</div>
	<div class="flex flex-col gap-3 flex-1 justify-around">
		{#each goals as goal}
			<div>
				<div class="flex justify-between text-xs mb-1">
					<span class="text-canvas-contrast">{goal.label}</span>
					<span class="{goal.color} font-semibold">{goal.value}%</span>
				</div>
				<ProgressBar value={goal.value} small/>
			</div>
		{/each}
	</div>
</Card>

