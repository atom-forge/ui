<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";

	const cardProps: PropDef[] = [
		{ name: 'children', type: 'Snippet', description: 'The content to be rendered inside the card.' },
				{ name: 'class', type: 'string', description: 'Extra classes on the card div. Set padding explicitly; other HTML attributes and events are forwarded to the div.' },
		{ name: 'elevate', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | "0" | "1" | "2" | "3" | "4" | "5" | "6"', default: '1', description: 'Controls the shadow level of the card. Corresponds to Tailwind CSS shadow classes (e.g., 1 for shadow-sm, 6 for shadow-2xl).' }
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Card</ProseTitle>
		<ProseText>A flexible content container with a distinct background, border, and shadow.</ProseText>

		<DocApiBlock title="Card Props">
			<DocApiTable props={cardProps} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>A simple card with some text content.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Elevation Levels</ProseTitle>
				<ProseText>Use the <DocInlineCode>elevate</DocInlineCode> prop to control the shadow intensity of the card.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
</ProsePage>
