<script lang="ts">
	import { LineChart } from '$lib';
</script>

<div class="h-64 w-full">
	<LineChart
		labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
		smooth
		datasets={[
			{ label: 'Visitors', data: [420, 380, 510, 490, 620, 780, 640], fill: true },
		]}
	/>
</div>
