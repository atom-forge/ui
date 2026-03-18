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
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'CjsBarChart', name: 'labels', type: 'string[]', description: 'Category labels for the axis.' },
		{ group: 'CjsBarChart', name: 'datasets', type: 'BarDataset[]', description: 'Array of datasets. Each has a <code>label</code>, <code>data</code> (number[]), and optional <code>color</code> override.' },
		{ group: 'CjsBarChart', name: 'stacked', type: 'boolean', default: 'false', description: 'Stack bars on top of each other instead of grouping them side by side.' },
		{ group: 'CjsBarChart', name: 'horizontal', type: 'boolean', default: 'false', description: 'Render bars horizontally (swaps index axis to Y).' },
		{ group: 'CjsBarChart', name: 'options', type: 'ChartOptions<\'bar\'>', default: '{}', description: 'Chart.js options escape hatch.' },
		{ group: 'CjsBarChart', name: 'chart', type: 'Chart', description: 'Bindable Chart.js instance reference.' },
		{ group: 'BarDataset', name: 'label', type: 'string', description: 'Series name shown in the legend.' },
		{ group: 'BarDataset', name: 'data', type: 'number[]', description: 'Numeric values, one per label.' },
		{ group: 'BarDataset', name: 'color', type: 'string', description: 'Override the auto-assigned series color.' },
	];
</script>

<DocTitle>Bar Chart (Chart.js)</DocTitle>
<DocText>
	Canvas-based bar chart built on Chart.js. Supports grouped and stacked variants, horizontal orientation, and automatic dark mode theming.
	See also the CSS-only <InlineCode>BarChart</InlineCode> in the Diagrams section for a lighter-weight alternative.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Grouped</DocSubtitle>
		<DocText>Default mode — datasets are placed side by side per category.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Stacked</DocSubtitle>
		<DocText>Set <InlineCode>stacked</InlineCode> to stack bars for each category.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Horizontal</DocSubtitle>
		<DocText>Set <InlineCode>horizontal</InlineCode> to flip the axes.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
</div>
