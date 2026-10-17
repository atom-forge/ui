<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
        { group: 'LineChart', name: 'class', type: 'string', description: 'Classes merged onto the canvas.' },
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

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Line Chart</ProseTitle>
		<ProseText>
			Canvas-based line and area chart powered by Chart.js. Supports multiple series, smooth curves, area fill, and automatic dark mode theming.
		</ProseText>

		<ProseText>Color overrides should use six-digit hex strings because these wrappers append alpha suffixes. For custom configurations and instance lifecycle, see <a href="/ui/data/charts/base">Chart Base &amp; Helpers</a>. To fill a fixed-height container, set <DocInlineCode>{"options={{ maintainAspectRatio: false }}"}</DocInlineCode>.</ProseText>
        <DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Multi-series</ProseTitle>
				<ProseText>Multiple datasets are colored automatically from the built-in palette.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Smooth area</ProseTitle>
				<ProseText>Combine <DocInlineCode>smooth</DocInlineCode> and <DocInlineCode>fill: true</DocInlineCode> on a dataset for a smooth area chart.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>
</ProsePage>
