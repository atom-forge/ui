<script lang="ts">
	import { Card } from '@atom-forge/ui';

	const elevations = [
		{ level: 0, label: 'No shadow' },
		{ level: 1, label: 'Small shadow (default)' },
		{ level: 2, label: 'Standard shadow' },
		{ level: 3, label: 'Medium shadow' },
		{ level: 4, label: 'Large shadow' },
		{ level: 5, label: 'Extra large shadow' },
		{ level: 6, label: '2XL shadow' },
	] as const;
</script>

<div class="flex flex-wrap gap-4">
	{#each elevations as { level, label }}
		<Card elevate={level} class="p-4 w-48">
			<h3 class="text-lg font-semibold mb-2">Elevate {level}</h3>
			<p class="text-muted-contrast">{label}.</p>
		</Card>
	{/each}
</div>
