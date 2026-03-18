<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import InlineCode from '../../../components/doc/InlineCode.svelte';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable, { type PropDef } from '../../../components/doc/ApiTable.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';
	import Example4 from './examples/Example4.svelte';
	import example4 from './examples/Example4.svelte?raw';
	import Example5 from './examples/Example5.svelte';
	import example5 from './examples/Example5.svelte?raw';

	const props: PropDef[] = [
		{ group: 'MeterGroup', name: 'items', type: 'MeterItem[]', description: 'Array of segments to display. Each item needs <code>id</code>, <code>label</code>, <code>value</code>, and <code>color</code> (any valid CSS color).' },
		{ group: 'MeterGroup', name: 'max', type: 'number', description: 'Total value representing 100%. If omitted, the sum of all <code>item.value</code> fields is used. When provided and greater than the sum, the remaining portion is rendered in a neutral color.' },
		{ group: 'MeterGroup', name: 'vertical', type: 'boolean', description: 'Renders the bar vertically. Set a height on the root element via <code>class</code>. The size props control the bar width instead of height.' },
		{ group: 'MeterGroup', name: 'compact', type: 'boolean', description: 'Compact size — thinner bar.' },
		{ group: 'MeterGroup', name: 'small', type: 'boolean', description: 'Small size — thinnest bar.' },
		{ group: 'MeterGroup', name: 'segment', type: 'Snippet<[MeterItem]>', description: 'Optional snippet rendered inside each segment div. Useful for adding tooltips or overlays.' },
		{ group: 'MeterGroup', name: 'onsegmentclick', type: '(item: MeterItem) => void', description: 'Called when a segment is clicked.' },
		{ group: 'MeterGroup', name: 'segmentClass', type: 'string', description: 'Extra classes applied to every segment element.' },
		{ group: 'MeterGroup', name: 'class', type: 'string', description: 'Classes on the root element. Use this to override height (horizontal) or set a fixed height (vertical).' },
		{ group: 'MeterGroupLegend', name: 'items', type: 'MeterItem[]', description: 'Same array passed to <code>MeterGroup</code>.' },
		{ group: 'MeterGroupLegend', name: 'vertical', type: 'boolean', description: 'Stacks items vertically. Values are pushed to the right edge with <code>ml-auto</code>.' },
		{ group: 'MeterGroupLegend', name: 'compact', type: 'boolean', description: 'Compact size — smaller text and swatch.' },
		{ group: 'MeterGroupLegend', name: 'small', type: 'boolean', description: 'Small size — smallest text and swatch.' },
		{ group: 'MeterGroupLegend', name: 'showValues', type: 'boolean', default: 'true', description: 'Whether to show the numeric value next to each label.' },
		{ group: 'MeterGroupLegend', name: 'item', type: 'Snippet<[MeterItem]>', description: 'Replaces the entire list item rendering.' },
		{ group: 'MeterGroupLegend', name: 'value', type: 'Snippet<[MeterItem]>', description: 'Replaces only the value portion. Requires <code>showValues</code> to be <code>true</code>.' },
		{ group: 'MeterGroupLegend', name: 'onitemclick', type: '(item: MeterItem) => void', description: 'Called when a legend item is clicked.' },
		{ group: 'MeterGroupLegend', name: 'itemClass', type: 'string', description: 'Extra classes on each list item.' },
		{ group: 'MeterGroupLegend', name: 'swatchClass', type: 'string', description: 'Extra classes on the color swatch.' },
		{ group: 'MeterGroupLegend', name: 'labelClass', type: 'string', description: 'Extra classes on the label text.' },
		{ group: 'MeterGroupLegend', name: 'valueClass', type: 'string', description: 'Extra classes on the value text.' },
		{ group: 'MeterGroupLegend', name: 'class', type: 'string', description: 'Classes on the root <code>&lt;ul&gt;</code> element.' },
	];
</script>

<DocTitle>MeterGroup</DocTitle>
<DocText>A segmented horizontal bar that visualises proportions within a total. Each segment represents a category, sized by its value. Pair it with <InlineCode>MeterGroupLegend</InlineCode> to show labels and values.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Pass an array of <InlineCode>MeterItem</InlineCode> objects. The bar fills to the sum of all values — no <InlineCode>max</InlineCode> needed.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Explicit Max</DocSubtitle>
		<DocText>Set <InlineCode>max</InlineCode> to show a fixed total. Values below <InlineCode>max</InlineCode> render the remaining space in a neutral fill. The <InlineCode>value</InlineCode> snippet in <InlineCode>MeterGroupLegend</InlineCode> lets you add a custom suffix.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Click Events</DocSubtitle>
		<DocText>Use <InlineCode>onsegmentclick</InlineCode> and <InlineCode>onitemclick</InlineCode> to respond to interaction. Both receive the full <InlineCode>MeterItem</InlineCode> object.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
	<div>
		<DocSubtitle>Vertical</DocSubtitle>
		<DocText>Add the <InlineCode>vertical</InlineCode> prop to both components. Set a height on <InlineCode>MeterGroup</InlineCode> via <code>class</code>; the legend stacks its items with values aligned to the right.</DocText>
		<ShowExample component={Example4} code={example4} />
	</div>
	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Use <InlineCode>compact</InlineCode> or <InlineCode>small</InlineCode> to reduce the bar thickness and legend text size.</DocText>
		<ShowExample component={Example5} code={example5} />
	</div>
</div>
