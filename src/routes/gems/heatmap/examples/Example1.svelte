<script lang="ts">
	import { Heatmap } from '$lib';

	const weeks = Array.from({ length: 52 }, (_, i) => `W${i + 1}`);
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	// Simulate yearly contribution data
	const rng = (seed: number) => {
		let s = seed;
		return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
	};
	const rand = rng(42);
	const values = days.map((_, di) =>
		weeks.map((_, wi) => {
			const base = rand() * 10;
			const weekend = di >= 5 ? 0.2 : 1;
			return Math.round(base * weekend);
		})
	);

	const data = { xLabels: weeks, yLabels: days, values };
</script>

<Heatmap {data} cellSize={12} cellPadding={2} cellBorderRadius={2}/>
