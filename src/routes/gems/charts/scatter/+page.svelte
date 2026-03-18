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
		{ group: 'ScatterChart', name: 'datasets', type: 'ScatterDataset[]', description: 'Array of datasets. Each has a <code>label</code>, <code>data</code> ({x, y}[]), and optional <code>color</code>.' },
		{ group: 'ScatterChart', name: 'options', type: 'ChartOptions<\'scatter\'>', default: '{}', description: 'Chart.js options escape hatch.' },
		{ group: 'ScatterChart', name: 'chart', type: 'Chart', description: 'Bindable Chart.js instance reference.' },
		{ group: 'BubbleChart', name: 'datasets', type: 'BubbleDataset[]', description: 'Array of datasets. Each point is <code>{x, y, r}</code> where <code>r</code> is the pixel radius.' },
		{ group: 'BubbleChart', name: 'options', type: 'ChartOptions<\'bubble\'>', default: '{}', description: 'Chart.js options escape hatch.' },
		{ group: 'BubbleChart', name: 'chart', type: 'Chart', description: 'Bindable Chart.js instance reference.' },
	];
</script>

<DocTitle>Scatter & Bubble Chart</DocTitle>
<DocText>
	Canvas-based scatter and bubble charts powered by Chart.js. Scatter uses <InlineCode>{'{x, y}'}</InlineCode> points; bubble adds an <InlineCode>r</InlineCode> (radius) dimension.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Scatter</DocSubtitle>
		<DocText>Plot {'{x, y}'} data points across multiple series.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Bubble</DocSubtitle>
		<DocText>Add a third dimension using the <InlineCode>r</InlineCode> property to control bubble size.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
</div>
