<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
        { group: 'PieChart', name: 'class', type: 'string', description: 'Classes merged onto the canvas.' },
        { group: 'DoughnutChart', name: 'class', type: 'string', description: 'Classes merged onto the canvas.' },
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

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Pie & Doughnut Chart</ProseTitle>
		<ProseText>
			Canvas-based pie and doughnut charts powered by Chart.js. Segments are colored automatically from the palette; use <DocInlineCode>colors</DocInlineCode> to override.
		</ProseText>

		<ProseText>Color overrides should use six-digit hex strings because these wrappers append alpha suffixes. For custom configurations and instance lifecycle, see <a href="/ui/data/charts/base">Chart Base &amp; Helpers</a>. To fill a fixed-height container, set <DocInlineCode>{"options={{ maintainAspectRatio: false }}"}</DocInlineCode>.</ProseText>
        <DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Pie</ProseTitle>
				<ProseText>Standard pie chart with auto-colored segments.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Doughnut</ProseTitle>
				<ProseText>Doughnut chart with configurable inner cutout via the <DocInlineCode>cutout</DocInlineCode> prop.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>
</ProsePage>
