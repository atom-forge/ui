<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable, { type PropDef } from '../../../components/doc/ApiTable.svelte';
	import InlineCode from '../../../components/doc/InlineCode.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
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

<DocTitle>Bar Chart</DocTitle>
<DocText>
	Vertical bar chart supporting grouped and stacked variants. Hover a bar to see a tooltip with series details.
	Pass <InlineCode>series</InlineCode> to define colors and names; use <InlineCode>data[].values</InlineCode> for multi-series or the shorthand <InlineCode>data[].value</InlineCode> for single-series.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Grouped</DocSubtitle>
		<DocText>Default mode — bars per series are placed side by side.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Stacked</DocSubtitle>
		<DocText>Series segments are stacked on top of each other.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Single Series</DocSubtitle>
		<DocText>Use the shorthand <InlineCode>value</InlineCode> field instead of <InlineCode>values</InlineCode> for simple single-series charts.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
</div>
