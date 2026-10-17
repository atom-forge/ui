<script lang="ts">
	import { DoughnutChart } from '@atom-forge/ui';
</script>

<div class="h-64 w-full">
	<DoughnutChart
        options={{ maintainAspectRatio: false }}
		labels={['Frontend', 'Backend', 'DevOps', 'Design']}
		data={[40, 30, 18, 12]}
		cutout="65%"
	/>
</div>
