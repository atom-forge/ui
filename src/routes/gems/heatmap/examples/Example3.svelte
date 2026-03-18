<script lang="ts">
	import { Heatmap, type HeatmapCell } from '$lib';

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const products = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'];

	const rng = (seed: number) => {
		let s = seed;
		return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
	};
	const rand = rng(99);
	const values = products.map(() => months.map(() => Math.round(rand() * 500 + 50)));

	const data = { xLabels: months, yLabels: products, values };

	let clicked = $state<HeatmapCell | null>(null);
</script>

<div class="space-y-3">
	<Heatmap
		{data}
		colors={['#fef3c7', '#f59e0b', '#92400e']}
		cellSize={20}
		cellPadding={3}
		cellBorderRadius={3}
		oncellClick={(d) => (clicked = d)}
	>
		{#snippet tooltip(cell)}
			<div class="bg-surface border-frame rounded-lg shadow-lg px-3 py-2 text-sm">
				<div class="font-semibold text-canvas-contrast">{cell.yLabel}</div>
				<div class="text-muted-contrast text-xs">{cell.xLabel}</div>
				<div class="text-accent font-mono font-medium mt-1">${cell.value}k</div>
			</div>
		{/snippet}
	</Heatmap>

	{#if clicked}
		<p class="text-xs text-muted-contrast">
			Last clicked: <span class="text-canvas-contrast font-medium">{clicked.yLabel} — {clicked.xLabel}: ${clicked.value}k</span>
		</p>
	{/if}
</div>
