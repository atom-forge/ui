<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";

	const props: PropDef[] = [
		{ name: 'icon', type: 'IconDefinition', description: 'Icon shown above the title. Use <code>defineIcon()</code>.' },
		{ name: 'title', type: 'string', description: 'Primary empty-state message.' },
		{ name: 'description', type: 'string', description: 'Optional supporting text below the title.' },
		{ name: 'children', type: 'Snippet', description: 'Optional CTA area — e.g. a Button to trigger an action.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the root element.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Empty State</ProseTitle>
		<ProseText>A centered placeholder shown when a list or section has no content. Combines an icon, title, optional description, and an optional call-to-action.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic</ProseTitle>
				<ProseText>Pass an <DocInlineCode>icon</DocInlineCode> and <DocInlineCode>title</DocInlineCode> as the minimum. Add <DocInlineCode>description</DocInlineCode> for context.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>With Call-to-Action</ProseTitle>
				<ProseText>Use the <DocInlineCode>children</DocInlineCode> slot to render a button or link below the description.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
</ProsePage>
