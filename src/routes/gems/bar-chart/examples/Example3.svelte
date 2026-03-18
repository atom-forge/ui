<script lang="ts">
	import { BarChart } from '$lib';

	const series = [{ name: 'Weekly Revenue', color: 'var(--color-accent)' }];

	const data = [
		{ label: 'Mon', value: 45 },
		{ label: 'Tue', value: 78 },
		{ label: 'Wed', value: 62 },
		{ label: 'Thu', value: 91 },
		{ label: 'Fri', value: 84 },
		{ label: 'Sat', value: 53 },
		{ label: 'Sun', value: 29 },
	];
</script>

<div class="h-48 w-full">
	<BarChart {data} {series} />
</div>
