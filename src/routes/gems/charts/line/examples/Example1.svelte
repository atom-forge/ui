<script lang="ts">
	import { LineChart } from '$lib';
</script>

<div class="h-64 w-full">
	<LineChart
		labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
		datasets={[
			{ label: 'Revenue', data: [12000, 19000, 15000, 22000, 18000, 27000, 24000] },
			{ label: 'Expenses', data: [8000, 11000, 9000, 14000, 13000, 16000, 15000] },
		]}
	/>
</div>
