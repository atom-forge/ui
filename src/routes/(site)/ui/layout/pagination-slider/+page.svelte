<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";

	const props: PropDef[] = [
		{ group: 'State', name: 'page', type: 'number', default: '1', description: 'Current page (1-indexed). Use <code>bind:page</code> for two-way binding.' },
		{ group: 'Data', name: 'total', type: 'number', description: 'Total number of items.' },
		{ group: 'Data', name: 'pageSize', type: 'number', description: 'Number of items per page. Determines the total page count.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: 'false', description: 'Compact slider; navigation buttons remain micro-sized.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: 'false', description: 'Small slider; navigation buttons remain micro-sized.' },
		{ group: 'Styling', name: 'class', type: 'string', description: 'Extra Tailwind classes on the wrapper.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Pagination Slider</ProseTitle>
		<ProseText>A slider-based pagination control. Ideal for large datasets where the exact page number matters less than the position. Shows prev/next buttons and a draggable slider with a value bubble. The examples compose the item-range readout separately. The page binding commits after a 150 ms debounce.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic</ProseTitle>
				<ProseText>Bind <DocInlineCode>page</DocInlineCode> and pass <DocInlineCode>total</DocInlineCode> + <DocInlineCode>pageSize</DocInlineCode>. The component computes total pages as max(1, ceil(total / pageSize)). Use a positive pageSize, and derive and render the item range in your application.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes: normal, <DocInlineCode>compact</DocInlineCode>, <DocInlineCode>small</DocInlineCode>.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
</ProsePage>
