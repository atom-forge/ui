<script lang="ts">
	import { MeterGroup, MeterGroupLegend, type MeterItem } from '$lib';

	const items: MeterItem[] = [
		{ id: 'used', label: 'Used', value: 45, color: '#ef4444' },
		{ id: 'reserved', label: 'Reserved', value: 20, color: '#f59e0b' },
	];
</script>

<div class="space-y-3 max-w-md">
	<div class="flex justify-between text-sm text-muted-contrast">
		<span>Storage (100 GB total)</span>
		<span>{45 + 20} / 100 GB</span>
	</div>
	<MeterGroup {items} max={100} class="h-5 rounded-lg" />
	<MeterGroupLegend {items}>
		{#snippet value(item)}
			<span class="ml-auto text-muted-contrast tabular-nums text-xs">{item.value} GB</span>
		{/snippet}
	</MeterGroupLegend>
</div>
