<script lang="ts">
	import { ScatterChart } from '$lib';
</script>

<div class="h-64 w-full">
	<ScatterChart
		datasets={[
			{
				label: 'Group A',
				data: [
					{ x: 2, y: 4 }, { x: 3, y: 7 }, { x: 5, y: 3 }, { x: 6, y: 8 },
					{ x: 8, y: 5 }, { x: 9, y: 9 }, { x: 11, y: 6 }, { x: 12, y: 11 },
				],
			},
			{
				label: 'Group B',
				data: [
					{ x: 1, y: 9 }, { x: 3, y: 6 }, { x: 4, y: 12 }, { x: 7, y: 4 },
					{ x: 8, y: 10 }, { x: 10, y: 7 }, { x: 13, y: 3 }, { x: 14, y: 8 },
				],
			},
		]}
	/>
</div>
