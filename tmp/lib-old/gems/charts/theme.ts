export const CHART_PALETTE = [
	'#f97316', // orange-500  (close to --color-accent)
	'#3b82f6', // blue-500
	'#ef4444', // red-500
	'#10b981', // emerald-500
	'#8b5cf6', // violet-500
	'#f59e0b', // amber-500
	'#06b6d4', // cyan-500
	'#ec4899', // pink-500
];

function cssVar(name: string): string {
	if (typeof document === 'undefined') return '';
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function getChartTheme() {
	return {
		grid: cssVar('--color-base-b'),
		text: cssVar('--color-muted-c'),
	};
}

export function seriesColor(index: number, override?: string): string {
	return override ?? CHART_PALETTE[index % CHART_PALETTE.length];
}
