<script lang="ts">
	import ShowExample from '../../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import DocTitle from '../../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../../components/doc/ApiBlock.svelte';
	import ApiTable, { type PropDef } from '../../../../components/doc/ApiTable.svelte';
	import InlineCode from '../../../../components/doc/InlineCode.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
		{ group: 'LineChart', name: 'labels', type: 'string[]', description: 'X-axis category labels.' },
		{ group: 'LineChart', name: 'datasets', type: 'LineDataset[]', description: 'Array of datasets. Each has a <code>label</code>, <code>data</code> (number[]), optional <code>color</code> override, and optional <code>fill</code> to render an area under the line.' },
		{ group: 'LineChart', name: 'smooth', type: 'boolean', default: 'false', description: 'Enables bezier curve smoothing (tension 0.4).' },
		{ group: 'LineChart', name: 'options', type: 'ChartOptions<\'line\'>', default: '{}', description: 'Chart.js options escape hatch. Merged with the defaults.' },
		{ group: 'LineChart', name: 'chart', type: 'Chart', description: 'Bindable reference to the underlying Chart.js instance for programmatic access.' },
		{ group: 'LineDataset', name: 'label', type: 'string', description: 'Series name shown in the legend.' },
		{ group: 'LineDataset', name: 'data', type: 'number[]', description: 'Data values, one per label.' },
		{ group: 'LineDataset', name: 'color', type: 'string', description: 'Override the auto-assigned series color.' },
		{ group: 'LineDataset', name: 'fill', type: 'boolean', description: 'Fill the area under the line (area chart).' },
	];
</script>

<DocTitle>Line Chart</DocTitle>
<DocText>
	Canvas-based line and area chart powered by Chart.js. Supports multiple series, smooth curves, area fill, and automatic dark mode theming.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Multi-series</DocSubtitle>
		<DocText>Multiple datasets are colored automatically from the built-in palette.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Smooth area</DocSubtitle>
		<DocText>Combine <InlineCode>smooth</InlineCode> and <InlineCode>fill: true</InlineCode> on a dataset for a smooth area chart.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
</div>
