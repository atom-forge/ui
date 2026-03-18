<script lang="ts">
	import { BubbleChart } from '$lib';
</script>

<div class="h-64 w-full">
	<BubbleChart
		datasets={[
			{
				label: 'Products',
				data: [
					{ x: 10, y: 20, r: 8 },
					{ x: 30, y: 40, r: 14 },
					{ x: 50, y: 15, r: 6 },
					{ x: 70, y: 60, r: 18 },
					{ x: 85, y: 35, r: 10 },
				],
			},
			{
				label: 'Competitors',
				data: [
					{ x: 20, y: 55, r: 12 },
					{ x: 45, y: 30, r: 9 },
					{ x: 60, y: 70, r: 16 },
					{ x: 80, y: 20, r: 7 },
				],
			},
		]}
	/>
</div>
