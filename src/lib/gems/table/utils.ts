export type BarChartValueConfig<T> = {
	key: keyof T;
	color: string;
	opacity?: number; // 0-1, defaults to 0.1
};

export type BarChartConfig<T> = {
	values: BarChartValueConfig<T>[];
	height?: string; // CSS height value, e.g. "10px" or "100%"
};

export function createRowBarChartStyle<T>(
	row: T,
	tableData: T[],
	config: BarChartConfig<T>
): { style: string } {
	const height = config.height ?? '100%';

	// Calculate max total value across all rows
	const max = Math.max(...tableData.map(r =>
		config.values.reduce((sum, v) => sum + (Number(r[v.key]) || 0), 0)
	));

	let gradientStops: string[] = [];
	let currentPercent = 0;

	config.values.forEach(valConfig => {
		const value = Number(row[valConfig.key]) || 0;
		const percent = (value / max) * 100;
		const endPercent = currentPercent + percent;

		const opacity = valConfig.opacity ?? 0.1;
		// Use color-mix for opacity
		const transparentPercent = (1 - opacity) * 100;

		gradientStops.push(
			`color-mix(in srgb, ${valConfig.color}, transparent ${transparentPercent}%) ${currentPercent}% ${endPercent}%`
		);

		currentPercent = endPercent;
	});

	// Add transparent ending
	gradientStops.push(`transparent ${currentPercent}%`);

	return {
		style: `
            background-image: linear-gradient(to right, ${gradientStops.join(', ')});
            background-size: 100% ${height};
            background-repeat: no-repeat;
            background-position: bottom;
        `
	};
}
