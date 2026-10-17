<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";

	const props: PropDef[] = [
		{ name: 'children', type: 'Snippet', description: 'The element the badge is overlaid on.' },
		{ name: 'count', type: 'number', description: 'Number displayed in the badge. Badge is hidden when <code>count</code> is 0.' },
		{ name: 'dot', type: 'boolean', default: 'false', description: 'Show a dot indicator instead of a number.' },
		{ name: 'max', type: 'number', default: '99', description: 'Maximum number shown. Displays <code>N+</code> when exceeded.' },
		{ name: 'color', type: "'accent' | 'red' | 'green' | 'blue'", default: "'accent'", description: 'Badge color.' },
		{ name: 'hidden', type: 'boolean', default: 'false', description: 'Force-hides the badge regardless of count.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the wrapper.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Badge</ProseTitle>
		<ProseText>An absolute-positioned overlay indicator — typically used to show notification counts or status dots on icons, buttons, or avatars.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Count & Colors</ProseTitle>
				<ProseText>Supports <DocInlineCode>accent</DocInlineCode>, <DocInlineCode>red</DocInlineCode>, <DocInlineCode>green</DocInlineCode>, and <DocInlineCode>blue</DocInlineCode> colors. The badge auto-hides when <DocInlineCode>count</DocInlineCode> is 0, and shows <DocInlineCode>N+</DocInlineCode> when it exceeds <DocInlineCode>max</DocInlineCode>.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Dot Variant</ProseTitle>
				<ProseText>Use <DocInlineCode>dot</DocInlineCode> for a minimal status indicator without a number.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
</ProsePage>
