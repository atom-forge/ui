<script lang="ts">
	import { DoughnutChart } from '$lib';
</script>

<div class="h-64 w-full">
	<DoughnutChart
		labels={['Frontend', 'Backend', 'DevOps', 'Design']}
		data={[40, 30, 18, 12]}
		cutout="65%"
	/>
</div>
