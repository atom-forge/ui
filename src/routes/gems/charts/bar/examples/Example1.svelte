<script lang="ts">
	import { CjsBarChart } from '$lib';
</script>

<div class="h-64 w-full">
	<CjsBarChart
		labels={['Q1', 'Q2', 'Q3', 'Q4']}
		datasets={[
			{ label: 'Product A', data: [4200, 5800, 4900, 6700] },
			{ label: 'Product B', data: [3100, 4200, 5100, 4800] },
			{ label: 'Product C', data: [2400, 3100, 2800, 3900] },
		]}
	/>
</div>
