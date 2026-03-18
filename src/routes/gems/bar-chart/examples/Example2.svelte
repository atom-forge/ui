<script lang="ts">
	import { BarChart } from '$lib';

	const series = [
		{ name: 'Online Sales', color: '#60a5fa' },
		{ name: 'In-Store Sales', color: '#4ade80' },
	];

	const data = [
		{ label: 'Jan', values: [{ value: 150 }, { value: 120 }] },
		{ label: 'Feb', values: [{ value: 220 }, { value: 180 }] },
		{ label: 'Mar', values: [{ value: 180 }, { value: 200 }] },
		{ label: 'Apr', values: [{ value: 250 }, { value: 210 }] },
		{ label: 'May', values: [{ value: 190 }, { value: 150 }] },
		{ label: 'Jun', values: [{ value: 300 }, { value: 280 }] },
	];
</script>

<div class="h-48 w-full">
	<BarChart {data} {series} variant="stacked" />
</div>
