<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';

	const props: PropDef[] = [
        { group: 'RadarChart', name: 'class', type: 'string', description: 'Classes merged onto the canvas.' },
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

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Radar Chart</ProseTitle>
		<ProseText>
			Canvas-based radar (spider) chart powered by Chart.js. Each dataset's polygon can be filled or outline-only via the <DocInlineCode>fill</DocInlineCode> prop.
		</ProseText>

		<ProseText>Color overrides should use six-digit hex strings because these wrappers append alpha suffixes. For custom configurations and instance lifecycle, see <a href="/ui/data/charts/base">Chart Base &amp; Helpers</a>. To fill a fixed-height container, set <DocInlineCode>{"options={{ maintainAspectRatio: false }}"}</DocInlineCode>.</ProseText>
        <DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Multi-series</ProseTitle>
				<ProseText>Compare multiple entities across the same axes.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>
</ProsePage>
