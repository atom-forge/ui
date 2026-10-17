<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";

	const props: PropDef[] = [
		{ group: 'State', name: 'page', type: 'number', description: 'Current page (1-indexed).' },
		{ group: 'State', name: 'total', type: 'number', description: 'Total number of pages.' },
		{ group: 'State', name: 'onchange', type: '(page: number) => void', description: 'Callback fired when the user navigates to a new page.' },
		{ group: 'Options', name: 'siblings', type: 'number', default: '1', description: 'How many page buttons to show on each side of the current page. Increase to show more context.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: 'false', description: 'Compact size — h-8 w-8 per button.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: 'false', description: 'Small size — h-6 w-6 per button.' },
		{ group: 'Styling', name: 'class', type: 'string', description: 'Extra Tailwind classes on the <code>&lt;nav&gt;</code> wrapper.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Pagination</ProseTitle>
		<ProseText>A page navigation control. Shows first/last pages, a configurable number of sibling pages around the current one, and <DocInlineCode>…</DocInlineCode> ellipsis for skipped ranges.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic</ProseTitle>
				<ProseText>Pass <DocInlineCode>page</DocInlineCode> and update your state in <DocInlineCode>onchange</DocInlineCode>. The page prop is controlled, not bindable. The component handles all range calculation internally.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Siblings</ProseTitle>
				<ProseText>Control how many pages appear beside the current one with <DocInlineCode>siblings</DocInlineCode>. Increase for more context, decrease for a tighter layout.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes: normal, <DocInlineCode>compact</DocInlineCode>, <DocInlineCode>small</DocInlineCode>.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>
</ProsePage>
