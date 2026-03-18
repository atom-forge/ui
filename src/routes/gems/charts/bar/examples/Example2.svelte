<script lang="ts">
	import { CjsBarChart } from '$lib';
</script>

<div class="h-64 w-full">
	<CjsBarChart
		labels={['Design', 'Engineering', 'Marketing', 'Sales']}
		stacked
		datasets={[
			{ label: 'Junior', data: [3, 8, 2, 5] },
			{ label: 'Mid', data: [4, 12, 4, 7] },
			{ label: 'Senior', data: [2, 6, 3, 4] },
		]}
	/>
</div>
