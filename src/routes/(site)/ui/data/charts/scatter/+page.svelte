<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
        { group: 'ScatterChart', name: 'class', type: 'string', description: 'Classes merged onto the canvas.' },
        { group: 'BubbleChart', name: 'class', type: 'string', description: 'Classes merged onto the canvas.' },
		{ group: 'ScatterChart', name: 'datasets', type: 'ScatterDataset[]', description: 'Array of datasets. Each has a <code>label</code>, <code>data</code> ({x, y}[]), and optional <code>color</code>.' },
		{ group: 'ScatterChart', name: 'options', type: 'ChartOptions<\'scatter\'>', default: '{}', description: 'Chart.js options escape hatch.' },
		{ group: 'ScatterChart', name: 'chart', type: 'Chart', description: 'Bindable Chart.js instance reference.' },
		{ group: 'BubbleChart', name: 'datasets', type: 'BubbleDataset[]', description: 'Array of datasets. Each point is <code>{x, y, r}</code> where <code>r</code> is the pixel radius.' },
		{ group: 'BubbleChart', name: 'options', type: 'ChartOptions<\'bubble\'>', default: '{}', description: 'Chart.js options escape hatch.' },
		{ group: 'BubbleChart', name: 'chart', type: 'Chart', description: 'Bindable Chart.js instance reference.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Scatter & Bubble Chart</ProseTitle>
		<ProseText>
			Canvas-based scatter and bubble charts powered by Chart.js. Scatter uses <DocInlineCode>{'{x, y}'}</DocInlineCode> points; bubble adds an <DocInlineCode>r</DocInlineCode> (radius) dimension.
		</ProseText>

		<ProseText>Color overrides should use six-digit hex strings because these wrappers append alpha suffixes. For custom configurations and instance lifecycle, see <a href="/ui/data/charts/base">Chart Base &amp; Helpers</a>. To fill a fixed-height container, set <DocInlineCode>{"options={{ maintainAspectRatio: false }}"}</DocInlineCode>.</ProseText>
        <DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Scatter</ProseTitle>
				<ProseText>Plot {'{x, y}'} data points across multiple series.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Bubble</ProseTitle>
				<ProseText>Add a third dimension using the <DocInlineCode>r</DocInlineCode> property to control bubble size.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>
</ProsePage>
