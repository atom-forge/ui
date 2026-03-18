<script lang="ts">
	import { MeterGroup, MeterGroupLegend, type MeterItem } from '$lib';

	const items: MeterItem[] = [
		{ id: 'a', label: 'Alpha', value: 45, color: '#3b82f6' },
		{ id: 'b', label: 'Beta', value: 30, color: '#10b981' },
		{ id: 'c', label: 'Gamma', value: 25, color: '#f59e0b' },
	];
</script>

<div class="space-y-4 max-w-sm">
	<div class="space-y-1.5">
		<p class="text-xs text-muted-contrast">Normal</p>
		<MeterGroup {items} />
		<MeterGroupLegend {items} />
	</div>
	<div class="space-y-1.5">
		<p class="text-xs text-muted-contrast">Compact</p>
		<MeterGroup {items} compact />
		<MeterGroupLegend {items} compact />
	</div>
	<div class="space-y-1">
		<p class="text-xs text-muted-contrast">Small</p>
		<MeterGroup {items} small />
		<MeterGroupLegend {items} small />
	</div>
</div>
