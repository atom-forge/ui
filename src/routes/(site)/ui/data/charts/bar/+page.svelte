<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
        { group: 'CjsBarChart', name: 'class', type: 'string', description: 'Classes merged onto the canvas.' },
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

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Bar Chart (Chart.js)</ProseTitle>
		<ProseText>
			Canvas-based bar chart built on Chart.js. Supports grouped and stacked variants, horizontal orientation, and automatic dark mode theming.
			See also the CSS-only <DocInlineCode>BarChart</DocInlineCode> in the Diagrams section for a lighter-weight alternative.
		</ProseText>

		<ProseText>Color overrides should use six-digit hex strings because these wrappers append alpha suffixes. For custom configurations and instance lifecycle, see <a href="/ui/data/charts/base">Chart Base &amp; Helpers</a>. To fill a fixed-height container, set <DocInlineCode>{"options={{ maintainAspectRatio: false }}"}</DocInlineCode>.</ProseText>
        <DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Grouped</ProseTitle>
				<ProseText>Default mode — datasets are placed side by side per category.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Stacked</ProseTitle>
				<ProseText>Set <DocInlineCode>stacked</DocInlineCode> to stack bars for each category.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Horizontal</ProseTitle>
				<ProseText>Set <DocInlineCode>horizontal</DocInlineCode> to flip the axes.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>
</ProsePage>
