<script lang="ts">
	import { MeterGroup, MeterGroupLegend, type MeterItem } from '$lib';

	const items: MeterItem[] = [
		{ id: 'q1', label: 'Q1', value: 32, color: '#3b82f6' },
		{ id: 'q2', label: 'Q2', value: 28, color: '#10b981' },
		{ id: 'q3', label: 'Q3', value: 22, color: '#f59e0b' },
		{ id: 'q4', label: 'Q4', value: 18, color: '#8b5cf6' },
	];
</script>

<div class="flex gap-8 items-start">
	<div class="flex gap-3 items-start">
		<MeterGroup {items} vertical class="h-40" />
		<MeterGroupLegend {items} vertical />
	</div>
</div>
