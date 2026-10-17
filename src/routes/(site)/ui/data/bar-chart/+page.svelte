<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
        { group: 'ChartSegment', name: 'label', type: 'string', description: 'Accepted in the data shape but not read by the 0.0.34 tooltip. Supply series names; otherwise it displays Value 1, Value 2, etc.' },
        { group: 'BarChart', name: 'class', type: 'string', description: 'Classes on the outer flex container. Additional HTML attributes are forwarded.' },
		{ group: 'BarChart', name: 'data', type: 'ChartData[]', description: 'Array of data points. Each item has a <code>label</code> and either a simple <code>value</code> or a <code>values</code> array for multi-series.' },
		{ group: 'BarChart', name: 'series', type: 'Series[]', description: 'Series definitions. Each entry provides a <code>name</code> (shown in the tooltip) and a <code>color</code> (CSS color string).' },
		{ group: 'BarChart', name: 'variant', type: "'grouped' | 'stacked'", default: "'grouped'", description: 'Rendering mode. <code>grouped</code> places bars side by side; <code>stacked</code> stacks them.' },
		{ group: 'BarChart', name: 'showInfo', type: 'boolean', default: 'true', description: 'Whether to show the hover tooltip.' },

		{ group: 'ChartData', name: 'label', type: 'string', description: 'Label shown below the bar.' },
		{ group: 'ChartData', name: 'value', type: 'number', description: 'Single value (shorthand for single-series charts). Mutually exclusive with <code>values</code>.' },
		{ group: 'ChartData', name: 'values', type: 'ChartSegment[]', description: 'Multi-series segments. Mutually exclusive with <code>value</code>.' },

		{ group: 'ChartSegment', name: 'value', type: 'number', description: 'Segment value.' },
		{ group: 'ChartSegment', name: 'color', type: 'string', description: 'CSS color. Falls back to the matching <code>Series</code> color.' },

		{ group: 'Series', name: 'name', type: 'string', description: 'Series label shown in the hover tooltip.' },
		{ group: 'Series', name: 'color', type: 'string', description: 'CSS color string applied to all bars in this series.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Bar Chart</ProseTitle>
		<ProseText>
			Vertical bar chart supporting grouped and stacked variants. Hover a bar to see a tooltip with series details.
			Pass <DocInlineCode>series</DocInlineCode> to define colors and names; use <DocInlineCode>data[].values</DocInlineCode> for multi-series or the shorthand <DocInlineCode>data[].value</DocInlineCode> for single-series.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Grouped</ProseTitle>
				<ProseText>Default mode — bars per series are placed side by side.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Stacked</ProseTitle>
				<ProseText>Series segments are stacked on top of each other.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Single Series</ProseTitle>
				<ProseText>Use the shorthand <DocInlineCode>value</DocInlineCode> field instead of <DocInlineCode>values</DocInlineCode> for simple single-series charts.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>
</ProsePage>
