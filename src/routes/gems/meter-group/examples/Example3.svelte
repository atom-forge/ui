<script lang="ts">
	import { MeterGroup, MeterGroupLegend, type MeterItem } from '$lib';

	const items: MeterItem[] = [
		{ id: 'design', label: 'Design', value: 35, color: '#8b5cf6' },
		{ id: 'dev', label: 'Development', value: 50, color: '#3b82f6' },
		{ id: 'testing', label: 'Testing', value: 15, color: '#10b981' },
	];

	let selected = $state<MeterItem | null>(null);
</script>

<div class="space-y-3 max-w-md">
	<p class="text-sm text-muted-contrast">Click a segment to select it.</p>
	<MeterGroup
		{items}
		class="h-6 rounded-md"
		onsegmentclick={(item) => (selected = item)}
	/>
	<MeterGroupLegend
		{items}
		class="grid grid-cols-3 gap-2"
		onitemclick={(item) => (selected = item)}
	>
		{#snippet value(item)}
			<span class="ml-auto text-muted-contrast text-xs">{item.value}%</span>
		{/snippet}
	</MeterGroupLegend>
	{#if selected}
		<p class="text-sm">
			Selected: <strong style:color={selected.color}>{selected.label}</strong> — {selected.value}%
		</p>
	{/if}
</div>
