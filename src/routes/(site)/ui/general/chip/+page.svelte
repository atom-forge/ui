<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";

	const props: PropDef[] = [
		{ name: 'children', type: 'Snippet', description: 'Content rendered inside the chip.' },
		{ name: 'color', type: "'base' | 'green' | 'red' | 'blue' | 'yellow'", default: "'base'", description: 'Color variant of the chip.' },
		{ name: 'icon', type: 'IconDefinition', description: 'Icon rendered at the start. Ignored if <code>start</code> is provided.' },
		{ name: 'start', type: 'Snippet', description: 'Custom snippet rendered at the start, replacing the <code>icon</code> shorthand.' },
		{ name: 'end', type: 'Snippet', description: 'Custom snippet rendered at the end.' },
				{ name: 'class', type: 'string', description: 'Extra classes on the span; additional HTML attributes and events are forwarded.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Chip</ProseTitle>
		<ProseText>A small inline label used for categorization, status, or keywords. Supports color variants, icons, and custom start/end snippets.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Colors & Icons</ProseTitle>
				<ProseText>Five color variants: <DocInlineCode>base</DocInlineCode>, <DocInlineCode>green</DocInlineCode>, <DocInlineCode>blue</DocInlineCode>, <DocInlineCode>yellow</DocInlineCode>, <DocInlineCode>red</DocInlineCode>. Add an <DocInlineCode>icon</DocInlineCode> for visual reinforcement.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>
</ProsePage>
