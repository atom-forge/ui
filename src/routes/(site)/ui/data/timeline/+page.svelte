<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ name: 'items', type: 'any[]', description: 'Data array. Each element is passed as-is to the <code>children</code> and <code>dot</code> snippets.' },
		{ name: 'right', type: 'boolean', description: 'Vertical timeline — content to the right of the line. Default when no direction prop is set.' },
		{ name: 'left', type: 'boolean', description: 'Vertical timeline — content to the left of the line.' },
		{ name: 'bottom', type: 'boolean', description: 'Horizontal timeline — content below the line.' },
		{ name: 'top', type: 'boolean', description: 'Horizontal timeline — content above the line.' },
		{ name: 'alternate', type: 'boolean', default: 'false', description: 'Alternates content between both sides of the line on each successive item.' },
		{ name: 'children', type: 'Snippet<[any]>', description: 'Required. Renders each item\'s content. Receives the item from the <code>items</code> array.' },
		{ name: 'dot', type: 'Snippet<[any]>', description: 'Optional. Renders the node on the line. Defaults to a small circle. Receives the item.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes applied to the connecting line element.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Timeline</ProseTitle>
		<ProseText>A flexible timeline that renders items along a vertical or horizontal line. Use the <DocInlineCode>children</DocInlineCode> snippet for item content and the <DocInlineCode>dot</DocInlineCode> snippet to customise the node on the line.</ProseText>
		<ProseText>Direction flags are mutually exclusive: supply left, right, top or bottom, or omit all for right. Alternate begins on the selected side (right/bottom by default). Snippets receive the item, not an index. The class prop styles the connecting line rather than a root wrapper.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Vertical</ProseTitle>
				<ProseText>Use <DocInlineCode>right</DocInlineCode> (default) or <DocInlineCode>left</DocInlineCode> to place content on either side of the line.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Alternate with Custom Dots</ProseTitle>
				<ProseText>Add <DocInlineCode>alternate</DocInlineCode> to flip content left/right on each item. Use the <DocInlineCode>dot</DocInlineCode> snippet to render icons or status indicators in place of the default circle.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Horizontal</ProseTitle>
				<ProseText>Use <DocInlineCode>bottom</DocInlineCode> or <DocInlineCode>top</DocInlineCode> for a horizontal layout. Works with <DocInlineCode>alternate</DocInlineCode> too.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>
</ProsePage>
