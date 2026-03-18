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
		{ group: 'PieChart', name: 'labels', type: 'string[]', description: 'Segment labels shown in the legend and tooltip.' },
		{ group: 'PieChart', name: 'data', type: 'number[]', description: 'Numeric values, one per label.' },
		{ group: 'PieChart', name: 'colors', type: 'string[]', description: 'Optional color overrides, one per segment.' },
		{ group: 'PieChart', name: 'options', type: 'ChartOptions<\'pie\'>', default: '{}', description: 'Chart.js options escape hatch.' },
		{ group: 'PieChart', name: 'chart', type: 'Chart', description: 'Bindable Chart.js instance reference.' },
		{ group: 'DoughnutChart', name: 'labels', type: 'string[]', description: 'Segment labels.' },
		{ group: 'DoughnutChart', name: 'data', type: 'number[]', description: 'Numeric values.' },
		{ group: 'DoughnutChart', name: 'colors', type: 'string[]', description: 'Optional color overrides.' },
		{ group: 'DoughnutChart', name: 'cutout', type: 'string | number', default: "'60%'", description: 'Inner cutout size as a percentage string or pixel number.' },
		{ group: 'DoughnutChart', name: 'options', type: 'ChartOptions<\'doughnut\'>', default: '{}', description: 'Chart.js options escape hatch.' },
		{ group: 'DoughnutChart', name: 'chart', type: 'Chart', description: 'Bindable Chart.js instance reference.' },
	];
</script>

<DocTitle>Pie & Doughnut Chart</DocTitle>
<DocText>
	Canvas-based pie and doughnut charts powered by Chart.js. Segments are colored automatically from the palette; use <InlineCode>colors</InlineCode> to override.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Pie</DocSubtitle>
		<DocText>Standard pie chart with auto-colored segments.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Doughnut</DocSubtitle>
		<DocText>Doughnut chart with configurable inner cutout via the <InlineCode>cutout</InlineCode> prop.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
</div>
