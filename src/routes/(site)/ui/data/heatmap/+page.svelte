<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
        { group: 'Props', name: 'labelColor', type: 'string', description: 'SVG fill color for row/column label text. Defaults to currentColor.' },
        { group: 'Props', name: 'labelBg', type: 'string', description: 'Optional SVG background fill behind labels; also changes label spacing.' },
		{ group: 'Props', name: 'data', type: 'HeatmapData', description: 'Required. Contains <code>xLabels: string[]</code>, <code>yLabels: string[]</code>, and <code>values: number[][]</code> where <code>values[y][x]</code> is the cell value.' },
		{ group: 'Props', name: 'colors', type: 'string[]', default: "['#f0f0f0', '#22c55e']", description: 'Color scale as hex strings. Minimum two colors; the component interpolates linearly between them.' },
		{ group: 'Props', name: 'showLegend', type: 'boolean', default: 'false', description: 'Show the color scale gradient bar below the grid.' },
		{ group: 'Props', name: 'legendTitle', type: 'string', default: "''", description: 'Optional label shown above the legend bar.' },
		{ group: 'Props', name: 'cellSize', type: 'number', default: '16', description: 'Width and height of each cell in SVG units.' },
		{ group: 'Props', name: 'cellPadding', type: 'number', default: '2', description: 'Gap between cells in pixels (SVG units).' },
		{ group: 'Props', name: 'cellBorderRadius', type: 'number', default: '2', description: 'Corner radius of each cell in pixels.' },
		{ group: 'Props', name: 'showRowLabels', type: 'boolean', default: 'true', description: 'Show the Y-axis row labels on the left side of the grid.' },
		{ group: 'Props', name: 'showColLabels', type: "boolean | 'vertical'", default: 'false', description: '<code>false</code> = hide (default), <code>true</code> = horizontal, <code>\'vertical\'</code> = rotated 90° above each column.' },
		{ group: 'Props', name: 'class', type: 'string', description: 'Extra classes on the root <code>svg</code> element.' },
		{ group: 'Props', name: 'cellClass', type: 'string', description: 'Extra classes applied to every cell <code>rect</code>.' },
		{ group: 'Snippets', name: 'tooltip', type: 'Snippet<[HeatmapCell]>', description: 'Custom tooltip content. Receives a <code>HeatmapCell</code> object with <code>xLabel</code>, <code>yLabel</code>, <code>value</code>, <code>x</code>, <code>y</code>.' },
		{ group: 'Events', name: 'oncellClick', type: '(detail: HeatmapCell) => void', description: 'Fires on click or Enter/Space activation of a focused cell. Cells are individually focusable and labeled with their coordinates and value.' },
		{ group: 'Events', name: 'oncellHover', type: '(detail: HeatmapCell) => void', description: 'Fires when the mouse enters a cell.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Heatmap</ProseTitle>
		<ProseText>
			An SVG-based heatmap for visualizing 2D data with a color scale. Typical uses include activity calendars, correlation matrices, and time-of-day patterns.
			The component is fully responsive via <DocInlineCode>viewBox</DocInlineCode> and adapts its label and legend colors to the active theme.
		</ProseText>
		<ProseText>Use a rectangular values[y][x] matrix matching the label counts and finite numeric values. showLegend and showColLabels default to false. Tooltip and oncellHover respond to mouse entry; keyboard focus does not open the tooltip.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Yearly activity (GitHub-style)</ProseTitle>
				<ProseText>52 weeks × 7 days with small cells. Default green scale, no legend.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Hourly traffic — multi-stop scale</ProseTitle>
				<ProseText>24h × 7 days. Three-stop color scale for richer contrast.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom tooltip & click handler</ProseTitle>
				<ProseText>Override the tooltip with a snippet and react to cell clicks via <DocInlineCode>oncellClick</DocInlineCode>.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>
</ProsePage>
