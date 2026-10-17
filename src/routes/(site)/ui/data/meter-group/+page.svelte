<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

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
		import CustomSnippetsExample from './examples/CustomSnippetsExample.svelte';
		import customSnippetsCode from './examples/CustomSnippetsExample.svelte?raw';

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

<ProsePage>
	<ProseParagraph>
		<ProseTitle>MeterGroup</ProseTitle>
		<ProseText>A segmented horizontal bar that visualises proportions within a total. Each segment represents a category, sized by its value. Pair it with <DocInlineCode>MeterGroupLegend</DocInlineCode> to show labels and values.</ProseText>

		<ProseText>Use non-negative segment values and a positive total. In 0.0.34, max below the sum does not clamp segment proportions; it only removes the remainder. Size is captured at initialization (small wins over compact); legend orientation is also captured. Choose these before mounting. MeterGroup forwards extra HTML attributes, while MeterGroupLegend does not. Built-in click handlers are pointer-only; provide real buttons in custom legend content for keyboard selection.</ProseText>
				<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Pass an array of <DocInlineCode>MeterItem</DocInlineCode> objects. The bar fills to the sum of all values — no <DocInlineCode>max</DocInlineCode> needed.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Explicit Max</ProseTitle>
				<ProseText>Set <DocInlineCode>max</DocInlineCode> to show a fixed total. Values below <DocInlineCode>max</DocInlineCode> render the remaining space in a neutral fill. The <DocInlineCode>value</DocInlineCode> snippet in <DocInlineCode>MeterGroupLegend</DocInlineCode> lets you add a custom suffix.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Click Events</ProseTitle>
				<ProseText>Use <DocInlineCode>onsegmentclick</DocInlineCode> and <DocInlineCode>onitemclick</DocInlineCode> to respond to interaction. Both receive the full <DocInlineCode>MeterItem</DocInlineCode> object.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Vertical</ProseTitle>
				<ProseText>Add the <DocInlineCode>vertical</DocInlineCode> prop to both components. Set a height on <DocInlineCode>MeterGroup</DocInlineCode> via <code>class</code>; the legend stacks its items with values aligned to the right.</ProseText>
				<DocShowExample component={Example4} code={example4} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Use <DocInlineCode>compact</DocInlineCode> or <DocInlineCode>small</DocInlineCode> to reduce the bar thickness and legend text size.</ProseText>
				<DocShowExample component={Example5} code={example5} />
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Segment content and custom legend items</ProseTitle>
		<ProseText>The segment snippet renders inside each proportional segment. The legend item snippet replaces its swatch, label and value content, but not the li wrapper. With this override, showValues and the value snippet no longer control the content. A real button provides explicit keyboard activation.</ProseText>
		<DocShowExample component={CustomSnippetsExample} code={customSnippetsCode} />
	</ProseParagraph>
</ProsePage>
