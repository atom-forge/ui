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

	const props: PropDef[] = [
		{ group: 'RadarChart', name: 'labels', type: 'string[]', description: 'Axis labels around the radar.' },
		{ group: 'RadarChart', name: 'datasets', type: 'RadarDataset[]', description: 'Array of datasets. Each has a <code>label</code>, <code>data</code> (number[]), optional <code>color</code>, and optional <code>fill</code> (default <code>true</code>).' },
		{ group: 'RadarChart', name: 'options', type: 'ChartOptions<\'radar\'>', default: '{}', description: 'Chart.js options escape hatch.' },
		{ group: 'RadarChart', name: 'chart', type: 'Chart', description: 'Bindable Chart.js instance reference.' },
		{ group: 'RadarDataset', name: 'label', type: 'string', description: 'Series name.' },
		{ group: 'RadarDataset', name: 'data', type: 'number[]', description: 'One value per radar axis label.' },
		{ group: 'RadarDataset', name: 'color', type: 'string', description: 'Override the auto-assigned series color.' },
		{ group: 'RadarDataset', name: 'fill', type: 'boolean', description: 'Fill the polygon area. Defaults to <code>true</code>.' },
	];
</script>

<DocTitle>Radar Chart</DocTitle>
<DocText>
	Canvas-based radar (spider) chart powered by Chart.js. Each dataset's polygon can be filled or outline-only via the <InlineCode>fill</InlineCode> prop.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Multi-series</DocSubtitle>
		<DocText>Compare multiple entities across the same axes.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
</div>
