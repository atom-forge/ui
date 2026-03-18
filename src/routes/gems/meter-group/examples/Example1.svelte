<script lang="ts">
	import { MeterGroup, MeterGroupLegend, type MeterItem } from '$lib';

	const items: MeterItem[] = [
		{ id: 'docs', label: 'Documents', value: 25, color: '#3b82f6' },
		{ id: 'photos', label: 'Photos', value: 40, color: '#10b981' },
		{ id: 'apps', label: 'Apps', value: 15, color: '#f59e0b' },
		{ id: 'other', label: 'Other', value: 10, color: '#6b7280' },
	];
</script>

<div class="space-y-3 max-w-md">
	<MeterGroup {items} class="h-4" />
	<MeterGroupLegend {items} />
</div>
