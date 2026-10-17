<script lang="ts">
	import { Button, MeterGroup, MeterGroupLegend, type MeterItem } from '@atom-forge/ui';
	const items: MeterItem[] = [
		{ id: 'design', label: 'Design', value: 30, color: '#8b5cf6' },
		{ id: 'build', label: 'Build', value: 50, color: '#3b82f6' },
		{ id: 'review', label: 'Review', value: 20, color: '#10b981' },
	];
	let selected = $state('None');
</script>

<div class="space-y-3 max-w-md">
	<MeterGroup {items} aria-label="Project effort" class="h-8" segmentClass="flex items-center justify-center">
		{#snippet segment(entry)}
			<span class="text-xs text-white">{entry.value}%</span>
		{/snippet}
	</MeterGroup>
	<MeterGroupLegend {items} showValues={false} itemClass="flex-1" class="gap-2">
		{#snippet item(entry)}
			<Button compact ghost label={entry.label} onclick={() => selected = entry.label} />
		{/snippet}
	</MeterGroupLegend>
	<p aria-live="polite" class="text-sm text-muted-contrast">Selected: {selected}</p>
</div>
