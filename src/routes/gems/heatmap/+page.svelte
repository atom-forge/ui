<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable, { type PropDef } from '../../../components/doc/ApiTable.svelte';
	import InlineCode from '../../../components/doc/InlineCode.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props', name: 'data', type: 'HeatmapData', description: 'Required. Contains <code>xLabels: string[]</code>, <code>yLabels: string[]</code>, and <code>values: number[][]</code> where <code>values[y][x]</code> is the cell value.' },
		{ group: 'Props', name: 'colors', type: 'string[]', default: "['#f0f0f0', '#22c55e']", description: 'Color scale as hex strings. Minimum two colors; the component interpolates linearly between them.' },
		{ group: 'Props', name: 'showLegend', type: 'boolean', default: 'false', description: 'Show the color scale gradient bar below the grid.' },
		{ group: 'Props', name: 'legendTitle', type: 'string', default: "''", description: 'Optional label shown above the legend bar.' },
		{ group: 'Props', name: 'cellSize', type: 'number', default: '16', description: 'Width and height of each cell in SVG units.' },
		{ group: 'Props', name: 'cellPadding', type: 'number', default: '2', description: 'Gap between cells in pixels (SVG units).' },
		{ group: 'Props', name: 'cellBorderRadius', type: 'number', default: '2', description: 'Corner radius of each cell in pixels.' },
		{ group: 'Props', name: 'showRowLabels', type: 'boolean', default: 'true', description: 'Show the Y-axis row labels on the left side of the grid.' },
		{ group: 'Props', name: 'showColLabels', type: "boolean | 'vertical'", default: 'true', description: '<code>false</code> = hide, <code>true</code> = horizontal (default), <code>\'vertical\'</code> = rotated 90° above each column.' },
		{ group: 'Props', name: 'class', type: 'string', description: 'Extra classes on the root <code>svg</code> element.' },
		{ group: 'Props', name: 'cellClass', type: 'string', description: 'Extra classes applied to every cell <code>rect</code>.' },
		{ group: 'Snippets', name: 'tooltip', type: 'Snippet<[HeatmapCell]>', description: 'Custom tooltip content. Receives a <code>HeatmapCell</code> object with <code>xLabel</code>, <code>yLabel</code>, <code>value</code>, <code>x</code>, <code>y</code>.' },
		{ group: 'Events', name: 'oncellClick', type: '(detail: HeatmapCell) => void', description: 'Fires when the user clicks a cell.' },
		{ group: 'Events', name: 'oncellHover', type: '(detail: HeatmapCell) => void', description: 'Fires when the mouse enters a cell.' },
	];
</script>

<DocTitle>Heatmap</DocTitle>
<DocText>
	An SVG-based heatmap for visualizing 2D data with a color scale. Typical uses include activity calendars, correlation matrices, and time-of-day patterns.
	The component is fully responsive via <InlineCode>viewBox</InlineCode> and adapts its label and legend colors to the active theme.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Yearly activity (GitHub-style)</DocSubtitle>
		<DocText>52 weeks × 7 days with small cells. Default green scale, no legend.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Hourly traffic — multi-stop scale</DocSubtitle>
		<DocText>24h × 7 days. Three-stop color scale for richer contrast.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Custom tooltip & click handler</DocSubtitle>
		<DocText>Override the tooltip with a snippet and react to cell clicks via <InlineCode>oncellClick</InlineCode>.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
</div>
