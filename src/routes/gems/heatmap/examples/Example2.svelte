<script lang="ts">
	import { Heatmap } from '$lib';

	const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}h`);
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const rng = (seed: number) => {
		let s = seed;
		return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
	};
	const rand = rng(7);
	const values = days.map((_, di) =>
		hours.map((_, hi) => {
			const workHour = hi >= 9 && hi <= 17 ? 1 : 0.15;
			const weekend = di >= 5 ? 0.3 : 1;
			return Math.round(rand() * 100 * workHour * weekend);
		})
	);

	const data = { xLabels: hours, yLabels: days, values };
</script>

<Heatmap
	{data}
	colors={['#1e1b4b', '#6366f1', '#a5f3fc']}
	cellSize={14}
	cellPadding={2}
	cellBorderRadius={2}
/>
